from django.contrib import admin
from .models import Marka

class MarkaAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_display = ('name', 'slug',)

admin.site.register(Marka, MarkaAdmin)
