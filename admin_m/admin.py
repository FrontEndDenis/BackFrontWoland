from django.contrib import admin

from .models import ImportData, StateData


class ImportDataAdmin(admin.ModelAdmin):
	list_display = ('name', 'date', 'user', 'email', 'action', 'state', 'result', 'file')
	list_filter = ('state',)
	search_fields = ('email', 'name', 'user', 'id')


admin.site.register(ImportData, ImportDataAdmin)
admin.site.register(StateData)
