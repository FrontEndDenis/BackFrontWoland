import datetime
from project_settings.models import ProjectSettings
from menu.models import MenuCatalog
from filials.models import Filials
from filials.views import get_current_filial
from checkout import cartpy as cart
from . import settings

GROUP_ADMIN_NAME = 'admin'

def global_views(request):
    current_year = datetime.date.today().year
    project_settings = ProjectSettings.objects.first()
    try:
        site_name = project_settings.name
    except:
        site_name = settings.SITE_NAME
    start_year = project_settings.start_year
    version_name = settings.VERSION_NAME
    site_header = settings.SITE_NAME
    site_title = "{} {}".format(site_header, version_name)
    media_url = settings.MEDIA_URL
    static_url = settings.STATIC_URL

    main_menu_list = MenuCatalog.objects.filter(parent__isnull=True, is_hidden=False)
    menu_list_footer_left = MenuCatalog.objects.filter(show_footer_left=True, is_hidden=False)
    menu_list_footer_rigth = MenuCatalog.objects.filter(show_footer_rigth=True, is_hidden=False)

    filials_list = Filials.objects.filter(isHidden=False, is_base=False).only('id', 'name', 'subdomain_name')
    filials_list_base = Filials.objects.filter(isHidden=False, is_base=True).order_by('order_number').only('id', 'name', 'subdomain_name')

    current_filial = get_current_filial(request)

    cart_item_count = cart.cart_distinct_item_count(request)
    cart_items = cart.get_cart_items(request)

    url_site = project_settings.site_name
    current_url = url_site + request.get_full_path()
    return locals()
