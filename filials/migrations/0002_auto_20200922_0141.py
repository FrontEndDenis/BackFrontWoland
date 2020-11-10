# Generated by Django 2.2 on 2020-09-21 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filials', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='filials',
            name='bin_req',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='БИН (КЗ)'),
        ),
        migrations.AddField(
            model_name='filials',
            name='ikk_1_req',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='ИКК 1 (КЗ)'),
        ),
        migrations.AddField(
            model_name='filials',
            name='ikk_2_req',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='ИКК 2 (КЗ)'),
        ),
        migrations.AlterField(
            model_name='filials',
            name='geo',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='Код карты'),
        ),
        migrations.AlterField(
            model_name='filials',
            name='name_info',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Название (падеж для подстановки)'),
        ),
    ]
