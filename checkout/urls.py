from django.urls import path

from .views import CartView, ReceiptView, CartCountView, OrderCallbackView, SendFormOrder

app_name = 'checkout'
urlpatterns = [
	path('', CartView.as_view(), name='cart'),
	path('receipt/', ReceiptView.as_view(), name='receipt'),
	path('get_cart_count', CartCountView.as_view(), name='get_cart_count'),
	path('send_form_order$', SendFormOrder.as_view(), name='send_form_order'),
	path('order_callback', OrderCallbackView.as_view(type_order="Заказ обратного звонка (окно)"),
		 name='order_callback'),
	path('order_callback_form', OrderCallbackView.as_view(type_order="Заказ обратного звонка (форма)"),
		 name='order_callback_form'),
]
