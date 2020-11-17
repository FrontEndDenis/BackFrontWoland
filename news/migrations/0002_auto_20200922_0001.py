# Generated by Django 2.2 on 2020-09-21 19:01

from django.db import migrations, models


class Migration(migrations.Migration):
	dependencies = [
		('news', '0001_initial'),
	]
	
	operations = [
		migrations.AlterField(
			model_name='news',
			name='name',
			field=models.CharField(max_length=512, verbose_name='Название'),
		),
		migrations.AlterField(
			model_name='news',
			name='slug',
			field=models.SlugField(blank=True, max_length=512, null=True, verbose_name='Название латинское'),
		),
	]
