from django.contrib import admin

from text_block_url.models import TextBlockUrl


class TextBlockUrlAdmin(admin.ModelAdmin):
    list_display = ('name', 'url')


admin.site.register(TextBlockUrl, TextBlockUrlAdmin)
