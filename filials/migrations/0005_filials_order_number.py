# Generated by Django 2.2 on 2020-10-30 04:11

from django.db import migrations, models


class Migration(migrations.Migration):
	dependencies = [
		('filials', '0004_auto_20201030_0854'),
	]
	
	operations = [
		migrations.AddField(
			model_name='filials',
			name='order_number',
			field=models.FloatField(blank=True, null=True, verbose_name='Порядковый номер'),
		),
	]
