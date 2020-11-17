# Generated by Django 2.2 on 2020-09-22 00:39

from django.db import migrations, models


class Migration(migrations.Migration):
	dependencies = [
		('menu', '0001_initial'),
	]
	
	operations = [
		migrations.RenameField(
			model_name='product',
			old_name='isHidden',
			new_name='is_hidden',
		),
		migrations.AddField(
			model_name='menucatalog',
			name='is_hidden_child',
			field=models.BooleanField(default=False, verbose_name='Скрыть'),
		),
		migrations.AddField(
			model_name='menucatalog',
			name='show_footer_left',
			field=models.BooleanField(default=False, verbose_name='Показывать в подвале (левый столбец)'),
		),
		migrations.AddField(
			model_name='menucatalog',
			name='show_footer_rigth',
			field=models.BooleanField(default=False, verbose_name='Показывать в подвале (правый столбец)'),
		),
	]
