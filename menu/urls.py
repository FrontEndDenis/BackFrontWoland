from django.conf.urls import url
from django.urls import path

from .views import IndexView, MenuView, ProductView, MenuChildView, GetFilterUrl, CatalogView, ProductGetView, \
    ProductGetPrice, ProductAddView, ProductDelView

app_name = 'menu'
urlpatterns = [
	path('', IndexView.as_view(), name='index'),
	path('policy/', MenuView.as_view(), {'menu_slug': 'policy'}, name='policy'),
	path('<str:menu_slug>/', MenuView.as_view(), name='menu'),
	path('product/<str:product_slug>/', ProductView.as_view(), name='product'),
	path('menu_get_child/<int:pk>', MenuChildView.as_view(), name='get_child'),
	path('product_get_fast/<int:pk>', ProductGetView.as_view(), name='product_get_fast'),
	path('product_get_price/<int:pk>', ProductGetPrice.as_view(), name='product_get_fast'),
	path('product_add', ProductAddView.as_view(), name='product_add'),
	path('product_del', ProductDelView.as_view(), name='product_del'),
	path('get_filter_url', GetFilterUrl.as_view(), name='get_filter_url'),
	url(r'^(?P<menu_slug>[-\w]+)/([^*]*)/$', CatalogView.as_view()),
	# re_path(r'^product/(?P<product_slug>[-\w]+)/$', ProductView.as_view(), name='product'),
	# re_path(r'^catalog/([^/]*)/([^/]*)/$', CatalogView.as_view()),
	# re_path(r'^catalog/([^/]*)/([^/]*)/marka/([^/]*)/$', CatalogView.as_view()),
	# re_path(r'^catalog/([^/]*)/([^/]*)/([^*]*)/$', CatalogView.as_view()),
	# path('catalog_get_child/<int:pk>', CatalogChildView.as_view(), name='get_child'),
	# path('product_get_fast/<int:pk>', ProductGetView.as_view(template_name="product/get_fast_product.html"), name='product_get_fast'),
	# path('product_get_price/<int:pk>', ProductGetView.as_view(template_name="product/get_price_product.html"), name='product_get_price'),
	# path('product_get_add/<int:pk>', ProductGetAddView.as_view(), name='product_get_add'),
]
