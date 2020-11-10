import os
import json
import smtplib
import random
import datetime
from transliterate import translit
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.core.mail import send_mail, EmailMessage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders as Encoders
from project_settings.models import ProjectSettings
from filials.views import get_current_filial
from filials.models import Filials
from menu.models import Product
from unisite.settings import MEDIA_ROOT
from .models import Order, CartItem
from .forms import UploadFileForm


# not needed yet but we will later
CART_ID_SESSION_KEY = 'cart_id'


# get the current user's cart id, sets new one if blank
def _cart_id(request):
    if request.session.get(CART_ID_SESSION_KEY, '') == '':
        request.session[CART_ID_SESSION_KEY] = _generate_cart_id()
    return request.session[CART_ID_SESSION_KEY]


def _generate_cart_id():
    cart_id = ''
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@  # $%^&*()'
    cart_id_length = 50
    for y in range(cart_id_length):
        cart_id += characters[random.randint(0, len(characters) - 1)]
    return cart_id


# return all items from the current user's cart
def get_cart_items(request):
    return CartItem.objects.filter(cart_id=_cart_id(request))


# add an item to the cart
def add_to_cart(request):
    postdata = request.POST.copy()
    quantity = 1
    product_in_cart = False
    product_slug = postdata.get('product_slug', '')
    product = get_object_or_404(Product, slug=product_slug)
    cart_products = get_cart_items(request)
    for cart_item in cart_products:
        if cart_item.product == product:
            cart_item.augment_quantity(quantity)
            product_in_cart = True

    if not product_in_cart:
        ci = CartItem()
        ci.product = product
        ci.quantity = quantity
        ci.cart_id = _cart_id(request)
        ci.save()

def cart_distinct_item_count(request):
    return get_cart_items(request).count()

def get_single_item(request, item_id):
    return get_object_or_404(CartItem, id=item_id, cart_id=_cart_id(request))

def update_cart(request):
    postdata = request.POST.copy()
    item_id = postdata['item_id']
    quantity = postdata['quantity']
    cart_item = get_single_item(request, item_id)
    if cart_item:
        if int(quantity) > 0:
            cart_item.quantity = int(quantity)
            cart_item.save()
        else:
            remove_from_cart(request)

def remove_from_cart(request):
    postdata = request.POST.copy()
    item_id = postdata['item_id']
    cart_item = get_single_item(request, item_id)
    if cart_item:
        cart_item.delete()

def is_empty(request):
    return cart_distinct_item_count(request) == 0

def empty_cart(request):
    user_cart = get_cart_items(request)
    user_cart.delete()



def get_today():
    return datetime.datetime.today().strftime("%Y-%m-%d %H:%M")


def create_order(request, type_order=None):
    post_data = request.POST.copy()
    order = Order()
    cart_items = get_cart_items(request)
    
    order.name = post_data['name']
    order.email = post_data['email']
    order.phone = post_data['phone']
    order.ip_address = request.META.get('REMOTE_ADDR')
    if type_order:
        order.type_order = type_order
    else:
        order.type_order = 'Корзина'
    text_order = ""
    try:
        text_order = request.POST['comment']+ "\n"
    except:
        pass
    for ci in cart_items:
        text_order_item = ""
        if ci.product:
            text_order_item = ci.product.name + "\n"
        else:
            text_order_item = ci.product_name + "\n"
        text_order += text_order_item
    order.text = text_order

    form = UploadFileForm(request.POST, request.FILES)
    file_name = None
    if form.is_valid():
        main_name = translit(request.FILES['file'].name.strip(), "ru", reversed=True)
        file_name = 'uploads/files/card_'+get_today()+'_'+main_name
        handle_uploaded_file(request.FILES['file'], file_name)
        order.file = file_name
    else:
        pass
    order.save()
    order_number = order.id
    if order_number:
        request.session['order_number'] = order_number

    task_send_mail_order(order, request)
    if order.type_order == 'Корзина':
        empty_cart(request)
    return order


def handle_uploaded_file(file_bin, file_name):
    filename = 'www/media/'+file_name
    with open(filename, 'wb+') as destination:
        for chunk in file_bin.chunks():
            destination.write(chunk)



def task_send_mail_order(order, request):
    current_filial = get_current_filial(request)
    address_to = current_filial.email
    order.email_to = address_to
    order.save()

    try:
        import threading
        thr = threading.Thread(target=send_mail_order,
                             args=[serializers.serialize('json', [order]),
                                   address_to])
        thr.setDaemon(True)
        thr.start()
    except:
        pass
    # send_mail_order(serializers.serialize('json', [order]), get_current_filial(request).id)



def send_client_zayavka(email, order, fio, product=None):
    subject = u"Вы оформили заявку на al-titan.ru"
    if product:
        body = u"""Здравствуйте, %s!\nСпасибо за ваш запрос. """ % (fio)
        body += u"""В ближайшее время Вам придет информация о цене и наличии продукции %s\n""" % (product)
    else:
        body = u"""Здравствуйте, %s!\nСпасибо за ваш запрос. В ближайшее время с Вами свяжется наш специалист!\n""" % (fio)
        body += u"""%s\nВозникли вопросы или дополнение? пишите на электронную почту info@al-titan.ru""" % (order)

    project_settings = ProjectSettings.objects.all().first()
    if project_settings:
        address = project_settings.tech_email
        msg = MIMEMultipart('alternative')
        msg['From'] = project_settings.tech_email
        msg['To'] = email
        msg['Subject'] = subject

        part1 = MIMEText(body, 'plain', 'UTF-8')
        msg.attach(part1)
        send_msg = smtplib.SMTP(project_settings.tech_mail_server, 465)
        send_msg.ehlo()
        send_msg.esmtp_features["auth"] = "LOGIN PLAIN"
        send_msg.debuglevel = 5
        send_msg.login(project_settings.tech_email, project_settings.tech_email_pass)
        send_msg.sendmail(address, email, msg.as_string())
        send_msg.quit()


def send_mail_order(order, address_to):
    order = json.loads(order)[0]['fields']
    fio = order["name"]
    phone = order["phone"]
    email = order["email"]
    text = order["text"]
    date = order["date"]
    file_name = order["file"]

    subject = u"""Поступил новый заказ: %s от %s""" % (fio, date)
    body = u"""Заказ от %s \nФ.И.О: %s \nТелефон или email: %s \n%s\n""" % (date, fio, phone, text)
    
    project_settings = ProjectSettings.objects.all().first()

    if project_settings:
        address = project_settings.tech_email
        msg = MIMEMultipart('alternative')
        msg['From'] = project_settings.tech_email
        msg['To'] = address_to
        msg['Subject'] = subject

        part1 = MIMEText(body, 'plain', 'UTF-8')
        msg.attach(part1)
        if file_name:
            part = MIMEBase('application', "octet-stream")
            part.set_payload(open(MEDIA_ROOT + file_name, "rb").read())
            Encoders.encode_base64(part)
            part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename(MEDIA_ROOT+file_name))
            msg.attach(part)

        send_msg = smtplib.SMTP(project_settings.tech_mail_server, 465)
        send_msg.ehlo()
        send_msg.esmtp_features["auth"] = "LOGIN PLAIN"
        send_msg.debuglevel = 5
        send_msg.login(project_settings.tech_email, project_settings.tech_email_pass)
        send_msg.sendmail(address, address_to, msg.as_string())
        send_msg.quit()
    try:
        if email:
            send_client_zayavka(email, text, fio)
    except:
        pass
