# Generated by Django 2.2 on 2020-09-21 19:15

import django.db.models.deletion
import tinymce.models
from django.db import migrations, models


class Migration(migrations.Migration):
	initial = True

	dependencies = [
	]

	operations = [
		migrations.CreateModel(
			name='ProjectSettings',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('name', models.CharField(max_length=256, verbose_name='Название компании')),
				('site_name', models.CharField(max_length=256, verbose_name='Название сайта')),
				('logo', models.ImageField(blank=True, null=True, upload_to='uploads/images', verbose_name='Логотип')),
				('text_index', tinymce.models.HTMLField(verbose_name='Текст на главной странице')),
				('text_category', tinymce.models.HTMLField(verbose_name='Текст (статический) в категории')),
				('tech_mail_server',
				 models.CharField(max_length=256, verbose_name='Почтовый сервер (для отправки сообщений)')),
				('tech_email', models.CharField(max_length=256, verbose_name='Почта для отправки сообщений')),
				('tech_email_pass',
				 models.CharField(max_length=256, verbose_name='Пароль почты для отправки сообщений')),
			],
			options={
				'verbose_name_plural': 'Настройки проекта',
				'ordering': ['id'],
			},
		),
		migrations.CreateModel(
			name='SocialLink',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('name', models.CharField(max_length=1024, verbose_name='Название')),
				(
				'image', models.ImageField(blank=True, null=True, upload_to='uploads/images', verbose_name='Картинка')),
				('project_settings',
				 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project_settings.ProjectSettings')),
			],
		),
	]
