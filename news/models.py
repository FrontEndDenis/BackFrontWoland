import os
from tinymce import models as tinymce_models
from django.db import models
from django.db.models.signals import post_delete, pre_save


class News(models.Model):
    order_number = models.IntegerField(verbose_name="Порядковый номер", blank=True, null=True)
    name = models.CharField(max_length=512, verbose_name="Название")
    slug = models.SlugField(max_length=512, verbose_name="Название латинское", blank=True, null=True)
    date = models.DateTimeField(verbose_name='Дата')
    description = tinymce_models.HTMLField(verbose_name="Описание")
    text = tinymce_models.HTMLField(verbose_name="Текст")
    image = models.ImageField(upload_to='uploads/images', verbose_name="Картинка", blank=True, null=True)
    title_main = models.CharField(max_length=1024, verbose_name="Заголовок страницы", blank=True, null=True)
    keywords = models.TextField(verbose_name="Ключевые слова (мета)", blank=True, null=True)
    keywords_description = models.TextField(verbose_name="Описание (мета)", blank=True, null=True)
    is_hidden = models.BooleanField(verbose_name="Скрыть", blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-date"]
        verbose_name_plural = "Новости"


def delete_filefield(**kwargs):
    item = kwargs.get('instance')
    if item.image:
        if os.path.exists(item.image.path):
            os.remove(item.image.path)


def save_filefield(**kwargs):
    item = kwargs.get('instance')
    if item.id:
        obj = News.objects.get(id=item.id)
        if obj.image:
            if (not item.image) or obj.image.path != item.image.path:
                if os.path.exists(obj.image.path):
                    os.remove(obj.image.path)


post_delete.connect(delete_filefield, News)
pre_save.connect(save_filefield, News)
