# Generated by Django 2.2 on 2020-09-13 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StateData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Статус')),
            ],
            options={
                'verbose_name_plural': 'Статус (справочник)',
            },
        ),
        migrations.CreateModel(
            name='ImportData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Наименование')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.CharField(max_length=256, verbose_name='Пользователь')),
                ('email', models.EmailField(blank=True, default='', editable=False, max_length=50, null=True, verbose_name='E-mail')),
                ('action', models.CharField(blank=True, default='', max_length=1024, null=True, verbose_name='Операция')),
                ('result', models.CharField(blank=True, default='', max_length=1024, null=True, verbose_name='Результат')),
                ('result_percent', models.DecimalField(blank=True, decimal_places=2, default='0', max_digits=5, null=True, verbose_name='Процент выполнения')),
                ('info', models.TextField(blank=True, default='', null=True, verbose_name='Информация')),
                ('file', models.FileField(blank=True, default='', null=True, upload_to='import/files', verbose_name='Файл')),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin_m.StateData', verbose_name='Состояние')),
            ],
            options={
                'verbose_name_plural': 'Результаты импорта',
                'ordering': ['-date'],
            },
        ),
    ]
