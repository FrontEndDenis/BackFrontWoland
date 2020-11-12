import json
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import TemplateView, View
from django.http import HttpResponse, HttpResponseRedirect
from django.template.context_processors import csrf
from . import cartpy as cart
from .models import Order, OrderItem


class CartView(TemplateView):
    template_name = "cart/cart.pug"

    def get(self, request):
        cart_items = cart.get_cart_items(request)

        return render(request, self.template_name, locals())
    
    def post(self, request):
        cart.create_order(request, "Корзина")
        return HttpResponseRedirect(reverse('checkout:receipt'))


class ReceiptView(View):
    template_name = "cart/receipt.pug"
    def get(self, request):
        order_number = request.session.get('order_number', '')
        if order_number:
            order = Order.objects.filter(id=order_number)[0]
            order_items = OrderItem.objects.filter(order=order)
            del request.session['order_number']
        else:
            cart_url = reverse('checkout:cart')
            return HttpResponseRedirect(cart_url)

        return render(request, self.template_name, locals())


class CartCountView(View):
    @staticmethod
    def get(request):
        request.session.set_test_cookie()
        cart_item_count = cart.cart_distinct_item_count(request)
        cart_empty_content = render(request, 'cart/cart_empty.pug', locals()).content.decode()
        cart_items_content = render(request, 'cart/cart_block.pug', locals()).content.decode()
        cart_modal_content = render(request, 'cart/cart_modal_block.pug', locals()).content.decode()
        response_data = {'cart_item_count': cart_item_count,
                         'cart_modal_content': cart_modal_content,
                         'cart_empty_content': cart_empty_content,
                         'cart_items_content': cart_items_content,
                         'csrf_token': str(csrf(request)['csrf_token']),
                         }
        return HttpResponse(json.dumps(response_data), content_type="application/json")


class OrderCallbackView(View):
    type_order = ""

    def post(self, request):
        cart.create_order(request, self.type_order)
        return HttpResponse(json.dumps({}), content_type="application/json")


class SendFormOrder(View):
    type_order = "Корзина"
    def post(self, request):
        cart.create_order(request, self.type_order)
        return HttpResponse(json.dumps({}), content_type="application/json")
