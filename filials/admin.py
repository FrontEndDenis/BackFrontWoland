from django.contrib import admin

from filials.models import Filials


class FilialsAdmin(admin.ModelAdmin):
	search_fields = ('name',)


admin.site.register(Filials, FilialsAdmin)
