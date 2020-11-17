import os

from django.db import models
from django.db.models.signals import post_delete, pre_save
from tinymce import models as tinymce_models


class TextBlockUrl(models.Model):
	url = models.CharField(max_length=1024, verbose_name="url страницы")
	order_number = models.IntegerField(verbose_name="Порядковый номер", blank=True, null=True)
	name = models.CharField(max_length=1024, verbose_name="Название")
	date = models.DateTimeField(verbose_name='Дата', blank=True, null=True, editable=False)
	text = tinymce_models.HTMLField(verbose_name="Текст", blank=True, null=True)
	h1 = models.CharField(max_length=1024, verbose_name="H1 страницы", blank=True, null=True, default="")
	title_main = models.CharField(max_length=1024, verbose_name="Заголовок страницы", blank=True, null=True, default="")
	keywords = models.TextField(verbose_name="Ключевые слова (мета)", blank=True, null=True, default="")
	keywords_description = models.TextField(verbose_name="Описание (мета)", blank=True, null=True, default="")
	image = models.ImageField(upload_to='uploads/images', verbose_name="Картинка", blank=True, null=True)
	isHidden = models.BooleanField(verbose_name="Скрыть", blank=True)
	
	def __str__(self):
		return self.name
	
	class Meta:
		ordering = ["order_number"]
		verbose_name_plural = u"Текстовый блок (ссылка)"


def delete_filefield(sender, **kwargs):
	text_block = kwargs.get('instance')
	if text_block.image:
		if os.path.exists(text_block.image.path):
			os.remove(text_block.image.path)


def save_filefield(sender, **kwargs):
	text_block = kwargs.get('instance')
	if text_block.id:
		obj = TextBlockUrl.objects.get(id=text_block.id)
		if obj.image:
			if (not text_block.image) or obj.image.path != text_block.image.path:
				if os.path.exists(obj.image.path):
					os.remove(obj.image.path)


post_delete.connect(delete_filefield, TextBlockUrl)
pre_save.connect(save_filefield, TextBlockUrl)
