# ICMS-Group-10

COMP3278 Intelligent Course Management System Project

## Getting Started
### Clone the project
```
$ git clone https://github.com/Kevindrayana/ICMS-Group-10.git
```
### Install all dependencies for the backend:
```
$ pip3 install -r requirements.txt
```
### Create a Virtual Environment (MacOS)
```
# create venv
$ python3 -m venv icms

# start venv
$ source icms/bin/activate
```
### Create a Virtual Environment (Windows)
```
# Create a new directory for the venv
$ mkdir project_directory
$ cd project_directory
$ python -m virtualenv venv
# the code below is optional if the code preceding it can't be run
$ Set-ExecutionPolicy Unrestricted -Scope Process
# start venv
$ .\venv\Scripts\activate
```
### To Train the FaceRecognition Model:
```
# In the face_capture.py file, specify the uid of the face you want to train:
uid = "YOUR UID HERE"
# Create a 'data' folder in the project directory:
$ mkdir data
# run the programs in sequential order, a .pickle and .yml file will be created as a result.
$ python face_capture.py
$ python train.py
```
### Setting up the backend
```
# create .env file in root, write your sql password and openAPI key as such:
SQL_PASSWORD=****
OPENAI_API_KEY=****
# enable ssl certificate for email
$ bash /Applications/Python*/Install\ Certificates.command

# start flask backend
$ export FLASK_DEBUG=1 && flask run
```

### Setting up the frontend
```
# start next.js frontend
$ cd frontend
$ npm install
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
