from django.db import models
from tinymce import models as tinymce_models


class StaticText(models.Model):
	slug = models.SlugField(max_length=1024, verbose_name="Латинское название [системное]")
	text = tinymce_models.HTMLField(verbose_name="HTML текст", blank=True, null=True, default="")
	comment = models.CharField(max_length=1024, verbose_name="Комментарий", blank=True, null=True, default="")
	
	def __str__(self):
		return self.slug
	
	class Meta:
		ordering = ["id"]
		verbose_name_plural = "Статические тексты"
