# Generated by Django 2.2 on 2020-10-30 03:54

from django.db import migrations, models


class Migration(migrations.Migration):
	dependencies = [
		('filials', '0003_auto_20200922_0630'),
	]
	
	operations = [
		migrations.AlterModelOptions(
			name='filials',
			options={'ordering': ['name'], 'verbose_name_plural': 'Филиалы (Города)'},
		),
		migrations.AddField(
			model_name='filials',
			name='is_base',
			field=models.BooleanField(blank=True, default=False,
									  verbose_name='Основные филиалы, отображаются сверху при выборе города'),
		),
		migrations.AlterField(
			model_name='filials',
			name='isHidden',
			field=models.BooleanField(blank=True, default=False, verbose_name='Скрыть'),
		),
	]
