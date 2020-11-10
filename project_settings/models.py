import os
from django.db import models
from django.db.models.signals import post_delete, pre_save
from tinymce import models as tinymce_models


class ProjectSettings(models.Model):
    name = models.CharField(max_length=256, verbose_name="Название компании")
    site_name = models.CharField(max_length=256, verbose_name="Название сайта")
    logo = models.ImageField(upload_to='uploads/images', verbose_name="Логотип", blank=True, null=True)
    title_text_index = models.CharField(max_length=256, verbose_name="Заголовок текста на главной странице", blank=True, null=True)
    text_index = tinymce_models.HTMLField(verbose_name="Текст на главной странице", blank=True, null=True)
    text_category = tinymce_models.HTMLField(verbose_name="Текст (статический) в категории", blank=True, null=True) 
    
    type_company = models.CharField(max_length=256, verbose_name="Тип компании", blank=True, null=True)
    count_staff = models.CharField(max_length=256, verbose_name="Количество сотрудников", blank=True, null=True)
    start_year = models.CharField(max_length=50, verbose_name="Год основания", blank=True, null=True)

    text_head = models.TextField(verbose_name="Блок в head (внизу)", blank=True, null=True)
    text_body = models.TextField(verbose_name="Блок в body (внизу)", blank=True, null=True)

    tech_mail_server = models.CharField(max_length=256, verbose_name="Почтовый сервер (для отправки сообщений)")
    tech_email = models.CharField(max_length=256, verbose_name="Почта для отправки сообщений")
    tech_email_pass = models.CharField(max_length=256, verbose_name="Пароль почты для отправки сообщений")


    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]
        verbose_name_plural = "Настройки проекта"


class SocialLink(models.Model):
    name = models.CharField(max_length=1024, verbose_name="Название")
    image = models.ImageField(upload_to='uploads/images', verbose_name="Картинка", blank=True, null=True)
    project_settings = models.ForeignKey(ProjectSettings, on_delete=models.CASCADE)


def delete_filefield(**kwargs):
    item = kwargs.get('instance')
    if item.image:
        if os.path.exists(item.image.path):
            os.remove(item.image.path)


def save_filefield(**kwargs):
    item = kwargs.get('instance')
    if item.id:
        obj = SocialLink.objects.get(id=item.id)
        if obj.image:
            if (not item.image) or obj.image.path != item.image.path:
                if os.path.exists(obj.image.path):
                    os.remove(obj.image.path)


post_delete.connect(delete_filefield, SocialLink)
pre_save.connect(save_filefield, SocialLink)
