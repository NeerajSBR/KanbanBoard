# Generated by Django 3.0.3 on 2023-07-27 05:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('list_id', models.AutoField(db_column='List_id', primary_key=True, serialize=False)),
                ('list_name', models.CharField(blank=True, db_column='List_name', max_length=25, null=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'list',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.AutoField(db_column='user_ID', primary_key=True, serialize=False)),
                ('user_name', models.CharField(blank=True, max_length=25, null=True)),
                ('emailid', models.CharField(blank=True, db_column='emailID', max_length=50, null=True)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'users',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Cards',
            fields=[
                ('card_id', models.AutoField(db_column='Card_id', primary_key=True, serialize=False)),
                ('card_name', models.CharField(blank=True, db_column='Card_name', max_length=30, null=True)),
                ('assignee', models.IntegerField(blank=True, null=True)),
                ('priority', models.IntegerField(blank=True, null=True)),
                ('task_desc', models.CharField(blank=True, max_length=255, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('due_date', models.DateField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('story_point', models.IntegerField(blank=True, null=True)),
                ('progress', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='Kanban.List')),
                ('reporter', models.ForeignKey(blank=True, db_column='reporter', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='Kanban.Users')),
            ],
            options={
                'db_table': 'cards',
                'managed': True,
            },
        ),
    ]
