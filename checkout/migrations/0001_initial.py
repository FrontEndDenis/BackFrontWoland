# Generated by Django 2.2 on 2020-10-01 02:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
	initial = True
	
	dependencies = [
		('menu', '0013_auto_20200929_2250'),
	]
	
	operations = [
		migrations.CreateModel(
			name='Order',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('name', models.CharField(max_length=50, verbose_name='Ф.И.О')),
				('email', models.EmailField(max_length=50, verbose_name='E-mail')),
				('phone', models.CharField(max_length=20, verbose_name='Телефон')),
				('date', models.DateTimeField(auto_now_add=True)),
				('ip_address', models.GenericIPAddressField()),
				('last_updated', models.DateTimeField(auto_now=True)),
				('text', models.TextField(blank=True, null=True, verbose_name='Текст')),
				('file', models.FileField(blank=True, null=True, upload_to='uploads/files', verbose_name='Файл')),
				('email_to',
				 models.EmailField(blank=True, default='', max_length=50, null=True, verbose_name='Отправлен')),
			],
			options={
				'verbose_name_plural': 'Заказы',
				'ordering': ['-date'],
			},
		),
		migrations.CreateModel(
			name='OrderItem',
			fields=[
				('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
				('quantity', models.DecimalField(decimal_places=2, default=1, max_digits=9)),
				('price', models.DecimalField(decimal_places=2, max_digits=9)),
				('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='checkout.Order')),
				('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Product')),
			],
		),
	]
