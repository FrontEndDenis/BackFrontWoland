# Generated by Django 2.2 on 2020-09-28 00:23

from django.db import migrations


class Migration(migrations.Migration):
	dependencies = [
		('menu', '0008_auto_20200928_0511'),
	]
	
	operations = [
		migrations.RenameField(
			model_name='product',
			old_name='is_usluga',
			new_name='is_service',
		),
	]
