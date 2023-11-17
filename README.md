# ICMS-Group-10

COMP3278 Intelligent Course Management System Project

## Getting Started
```
# create venv
$ python3 -m venv icms

# start venv
$ source icms/bin/activate

# install requirements
$ pip3 install -r requirements.txt

# create .env file in root, write your sql password as such:
SQL_PASSWORD=****

# start flask backend
$ flask run
```

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

## draw.io link for ERD
https://app.diagrams.net/#G1gjgNTLW7gVZwNqp7VPQu2kE5qAabhGFR