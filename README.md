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

# enable ssl certificate for email
$ bash /Applications/Python*/Install\ Certificates.command

# start flask backend
$ export FLASK_DEBUG=1 && flask run

# start next.js frontend
$ cd frontend
$ npm run dev
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
mysql> source make.sql

# make sure there are 11 tables
mysql> SHOW tables;
```

## draw.io link for ERD

https://app.diagrams.net/#G1gjgNTLW7gVZwNqp7VPQu2kE5qAabhGFR

## figma

https://www.figma.com/file/h7ggPtipuZ7AbBsN7AsK4H/COMP3278-(Copy)?type=design&node-id=212%3A1811&mode=dev
