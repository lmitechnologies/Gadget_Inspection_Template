# Generated by Django 4.0.2 on 2022-06-06 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inspection', '0002_rename_mark_cojoin_userautomationconfig_mark_defect_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='configui',
            name='plot_0',
            field=models.IntegerField(choices=[(0, 'none'), (1, 'line'), (2, 'bar'), (3, 'hist')], default=0),
        ),
        migrations.AlterField(
            model_name='configui',
            name='plot_1',
            field=models.IntegerField(choices=[(0, 'none'), (1, 'line'), (2, 'bar'), (3, 'hist')], default=0),
        ),
        migrations.AlterField(
            model_name='configui',
            name='plot_2',
            field=models.IntegerField(choices=[(0, 'none'), (1, 'line'), (2, 'bar'), (3, 'hist')], default=0),
        ),
    ]
