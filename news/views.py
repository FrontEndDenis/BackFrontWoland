import math
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.shortcuts import get_object_or_404
from .models import News

MAX_ITEM_NEWS = 5

class NewsView(TemplateView):
    """
    Класс для отображения главной страницы новостей
    """
    template_name = "news/news.pug"

    def get(self, request):
        news_list = News.objects.filter(is_hidden=False)
        count_num_page_news = math.ceil(news_list.count() / MAX_ITEM_NEWS)
        news_list = news_list[:MAX_ITEM_NEWS]
        return render(request, self.template_name, locals())

    def post(self, request):
        template_name = "news/news_get.pug"
        page = 1
        try:
            page = int(request.POST['current_page'])
        except:
            pass
        news_list = News.objects.filter(is_hidden=False)[page * MAX_ITEM_NEWS:(page + 1) * MAX_ITEM_NEWS]
        return render(request, template_name, locals())


class NewsItemView(TemplateView):
    """
    Класс для отображеия главной страницы новостей
    """
    template_name = "news/news_item.pug"

    def get(self, request, slug):
        news_item = get_object_or_404(News, slug=slug)
        news_list = News.objects.filter(is_hidden=False)
        count_num_page_news = math.ceil(news_list.count() / MAX_ITEM_NEWS)
        news_list = news_list.exclude(slug=slug)[:MAX_ITEM_NEWS]
        return render(request, self.template_name, locals())
