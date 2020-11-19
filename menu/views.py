import json
import re
from itertools import groupby
from operator import itemgetter

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from django.db.models import Q
from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.utils.text import slugify
from django.views.generic.base import TemplateView, View
from transliterate import translit

from checkout import cartpy as cart
from marka.models import Marka
from news.models import News
from standart.models import Standart
from static_text.views import get_static_text
from .models import MenuCatalog, Product, Slider

ID_TYPE_MENU_SERVICE = 2
ID_TYPE_MENU_SPEC = 3
ID_TYPE_MENU_MANUFACTURE = 8

ID_TYPE_CATEGORY_LIST = 7

MAX_COUNT_PRODUCTS = 21

PRODUCT_LIST_TITLE_PAGE = 'product_list_title_page'
PRODUCT_LIST_META_DESCRIPTION = 'product_list_meta_description'
PRODUCT_LIST_META_KEYWORDS = 'product_list_meta_keywords'
PRODUCT_LIST_DESCRIPTION = 'product_list_description'

PRODUCT_TEXT_SLUG = 'product_text'

SIZE_SALE_INDEX = 6
SIZE_SERVICE_INDEX = 6
SIZE_CATEGORIES_INDEX = 6


class IndexView(TemplateView):
	template_name = "catalog/index.pug"
	
	def get(self, request):
		slider_list = Slider.objects.filter(is_hidden=False)
		# proposal_list = Proposal.objects.filter(is_show_main=True, is_hidden=False)
		# client_list = Client.objects.filter(is_hidden=False)
		# project_list = Project.objects.filter(is_show_main=True, is_hidden=False)
		# advantages_list = Advantages.objects.filter(is_hidden=False)
		news_list = News.objects.filter(is_hidden=False)[:3]
		spec_list = Product.objects.filter(is_spec=True, is_hidden=False)[:SIZE_SALE_INDEX]
		manufacture_list = Product.objects.filter(is_manufacture=True, is_hidden=False)[:SIZE_SERVICE_INDEX]
		categories_list = MenuCatalog.objects.filter(parent_id=1, type_menu_id=6)[:10]
		for category in categories_list:
			category.children = category.get_child()
		
		popular_categories = MenuCatalog.objects.order_by('created_at')[:10]
		ip = request.META.get('REMOTE_ADDR')
		return render(request, self.template_name, locals())


def get_sort_type(sort_type, product_list):
	sort_type_str = ""
	if sort_type == '1':
		product_list = product_list.order_by('name')
		sort_type_str = 'По имени (А-Я)'
	elif sort_type == '2':
		product_list = product_list.order_by('-name')
		sort_type_str = 'По имени (Я-А)'
	elif sort_type == '3':
		product_list = product_list.order_by('price')
		sort_type_str = 'По цене (дешевые)'
	elif sort_type == '4':
		product_list = product_list.order_by('-price')
		sort_type_str = 'По цене (дорогие)'
	return sort_type_str, product_list


class MenuView(View):
	def get(self, request, menu_slug):
		try:
			sort_type = request.GET['sort']
		except:
			sort_type = ""
		current_menu = get_object_or_404(MenuCatalog, slug=menu_slug)
		spec_list = Product.objects.filter(is_spec=True, is_hidden=False)[:SIZE_SALE_INDEX]
		
		if current_menu.type_menu_id == ID_TYPE_MENU_SERVICE:
			service_list = Product.objects.filter(is_service=True)
		if current_menu.type_menu_id == ID_TYPE_MENU_MANUFACTURE:
			manufacture_list = Product.objects.filter(is_manufacture=True)
		if current_menu.type_menu_id == ID_TYPE_MENU_SPEC:
			product_list = Product.objects.filter(is_spec=True)
		if current_menu.type_menu_id == ID_TYPE_CATEGORY_LIST:
			product_list = Product.objects.filter(catalog=current_menu)
			marka_filter = list(map(itemgetter(0), groupby(
				product_list.values('marka__name', 'marka__slug').order_by('marka__name').annotate(
					dcount=Count('marka__name')))))
			standart_filter = list(map(itemgetter(0), groupby(
				product_list.values('standart__name', 'standart__slug').order_by('standart__name').annotate(
					dcount=Count('standart__name')))))
			param_1_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_1_slug__isnull=False).values('param_1', 'param_1_slug').annotate(
					dcount=Count('param_1_slug'))))), key=key_sort)
			param_2_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_2_slug__isnull=False).values('param_2', 'param_2_slug').annotate(
					dcount=Count('param_2_slug'))))), key=key_sort)
			param_3_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_3_slug__isnull=False).values('param_3', 'param_3_slug').annotate(
					dcount=Count('param_3_slug'))))), key=key_sort)
			param_4_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_4_slug__isnull=False).values('param_4', 'param_4_slug').annotate(
					dcount=Count('param_4_slug'))))), key=key_sort)
			param_5_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_5_slug__isnull=False).values('param_5', 'param_5_slug').annotate(
					dcount=Count('param_5_slug'))))), key=key_sort)
			param_6_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_6_slug__isnull=False).values('param_6', 'param_6_slug').annotate(
					dcount=Count('param_6_slug'))))), key=key_sort)
			param_7_filter = sorted(list(map(itemgetter(0), groupby(
				product_list.filter(param_7_slug__isnull=False).values('param_7', 'param_7_slug').annotate(
					dcount=Count('param_7_slug'))))), key=key_sort)
			
			page = 1
			current_filter_url = request.path
			product_list_count = product_list.count()
			
			if sort_type:
				sort_type_str, product_list = get_sort_type(sort_type, product_list)
			
			paginator_min = 1
			paginator_max = 10
			paginator = Paginator(product_list, MAX_COUNT_PRODUCTS)
			try:
				product_list = paginator.page(page)
				if int(page) < 5:
					paginator_min = 1
					paginator_max = 10
				else:
					paginator_min = max(int(page) - 5, 1)
					paginator_max = min(int(page) + 5, paginator.num_pages)
			
			except PageNotAnInteger:
				product_list = paginator.page(1)
			
			except EmptyPage:
				product_list = paginator.page(paginator.num_pages)
		
		str_filter_name = current_menu.name
		product_list_title_page = get_static_text(request, locals(), PRODUCT_LIST_TITLE_PAGE)
		product_list_meta_description = get_static_text(request, locals(), PRODUCT_LIST_META_DESCRIPTION)
		product_list_meta_keywords = get_static_text(request, locals(), PRODUCT_LIST_META_KEYWORDS)
		product_list_description = get_static_text(request, locals(), PRODUCT_LIST_DESCRIPTION)
		return render(request, current_menu.type_menu.template.replace('.html', '.pug'), locals())


class MenuChildView(TemplateView):
	template_name = "menu/get_child.pug"
	
	def get(self, request, pk):
		child_menu = get_object_or_404(MenuCatalog, id=pk).get_child()
		return render(request, self.template_name, locals())


class ProductView(TemplateView):
	template_name = "catalog/product.pug"
	
	def get(self, request, product_slug):
		product = get_object_or_404(Product, slug=product_slug)
		current_menu = product.catalog
		html_static_text = get_static_text(request, locals(), PRODUCT_TEXT_SLUG)
		spec_list = Product.objects.filter(is_spec=True, is_hidden=False).exclude(slug=product.slug)[:SIZE_SALE_INDEX]
		if product.is_service:
			self.template_name = "catalog/service.pug"
		return render(request, self.template_name, locals())


def param_slugify(value):
	return slugify(translit(value.replace('.', '-').replace(',', '-'), "ru", reversed=True))


def key_sort(arg):
	try:
		title = arg.value
	except:
		title = list(arg.values())[0]
	try:
		res = float(title.replace(",", "."))
	except:
		res = title
	return res


class GetFilterUrl(View):
	"""
	Класс обрабатывает запрос на получение url при выбранных фильтрах
	"""
	
	@staticmethod
	def post(request):
		postdatatmp = request.POST.copy()
		menu_slug = postdatatmp['menu_slug']
		param_1 = ""
		param_2 = ""
		param_3 = ""
		param_4 = ""
		param_5 = ""
		param_6 = ""
		param_7 = ""
		sort_type = ""
		current_marka = None
		current_standart = None
		try:
			current_standart = postdatatmp['filter_standart']
			if current_standart == '':
				gost = None
				current_standart = None
		except:
			pass
		try:
			current_marka = postdatatmp['filter_marka']
			if current_marka == '':
				marka = None
				current_marka = None
		except:
			pass
		
		try:
			param_1 = postdatatmp['filter_param_1']
		# param_1_lat = param_slugify(param_7)
		except:
			pass
		try:
			param_2 = postdatatmp['filter_param_2']
		# param_2_lat = param_slugify(param_7)
		except:
			pass
		try:
			param_3 = postdatatmp['filter_param_3']
		# param_3_lat = param_slugify(param_7)
		except:
			pass
		try:
			param_4 = postdatatmp['filter_param_4']
		# param_4_lat = param_slugify(param_7)
		except:
			pass
		try:
			param_5 = postdatatmp['filter_param_5']
		# param_5_lat = param_slugify(param_7)
		except:
			pass
		try:
			param_6 = postdatatmp['filter_param_6']
		# param_6_lat = param_slugify(param_7)
		except:
			pass
		try:
			param_7 = postdatatmp['filter_param_7']
		# param_7_lat = param_slugify(param_7)
		except:
			pass
		try:
			sort_type = postdatatmp['sort_type']
		except:
			pass
		
		current_menu = MenuCatalog.objects.only('slug').get(slug=menu_slug)
		new_url = "/" + current_menu.slug
		
		if current_marka:
			new_url += '/{}'.format(current_marka)
		if current_standart:
			new_url += '/{}'.format(current_standart)
		if param_1:
			new_url += '/p_1/{}'.format(param_1)
		if param_2:
			new_url += '/p_2/{}'.format(param_2)
		if param_3:
			new_url += '/p_3/{}'.format(param_3)
		if param_4:
			new_url += '/p_4/{}'.format(param_4)
		if param_5:
			new_url += '/p_5/{}'.format(param_5)
		if param_6:
			new_url += '/p_6/{}'.format(param_6)
		if param_7:
			new_url += '/p_7/{}'.format(param_7)
		new_url += '/'
		
		if sort_type:
			new_url = "?sort={}".format(sort_type)
		
		response_data = {'url': new_url, }
		
		return HttpResponse(json.dumps(response_data), content_type="application/json")


class CatalogView(TemplateView):
	"""
	Класс для отображения страницы каталога
	"""
	template_name = "catalog/product_list.pug"
	
	def get(self, request, menu_slug):
		select_params = request.path[:-1]
		try:
			current_menu = MenuCatalog.objects.select_related('type_menu').get(slug=menu_slug)
		except:
			raise Http404()
		
		str_filter_name = current_menu.name
		
		current_filter_url = request.path
		if current_filter_url.find("page/") > 0:
			current_filter_url = current_filter_url[:current_filter_url.find("page/")]
		
		# Фильтр по выбранным полям
		marka = None
		gost = None
		page = 1
		param_1 = ""
		param_2 = ""
		param_3 = ""
		param_4 = ""
		param_5 = ""
		param_6 = ""
		param_7 = ""
		
		current_marka = None
		current_standart = None
		if select_params == "/" + menu_slug:
			select_params = None
		
		if select_params:
			reg_exp = re.compile("[/]")
			params = re.split(reg_exp, select_params)
			params = params[2:len(params)]
			current_index = 0  # если current_index=-1, значит достигнут конец параметров (для переключения страниц)
			size_f = ["p_1", "p_2", "p_3", "p_4", "p_5", "p_6", "p_7", "page"]
			if params:
				if params[-1] in size_f:
					raise Http404()
				try:
					marka_slug = str(params[0])
					current_marka = Marka.objects.get(slug=marka_slug)
					current_index = 1
				except:
					try:
						current_marka = None
						gost_slug = str(params[0])
						current_standart = Standart.objects.get(slug=gost_slug)
						current_index = 1
					except:
						if len(params) > 1 and params[0] in size_f:
							current_index = 2
							if params[0] == "p_1":
								param_1 = params[1]
							if params[0] == "p_2":
								param_2 = params[1]
							if params[0] == "p_3":
								param_3 = params[1]
							if params[0] == "p_4":
								param_4 = params[1]
							if params[0] == "p_5":
								param_5 = params[1]
							if params[0] == "p_6":
								param_6 = params[1]
							if params[0] == "p_7":
								param_7 = params[1]
							if params[0] == "page":
								page = params[1]
								current_index = -1
								if len(params) > 2:
									raise Http404()
						else:
							raise Http404()
				if len(params) > 1 and current_index == 1:
					try:
						if not current_standart:
							gost_slug = str(params[1])
							current_standart = Standart.objects.get(slug=gost_slug)
							current_index = 2
					except:
						if len(params) > 2 and params[1] in size_f:
							current_index = 3
							gost = None
							if params[1] == "p_1":
								param_1 = params[2]
							if params[1] == "p_2":
								param_2 = params[2]
							if params[1] == "p_3":
								param_3 = params[2]
							if params[1] == "p_4":
								param_4 = params[2]
							if params[1] == "p_5":
								param_5 = params[2]
							if params[1] == "p_6":
								param_6 = params[2]
							if params[1] == "p_7":
								param_7 = params[2]
							if params[1] == "page":
								page = params[2]
								current_index = -1
								if len(params) > 3:
									raise Http404()
						else:
							raise Http404()
				while current_index > 0 and current_index < len(params) - 1:
					if params[current_index] in size_f:
						if params[current_index] == "p_1":
							param_1 = params[current_index + 1]
						if params[current_index] == "p_2":
							param_2 = params[current_index + 1]
						if params[current_index] == "p_3":
							param_3 = params[current_index + 1]
						if params[current_index] == "p_4":
							param_4 = params[current_index + 1]
						if params[current_index] == "p_5":
							param_5 = params[current_index + 1]
						if params[current_index] == "p_6":
							param_6 = params[current_index + 1]
						if params[current_index] == "p_7":
							param_7 = params[current_index + 1]
						if params[current_index] == "page":
							page = params[current_index + 1]
						current_index += 2
					else:
						raise Http404()
		
		# if param_1 == current_menu.label_param1:
		#     param_1 = ""
		# if param_2 == current_menu.label_param2:
		#     param_2 = ""
		# if param_3 == current_menu.label_param3:
		#     param_3 = ""
		# if param_4 == current_menu.label_param4:
		#     param_4 = ""
		# if param_5 == current_menu.label_param5:
		#     param_5 = ""
		# if param_6 == current_menu.label_param6:
		#     param_6 = ""
		# if param_7 == current_menu.label_param7:
		#     param_7 = ""
		
		try:
			page = int(page)
		except:
			page = 1
		try:
			sort_type = request.GET['sort']
		except:
			sort_type = ""
		
		filter_s_list = {}
		product_list = Product.objects.filter(catalog=current_menu)
		if product_list.count():
			filter_s_list['catalog'] = Q(catalog_id=current_menu.id)
			if current_marka:
				filter_s_list['marka'] = Q(marka_id=current_marka.id)
			if current_standart:
				filter_s_list['standart'] = Q(standart_id=current_standart.id)
			if param_1:
				filter_s_list['param_1'] = Q(param_1_slug=param_1)
			if param_2:
				filter_s_list['param_2'] = Q(param_2_slug=param_2)
			if param_3:
				filter_s_list['param_3'] = Q(param_3_slug=param_3)
			if param_4:
				filter_s_list['param_4'] = Q(param_4_slug=param_4)
			if param_5:
				filter_s_list['param_5'] = Q(param_5_slug=param_5)
			if param_6:
				filter_s_list['param_6'] = Q(param_6_slug=param_6)
			if param_7:
				filter_s_list['param_7'] = Q(param_7_slug=param_7)
			
			filter_s_base = Q()
			for filter_item in filter_s_list.values():
				filter_s_base &= filter_item
				filter_flag = True
			
			product_list = product_list.filter(filter_s_base)
			
			# Формирование списка допустимых марок и ГОСТов
			marka_filter = []
			standart_filter = []
			param_1_filter = []
			param_2_filter = []
			param_3_filter = []
			param_4_filter = []
			param_5_filter = []
			param_6_filter = []
			param_7_filter = []
			
			if current_marka:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'marka':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.select_related("marka").filter(filter_s_base).only('marka__name',
																									  'marka__slug').values(
					'marka__name', 'marka__slug').order_by('marka__name').annotate(dcount=Count('marka__name'))
				marka_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				str_filter_name += " {}".format(current_marka.name)
			else:
				marka_filter = list(map(itemgetter(0), groupby(
					product_list.only('marka__name', 'marka__slug').values('marka__name', 'marka__slug').order_by(
						'marka__name').annotate(dcount=Count('marka__name')))))
			
			if current_standart:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'standart':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.select_related("standart").filter(filter_s_base).only(
					'standart__name', 'standart__slug').values('standart__name', 'standart__slug').order_by(
					'standart__name').annotate(dcount=Count('standart__name'))
				standart_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				str_filter_name += " {}".format(current_standart.name)
			else:
				standart_filter = list(map(itemgetter(0), groupby(
					product_list.only('standart__name', 'standart__slug').values('standart__name',
																				 'standart__slug').order_by(
						'standart__name').annotate(dcount=Count('standart__name')))))
			
			if param_1:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_1':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_1', 'param_1_slug').values(
					'param_1', 'param_1_slug').order_by('param_1').annotate(dcount=Count('param_1'))
				param_1_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_1_name = product_list_tmp.filter(param_1_slug=param_1).first()['param_1']
				str_filter_name += " {}".format(param_1_name)
			else:
				param_1_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_1', 'param_1_slug').values('param_1', 'param_1_slug').order_by(
						'param_1').annotate(dcount=Count('param_1')))))
			param_1_filter = sorted(param_1_filter, key=key_sort)
			
			if param_2:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_2':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_2', 'param_2_slug').values(
					'param_2', 'param_2_slug').order_by('param_2').annotate(dcount=Count('param_2'))
				param_2_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_2_name = product_list_tmp.filter(param_2_slug=param_2).first()['param_2']
				str_filter_name += " {}".format(param_2_name)
			else:
				param_2_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_2', 'param_2_slug').values('param_2', 'param_2_slug').order_by(
						'param_2').annotate(dcount=Count('param_2')))))
			param_2_filter = sorted(param_2_filter, key=key_sort)
			
			if param_3:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_3':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_3', 'param_3_slug').values(
					'param_3', 'param_3_slug').order_by('param_3').annotate(dcount=Count('param_3'))
				param_3_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_3_name = product_list_tmp.filter(param_3_slug=param_3).first()['param_3']
				str_filter_name += " {}".format(param_3_name)
			else:
				param_3_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_3', 'param_3_slug').values('param_3', 'param_3_slug').order_by(
						'param_3').annotate(dcount=Count('param_3')))))
			param_3_filter = sorted(param_3_filter, key=key_sort)
			
			if param_4:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_4':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_4', 'param_4_slug').values(
					'param_4', 'param_4_slug').order_by('param_4').annotate(dcount=Count('param_4'))
				param_4_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_4_name = product_list_tmp.filter(param_4_slug=param_4).first()['param_4']
				str_filter_name += " {}".format(param_4_name)
			else:
				param_4_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_4', 'param_4_slug').values('param_4', 'param_4_slug').order_by(
						'param_4').annotate(dcount=Count('param_4')))))
			param_4_filter = sorted(param_4_filter, key=key_sort)
			
			if param_5:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_5':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_5', 'param_5_slug').values(
					'param_5', 'param_5_slug').order_by('param_5').annotate(dcount=Count('param_5'))
				param_5_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_5_name = product_list_tmp.filter(param_5_slug=param_5).first()['param_5']
				str_filter_name += " {}".format(param_5_name)
			else:
				param_5_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_5', 'param_5_slug').values('param_5', 'param_5_slug').order_by(
						'param_5').annotate(dcount=Count('param_5')))))
			param_5_filter = sorted(param_5_filter, key=key_sort)
			
			if param_6:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_6':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_6', 'param_6_slug').values(
					'param_6', 'param_6_slug').order_by('param_6').annotate(dcount=Count('param_6'))
				param_6_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_6_name = product_list_tmp.filter(param_6_slug=param_6).first()['param_6']
				str_filter_name += " {}".format(param_6_name)
			else:
				param_6_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_6', 'param_6_slug').values('param_6', 'param_6_slug').order_by(
						'param_6').annotate(dcount=Count('param_6')))))
			param_6_filter = sorted(param_6_filter, key=key_sort)
			
			if param_7:
				filter_s_base = Q()
				for filter_item in filter_s_list:
					if filter_item != 'param_7':
						filter_s_base &= filter_s_list[filter_item]
				product_list_tmp = Product.objects.filter(filter_s_base).only('param_7', 'param_7_slug').values(
					'param_7', 'param_7_slug').order_by('param_7').annotate(dcount=Count('param_7'))
				param_7_filter = list(map(itemgetter(0), groupby(product_list_tmp)))
				param_7_name = product_list_tmp.filter(param_7_slug=param_7).first()['param_7']
				str_filter_name += " {}".format(param_7_name)
			else:
				param_7_filter = list(map(itemgetter(0), groupby(
					product_list.only('param_7', 'param_7_slug').values('param_7', 'param_7_slug').order_by(
						'param_7').annotate(dcount=Count('param_7')))))
			param_7_filter = sorted(param_7_filter, key=key_sort)
			
			if sort_type:
				sort_type_str, product_list = get_sort_type(sort_type, product_list)
		
		# Формирование списка схожих товаров
		# if current_menu.parent:
		#     MetallCategoriesSimilar = []
		#     MetallCategoriesSimilarAll = MenuCatalog.objects.filter(parent=current_menu.parent.id, isHidden=False)
		#     counterTmp = 0
		#     if(len(MetallCategoriesSimilarAll)>1):
		#         for itemTmp in MetallCategoriesSimilarAll:
		#             if itemTmp == current_menu:
		#                 #MetallCategoriesSimilar = MetallCategoriesSimilarAll[0:counterTmp] + MetallCategoriesSimilarAll[counterTmp+1:len(MetallCategoriesSimilarAll)]
		#                 if(counterTmp>1 and counterTmp<len(MetallCategoriesSimilarAll)-2):
		#                     MetallCategoriesSimilar = MetallCategoriesSimilarAll[counterTmp-2:counterTmp]+MetallCategoriesSimilarAll[counterTmp+1:min(counterTmp+3,len(MetallCategoriesSimilarAll))]
		#                 elif counterTmp == 1:
		#                     MetallCategoriesSimilar = MetallCategoriesSimilarAll[0:1]+MetallCategoriesSimilarAll[2:min(7,len(MetallCategoriesSimilarAll))]
		#                 elif counterTmp == 0:
		#                     MetallCategoriesSimilar = MetallCategoriesSimilarAll[1:min(7,len(MetallCategoriesSimilarAll))]
		#                 elif counterTmp == len(MetallCategoriesSimilarAll)-2:
		#                     MetallCategoriesSimilar = MetallCategoriesSimilarAll[max(0,counterTmp-2):counterTmp] + MetallCategoriesSimilarAll[counterTmp+1:len(MetallCategoriesSimilarAll)]
		#                 elif counterTmp == len(MetallCategoriesSimilarAll)-1:
		#                     MetallCategoriesSimilar = MetallCategoriesSimilarAll[max(0,counterTmp-3):counterTmp]
		#             counterTmp = counterTmp+1
		#     metall_categories_similar = MetallCategoriesSimilar
		# Формирование списка схожих производств/услуг
		# UslugiSimilar = []
		# UslugiSimilarAll = MenuCatalog.objects.filter(parent=current_menu.parent.id, isHidden=False)
		# counterTmpUslugi = 0
		# if (len(UslugiSimilarAll) > 1):
		#     for itemTmp in UslugiSimilarAll:
		#         if itemTmp == current_menu:
		#             if (counterTmpUslugi > 1 and counterTmpUslugi < len(UslugiSimilarAll) - 2):
		#                 UslugiSimilar = UslugiSimilarAll[counterTmpUslugi-2:counterTmpUslugi]+UslugiSimilarAll[counterTmpUslugi+1:min(counterTmpUslugi+5,len(UslugiSimilarAll))]
		#             elif counterTmpUslugi == 1:
		#                 UslugiSimilar = UslugiSimilarAll[0:1]+UslugiSimilarAll[2:min(7,len(UslugiSimilarAll))]
		#             elif counterTmpUslugi == 0:
		#                 UslugiSimilar = UslugiSimilarAll[1:min(7, len(UslugiSimilarAll))]
		#             elif counterTmpUslugi == len(UslugiSimilarAll)-2:
		#                 UslugiSimilar = UslugiSimilarAll[max(0, counterTmpUslugi-7):counterTmpUslugi]+UslugiSimilarAll[counterTmpUslugi+1:len(UslugiSimilarAll)]
		#             elif counterTmpUslugi == len(UslugiSimilarAll)-1:
		#                 UslugiSimilar = UslugiSimilarAll[max(0,counterTmpUslugi-6):counterTmpUslugi]
		#         counterTmpUslugi = counterTmpUslugi+1
		# uslugi_similar = UslugiSimilar
		
		# marka_filter_list = marka_filter_list.select_related('marka', 'gost')
		# paginatorMin = 1
		# paginatorMax = 10
		# paginator = Paginator(marka_filter_list, SIZE_PAGE)
		
		# if page == 1 or page > paginator.num_pages:
		#     return HttpResponsePermanentRedirect("/" + current_menu.slug + "/")
		# if page == 0:
		#     page = 1
		
		# try:
		#     marka_filter_list = paginator.page(page)
		
		#     if int(page) < 5:
		#         paginatorMin = 1
		#         paginatorMax = 10
		#     else:
		#         paginatorMin = max(int(page)-5,1)
		#         paginatorMax = min(int(page)+5,paginator.num_pages)
		
		# except PageNotAnInteger:
		#     # If page is not an integer, deliver first page.
		#     marka_filter_list = paginator.page(1)
		
		# except EmptyPage:
		#     # If page is out of range (e.g. 9999), deliver last page of results.
		#     marka_filter_list = paginator.page(paginator.num_pages)
		
		# Определение верхнего главного каталога для бокового меню
		# current_menu_main = current_menu
		# while current_menu_main.parent:
		#     current_menu_main = current_menu_main.parent
		# dopTextBlockUrl = TextBlockUrl.objects.filter(url=request.path, isHidden=False)
		
		paginator_min = 1
		paginator_max = 10
		paginator = Paginator(product_list, MAX_COUNT_PRODUCTS)
		try:
			product_list = paginator.page(page)
			if int(page) < 5:
				paginator_min = 1
				paginator_max = 10
			else:
				paginator_min = max(int(page) - 5, 1)
				paginator_max = min(int(page) + 5, paginator.num_pages)
		
		except PageNotAnInteger:
			product_list = paginator.page(1)
		
		except EmptyPage:
			product_list = paginator.page(paginator.num_pages)
		
		product_list_title_page = get_static_text(request, locals(), PRODUCT_LIST_TITLE_PAGE)
		product_list_meta_description = get_static_text(request, locals(), PRODUCT_LIST_META_DESCRIPTION)
		product_list_meta_keywords = get_static_text(request, locals(), PRODUCT_LIST_META_KEYWORDS)
		product_list_description = get_static_text(request, locals(), PRODUCT_LIST_DESCRIPTION)
		
		# response = render_to_response(self.template_name, locals(), context_instance=RequestContext(request))
		# # Корректное формирование ответа сервера на запрос If-Modified-Since
		# if current_menu.updated_at:
		#     last_modified = request.META.get('HTTP_IF_MODIFIED_SINCE')
		#     if last_modified:
		#         if _if_modified_since(datetime2rfc(current_menu.updated_at), last_modified):
		#             return HttpResponseNotModified()
		#
		#     response['Last-Modified'] = datetime2rfc(current_menu.updated_at)
		# return response
		
		return render(request, self.template_name, locals())


class ProductGetView(View):
	
	def get(self, request, pk):
		product = get_object_or_404(Product, id=pk)
		response_data = {'name': product.name,
						 'id': product.id,
						 }
		return HttpResponse(json.dumps(response_data), content_type="application/json")
	
	def post(self, request, pk):
		product = get_object_or_404(Product, id=pk)
		cart.create_order(request, "Быстрый заказ")
		return HttpResponse(json.dumps({}), content_type="application/json")


class ProductGetPrice(View):
	
	def get(self, request, pk):
		product = get_object_or_404(Product, id=pk)
		response_data = {'name': product.name,
						 'id': product.id,
						 }
		return HttpResponse(json.dumps(response_data), content_type="application/json")
	
	def post(self, request, pk):
		product = get_object_or_404(Product, id=pk)
		cart.create_order(request, "Узнать цену")
		return HttpResponse(json.dumps({}), content_type="application/json")


class ProductAddView(View):
	template_name = "product/get_add_product.pug"
	
	def post(self, request):
		post_data = request.POST
		product_slug = post_data.get('product_slug', '')
		product = get_object_or_404(Product, slug=product_slug)
		cart.add_to_cart(request)
		
		return render(request, self.template_name, locals())


class ProductDelView(View):
	template_name = "cart/cart_block.pug"
	
	def post(self, request):
		post_data = request.POST
		# product_slug = post_data.get('product_slug', '')
		# product = get_object_or_404(Product, slug=product_slug)
		cart.remove_from_cart(request)
		cart_items = cart.get_cart_items(request)
		if not cart_items:
			self.template_name = "cart/cart_empty.pug"
		return render(request, self.template_name, locals())
