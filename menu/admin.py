from django.contrib import admin

from .models import MenuCatalog, Product, TypeMenu, Slider

class MenuCatalogAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'slug', 'order_number', 'parent', 'type_menu', 'created_at', 'updated_at', 'is_hidden')
    search_fields = ('name',)


class ProductCatalogAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('id', 'name')
    search_fields = ('name', 'slug', 'id')
    list_filter = ('catalog',)

admin.site.register(MenuCatalog, MenuCatalogAdmin)
admin.site.register(Product, ProductCatalogAdmin)
admin.site.register(TypeMenu)
admin.site.register(Slider)
