# Generated by Django 5.0.6 on 2024-06-19 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='ref_no',
            field=models.CharField(max_length=32),
        ),
    ]
