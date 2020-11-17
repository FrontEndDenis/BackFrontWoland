from django.contrib import admin

from .models import ProjectSettings, SocialLink


class SocialLinkInline(admin.TabularInline):
	model = SocialLink


class ProjectSettingsAdmin(admin.ModelAdmin):
	inlines = [
		SocialLinkInline,
	]


admin.site.register(ProjectSettings, ProjectSettingsAdmin)
