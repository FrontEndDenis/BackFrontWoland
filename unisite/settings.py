"""
Django settings for unisite project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import getpass
import os

from utils.frontend.magic import add_url_generator_to_models

add_url_generator_to_models()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!i-=np=o0=p%)dl=k-)dp_+ks8o$5#%79d^d(q+%5w5z$^3uhi'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

SITE_NAME = 'UniSite'
VERSION_NAME = '1.0.0 от 20.09.20'
START_YEAR = '2019'
USER_NAME = getpass.getuser()
PROJECT_NAME = 'unisite'

DATABASE_HOST = 'localhost'

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

DATABASE_NAME = 'woland'
DATABASE_PASS = 'woland'

if "unisite/unisite" in BASE_DIR:
	DEBUG = True
	PATH_PROJECT = '/home/unisite/unisite/'
else:
	DEBUG = True
	PATH_PROJECT = '/home/' + USER_NAME + '/PycharmProjects/' + PROJECT_NAME
	# DATABASE_HOST = 'gkws.ru'
	# DATABASE_HOST = 'gkws.kz'
	# DATABASE_HOST = 'isteels.ru'
	DATABASE_HOST = 'dev-db.roiburo.ru'
	# MEDIA_URL = 'http://gkws.ru/media/'
	MEDIA_URL = 'http://al-titan.ru/media/'

STATIC_ROOT = PATH_PROJECT + '/www/static/'
MEDIA_ROOT = PATH_PROJECT + '/www/media/'

# Application definition

INSTALLED_APPS = [
	'admin_m.apps.AdminMConfig',
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'tinymce',
	'marka.apps.MarkaConfig',
	'standart.apps.StandartConfig',
	'menu.apps.MenuConfig',
	'news.apps.NewsConfig',
	'project_settings.apps.ProjectSettingsConfig',
	'filials.apps.FilialsConfig',
	'text_block_url.apps.TextBlockUrlConfig',
	'import_image.apps.ImportImageConfig',
	'search.apps.SearchConfig',
	'checkout.apps.CheckoutConfig',
	'static_text.apps.StaticTextConfig',
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'unisite.urls'
TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [os.path.join(BASE_DIR, 'frontend/templates')],
		# 'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
				'admin_m.views.static_admin_url',
				'text_block_url.views.text_block_url',
				PROJECT_NAME + '.views.global_views',
				'utils.frontend.breadcrumbs.breadcrumbs'
			],
			'loaders': [
				# PyPugJS part:   ##############################
				('pypugjs.ext.django.Loader', (
					'django.template.loaders.filesystem.Loader',
					'django.template.loaders.app_directories.Loader',
				))
			],
			'builtins': [
				'pypugjs.ext.django.templatetags',
				'utils.frontend.mixins',
			],
			
		},
	},
]

WSGI_APPLICATION = 'unisite.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.mysql',
		'NAME': DATABASE_NAME,
		'USER': DATABASE_NAME,
		'PASSWORD': DATABASE_PASS,
		'HOST': DATABASE_HOST,
		'PORT': '3306',  # Set to empty string for default.
		'CONN_MAX_AGE': 60 * 10,  # 10 minutes
	}
}
# user: unisite pass: eybcfqn2020 ("унисайт2020" на латинской раскладке)
# user_admin: admin pass: 20flvby20 ("20админ20" на латинской раскладке)

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

TIME_ZONE = 'Asia/Yekaterinburg'
LANGUAGE_CODE = 'ru-RU'
SITE_ID = 1
USE_I18N = True
USE_L10N = True
USE_TZ = True

TINYMCE_DEFAULT_CONFIG = {
	'theme': "advanced",
	'theme_advanced_toolbar_location': "top",
	'height': "300",
	'plugins': 'fullscreen',
	'content_css': "/static/css/style.css",
	'forced_root_block': '',
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATICFILES_DIRS = (
	os.path.join(BASE_DIR, "static"),
)

STATIC_URL = '/static/'
CACHES = {
	'default': {
		'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
		'LOCATION': '/var/tmp/django_cache',
	}
}

if DEBUG:
	INSTALLED_APPS += [
		'debug_toolbar',
		'template_timings_panel',
	]
	MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]
	
	DEBUG_TOOLBAR_PANELS = [
		'debug_toolbar.panels.versions.VersionsPanel',
		'debug_toolbar.panels.timer.TimerPanel',
		'debug_toolbar.panels.settings.SettingsPanel',
		'debug_toolbar.panels.headers.HeadersPanel',
		'debug_toolbar.panels.request.RequestPanel',
		'debug_toolbar.panels.sql.SQLPanel',
		'debug_toolbar.panels.staticfiles.StaticFilesPanel',
		'debug_toolbar.panels.templates.TemplatesPanel',
		'debug_toolbar.panels.cache.CachePanel',
		'debug_toolbar.panels.signals.SignalsPanel',
		'debug_toolbar.panels.logging.LoggingPanel',
		'debug_toolbar.panels.redirects.RedirectsPanel',
		'debug_toolbar.panels.profiling.ProfilingPanel',
		'template_timings_panel.panels.TemplateTimings.TemplateTimings',
	]
	
	INTERNAL_IPS = ('127.0.0.1', '46.48.62.141', '172.29.0.2', '192.168.32.3')
