from django.contrib import admin
from checkout.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'date', 'type_order', 'email_to', 'ip_address', 'name', 'phone', 'email', 'text')
    list_filter = ('date',)
    search_fields = ('email', 'name', 'organization', 'id')
    fieldsets = (
        ('Info', {'fields': ('name', 'email', 'phone', 'text', 'ip_address', 'file')}),
    )

admin.site.register(Order, OrderAdmin)
