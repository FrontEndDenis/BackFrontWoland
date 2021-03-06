from django.contrib import admin

from .models import News


class NewsAdmin(admin.ModelAdmin):
	prepopulated_fields = {'slug': ('name',)}


admin.site.register(News, NewsAdmin)
