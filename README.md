# ICMS-Group-10

COMP3278 Intelligent Course Management System Project

## importing the database

cd to the project directory and run the following commands: 
```
# login the mysql command
mysql -u root –p

# create database.
mysql> CREATE DATABASE icms;
mysql> USE icms;

# import from sql file
mysql> source create.sql

# make sure there are 11 tables
mysql> SHOW tables;
```
