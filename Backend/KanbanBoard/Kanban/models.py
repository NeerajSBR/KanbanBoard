# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Cards(models.Model):
    card_id = models.AutoField(db_column='Card_id', primary_key=True)  # Field name made lowercase.
    card_name = models.CharField(db_column='Card_name', max_length=30, blank=True, null=True)  # Field name made lowercase.
    assignee = models.IntegerField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    task_desc = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True, auto_now_add=True, auto_now=False)
    story_point = models.IntegerField(blank=True, null=True)
    progress = models.ForeignKey('List', models.DO_NOTHING, blank=True, null=True)
    reporter = models.ForeignKey('Users', models.DO_NOTHING, db_column='reporter', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'cards'


# class Committ(models.Model):
#     committ_id = models.AutoField(primary_key=True)
#     committ_msg = models.CharField(max_length=50, blank=True, null=True)
#     updated_at = models.DateTimeField(blank=True, null=True, auto_now_add=True, auto_now=False)
#     card = models.ForeignKey(Cards, models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = True
#         db_table = 'committ'


# class DjangoMigrations(models.Model):
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()

#     class Meta:
#         managed = True
#         db_table = 'django_migrations'


class List(models.Model):
    list_id = models.AutoField(db_column='List_id', primary_key=True)  # Field name made lowercase.
    list_name = models.CharField(db_column='List_name', max_length=25, blank=True, null=True)  # Field name made lowercase.
    updated_at = models.DateTimeField(blank=True, null=True, auto_now_add=True, auto_now=False)


    class Meta:
        managed = True
        db_table = 'list'


class Users(models.Model):
    user_id = models.AutoField(db_column='user_ID', primary_key=True)  # Field name made lowercase.
    user_name = models.CharField(max_length=25, blank=True, null=True)
    emailid = models.CharField(db_column='emailID', max_length=50, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'users'
