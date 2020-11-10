from django.db import models
from django.utils.text import slugify
from tinymce import models as tinymce_models
from transliterate import translit


class Marka(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название")
    slug = models.SlugField(max_length=255, verbose_name="Название латинское", blank=True)
    description = tinymce_models.HTMLField(verbose_name="Описание", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Марка"
        ordering = ["name"]

    def set_slug(self):
        self.slug = slugify(translit(self.name.replace('.', '-').replace(',', '-'), "ru", reversed=True))
