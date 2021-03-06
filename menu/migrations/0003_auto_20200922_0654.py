# Generated by Django 2.2 on 2020-09-22 01:54

from django.db import migrations, models


class Migration(migrations.Migration):
	dependencies = [
		('menu', '0002_auto_20200922_0539'),
	]
	
	operations = [
		migrations.AddField(
			model_name='menucatalog',
			name='name_title',
			field=models.CharField(blank=True, max_length=255, verbose_name='Название (в ед. числе)'),
		),
		migrations.AddField(
			model_name='menucatalog',
			name='text_service',
			field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Текст для карточки услуги'),
		),
		migrations.AlterField(
			model_name='menucatalog',
			name='is_hidden_child',
			field=models.BooleanField(default=False, verbose_name='Скрыть дочерние пункты'),
		),
	]
