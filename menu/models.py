import os

from django.db import models
from django.db.models.signals import post_delete, pre_save
from django.utils.text import slugify
from tinymce import models as tinymce_models
from transliterate import translit

from marka.models import Marka
from standart.models import Standart


class TypeMenu(models.Model):
	name = models.CharField(max_length=256, verbose_name="Название типа")
	template = models.CharField(max_length=1024, verbose_name="Название файла шаблона")
	
	def __str__(self):
		return self.name
	
	class Meta:
		ordering = ["id"]
		verbose_name_plural = "Тип меню"


class MenuCatalog(models.Model):
	name = models.CharField(max_length=255, verbose_name="Название пункта", unique=True)
	name_title = models.CharField(max_length=255, verbose_name="Название (в ед. числе)", blank=True)
	slug = models.SlugField(max_length=255, verbose_name="Название латинское", blank=True, unique=True)
	order_number = models.FloatField(verbose_name="Порядковый номер", blank=True, null=True)
	parent = models.ForeignKey('self', verbose_name="Родительский пункт", null=True, blank=True,
							   on_delete=models.CASCADE)
	type_menu = models.ForeignKey(TypeMenu, verbose_name="Тип меню", on_delete=models.CASCADE)
	label_param1 = models.CharField(max_length=128, verbose_name="Название параметра 1", blank=True, null=True)
	ed_izm_param1 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра 1", blank=True, null=True)
	label_param2 = models.CharField(max_length=128, verbose_name="Название параметра 2", blank=True, null=True)
	ed_izm_param2 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра 2", blank=True, null=True)
	label_param3 = models.CharField(max_length=128, verbose_name="Название параметра 3", blank=True, null=True)
	ed_izm_param3 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра 3", blank=True, null=True)
	label_param4 = models.CharField(max_length=128, verbose_name="Название параметра 4", blank=True, null=True)
	ed_izm_param4 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра 4", blank=True, null=True)
	label_param5 = models.CharField(max_length=128, verbose_name="Название параметра 5", blank=True, null=True)
	ed_izm_param5 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра 5", blank=True, null=True)
	label_param6 = models.CharField(max_length=128, verbose_name="Название параметра 6", blank=True, null=True)
	ed_izm_param6 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра 6", blank=True, null=True)
	label_param7 = models.CharField(max_length=128, verbose_name="Название параметра 7", blank=True, null=True)
	ed_izm_param7 = models.CharField(max_length=128, verbose_name="Ед. изм. параметра ", blank=True, null=True)
	is_hide_marka = models.BooleanField(verbose_name="Скрыть марку", blank=True)
	is_hide_standart = models.BooleanField(verbose_name="Скрыть ГОСТ", blank=True)
	image = models.ImageField(upload_to='uploads/images', verbose_name="Картинка", blank=True, null=True)
	description = tinymce_models.HTMLField(verbose_name="Описание", blank=True, null=True)
	text_service = models.CharField(max_length=255, verbose_name="Текст для карточки услуги", blank=True, null=True,
									default="")
	uslugi = models.ManyToManyField('self', verbose_name='Услуги', db_table='MenuCatalog_and_uslugi_MenuCatalog',
									related_name='_id', blank=True)
	flag_footer = models.BooleanField(verbose_name="Отображать в подвале")
	title_main = models.CharField(max_length=512, verbose_name="Заголовок страницы", blank=True, null=True)
	keywords = models.TextField(verbose_name="Ключевые слова (мета)", blank=True, null=True,
								help_text='Ключевые слова для SEO продвижения (через запятую). Мета тэг - keywords')
	keywords_description = models.TextField(verbose_name="Описание (мета)", blank=True, null=True,
											help_text='Содержимое мета тэга - description')
	is_hidden_child = models.BooleanField(verbose_name="Скрыть дочерние пункты", default=False)
	is_hidden = models.BooleanField(verbose_name="Скрыть")
	show_footer_left = models.BooleanField(verbose_name="Показывать в подвале (левый столбец)", default=False)
	show_footer_rigth = models.BooleanField(verbose_name="Показывать в подвале (правый столбец)", default=False)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	
	def __str__(self):
		return self.name
	
	class Meta:
		ordering = ["order_number"]
		verbose_name_plural = "Меню/Каталог"
	
	def get_child(self):
		return MenuCatalog.objects.filter(parent=self, is_hidden=False)


class Product(models.Model):
	order_number = models.FloatField(verbose_name="Приоритет (Порядковый номер)", blank=True, null=True)
	name = models.CharField(max_length=1024, verbose_name="Название")
	slug = models.SlugField(max_length=1024, verbose_name="Название латинское", blank=True, null=True)
	catalog = models.ForeignKey(MenuCatalog, verbose_name="Категория металлопроката", on_delete=models.CASCADE)
	
	param_1 = models.CharField(max_length=128, verbose_name="Параметр 1", blank=True, null=True, default='')
	param_1_slug = models.SlugField(max_length=128, verbose_name="Параметр 1 slug", blank=True, null=True, default='')
	param_2 = models.CharField(max_length=128, verbose_name="Параметр 2", blank=True, null=True, default='')
	param_2_slug = models.SlugField(max_length=128, verbose_name="Параметр 2 slug", blank=True, null=True, default='')
	param_3 = models.CharField(max_length=128, verbose_name="Параметр 3", blank=True, null=True, default='')
	param_3_slug = models.SlugField(max_length=128, verbose_name="Параметр 3 slug", blank=True, null=True, default='')
	param_4 = models.CharField(max_length=128, verbose_name="Параметр 4", blank=True, null=True, default='')
	param_4_slug = models.SlugField(max_length=128, verbose_name="Параметр 4 slug", blank=True, null=True, default='')
	param_5 = models.CharField(max_length=128, verbose_name="Параметр 5", blank=True, null=True, default='')
	param_5_slug = models.SlugField(max_length=128, verbose_name="Параметр 5 slug", blank=True, null=True, default='')
	param_6 = models.CharField(max_length=128, verbose_name="Параметр 6", blank=True, null=True, default='')
	param_6_slug = models.SlugField(max_length=128, verbose_name="Параметр 6 slug", blank=True, null=True, default='')
	param_7 = models.CharField(max_length=128, verbose_name="Параметр 7", blank=True, null=True, default='')
	param_7_slug = models.SlugField(max_length=128, verbose_name="Параметр 7 slug", blank=True, null=True, default='')
	
	marka = models.ForeignKey(Marka, verbose_name="Марка", blank=True, null=True, on_delete=models.CASCADE)
	standart = models.ForeignKey(Standart, verbose_name="ГОСТ", blank=True, null=True, on_delete=models.CASCADE)
	is_service = models.BooleanField(verbose_name="Услуга", default=False)
	is_manufacture = models.BooleanField(verbose_name="Производство", default=False)
	is_spec = models.BooleanField(verbose_name="Спецпредложение", default=False)
	available = models.CharField(max_length=128, verbose_name="Наличие", blank=True, null=True)
	ed_izm = models.CharField(max_length=128, verbose_name="Единицы измерения", blank=True, null=True)
	price = models.CharField(max_length=128, verbose_name="Цена", blank=True, null=True)
	image = models.CharField(max_length=256, verbose_name="Картинка основная", blank=True, null=True)
	image_2 = models.CharField(max_length=256, verbose_name="Картинка 2", blank=True, null=True)
	description = tinymce_models.HTMLField(verbose_name="Описание", blank=True, null=True)
	description_service = models.CharField(max_length=256, verbose_name="Описание (услуга)", blank=True, null=True)
	vendor = models.CharField(max_length=128, verbose_name="Производитель", blank=True, null=True)
	vendor_country = models.CharField(max_length=128, verbose_name="Страна производителя", blank=True, null=True)
	method_of_manufacture = models.CharField(max_length=128, verbose_name="Способ изготовления", blank=True, null=True)
	# sertificate = models.ForeignKey(Sertificats, verbose_name="Сертификат", blank=True, null=True)
	title_main = models.CharField(max_length=512, verbose_name="Заголовок страницы", blank=True, null=True)
	keywords = models.TextField(verbose_name="Ключевые слова (мета)", blank=True, null=True)
	keywords_description = models.TextField(verbose_name="Описание (мета)", blank=True, null=True)
	is_hidden = models.BooleanField(verbose_name="Скрыть", default=False)
	updated_at = models.DateTimeField(auto_now=True)
	
	def __str__(self):
		return self.name
	
	class Meta:
		ordering = ["catalog"]
		verbose_name_plural = "Продукт"
	
	def set_slug(self):
		if self.param_1:
			self.name += " {}".format(self.param_1)
			self.param_1_slug = slugify(translit(self.param_1.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.param_2:
			self.name += " {}".format(self.param_2)
			self.param_2_slug = slugify(translit(self.param_2.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.param_3:
			self.name += " {}".format(self.param_3)
			self.param_3_slug = slugify(translit(self.param_3.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.param_4:
			self.name += " {}".format(self.param_4)
			self.param_4_slug = slugify(translit(self.param_4.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.param_5:
			self.name += " {}".format(self.param_5)
			self.param_5_slug = slugify(translit(self.param_5.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.param_6:
			self.name += " {}".format(self.param_6)
			self.param_6_slug = slugify(translit(self.param_6.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.param_7:
			self.name += " {}".format(self.param_7)
			self.param_7_slug = slugify(translit(self.param_7.replace('.', '-').replace(',', '-'), "ru", reversed=True))
		if self.marka:
			self.name += " {}".format(self.marka.name)
		if self.standart:
			self.name += " {}".format(self.standart.name)
		
		self.slug = slugify(translit(self.name.replace('.', '-').replace(',', '-'), "ru", reversed=True))


class Slider(models.Model):
	order_number = models.FloatField(verbose_name="Порядковый номер", blank=True, null=True)
	name = models.CharField(max_length=256, verbose_name="Название")
	text = models.CharField(max_length=256, verbose_name="Текст", blank=True, null=True)
	button_text = models.CharField(max_length=256, verbose_name="Название кнопки", blank=True, null=True)
	url = models.CharField(max_length=256, verbose_name="Ссылка", blank=True, null=True)
	image = models.ImageField(upload_to='uploads/images', verbose_name="Картинка")
	is_hidden = models.BooleanField(verbose_name="Скрыть", blank=True)
	
	def __str__(self):
		return self.name
	
	class Meta:
		ordering = ["order_number"]
		verbose_name_plural = "Слайдер"


def delete_filefield(sender, **kwargs):
	item = kwargs.get('instance')
	if item.image:
		if os.path.exists(item.image.path):
			os.remove(item.image.path)


def save_filefield(sender, **kwargs):
	# product_list = Product.objects.all()
	# i = 0
	# for item in product_list[21700:]:
	#     i += 1
	#     if i % 100 == 0:
	#         print(i)
	#     item.name = item.catalog.name
	#     item.set_slug()
	#     item.save()
	# return
	item = kwargs.get('instance')
	if item.id:
		obj = sender.objects.get(id=item.id)
		if obj.image:
			if (not item.image) or obj.image.path != item.image.path:
				if os.path.exists(obj.image.path):
					os.remove(obj.image.path)


post_delete.connect(delete_filefield, Slider)
pre_save.connect(save_filefield, Slider)

post_delete.connect(delete_filefield, MenuCatalog)
pre_save.connect(save_filefield, MenuCatalog)
