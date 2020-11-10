from django.urls import path

from .views import NewsView, NewsItemView

app_name = 'news'
urlpatterns = [
    path('', NewsView.as_view(), name='index'),
    path('<str:slug>/', NewsItemView.as_view(), name='detail'),
]
