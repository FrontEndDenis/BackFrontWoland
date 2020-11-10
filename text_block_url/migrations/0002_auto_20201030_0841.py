# Generated by Django 2.2 on 2020-10-30 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('text_block_url', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='textblockurl',
            name='h1',
            field=models.CharField(blank=True, default='', max_length=1024, null=True, verbose_name='H1 страницы'),
        ),
        migrations.AddField(
            model_name='textblockurl',
            name='keywords',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Ключевые слова (мета)'),
        ),
        migrations.AddField(
            model_name='textblockurl',
            name='keywords_description',
            field=models.TextField(blank=True, default='', null=True, verbose_name='Описание (мета)'),
        ),
        migrations.AddField(
            model_name='textblockurl',
            name='title_main',
            field=models.CharField(blank=True, default='', max_length=1024, null=True, verbose_name='Заголовок страницы'),
        ),
    ]
