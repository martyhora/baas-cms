# BaaS CMS

A single page application written in Typescript and React consists of a backend by which you can define structure of your content and API by which you can fetch the content.

In the backend part you can define the content structure by creating sections and it's parameters. First you need to create parameters. You can choose if the parameter will be a text or enum value. Then you create sections and attach created parameters to it.

When you are done with the content structure, you can define the content data itself. Content is added by choosing a section to which the content belong and filling in the values of the parameters which are attached to the section.

The content data are then available via API on ```/api/v1/public/[CONTENT_SECTION_IDENTIFICATOR]``` for all content rows in the section or ```/api/v1/public/[CONTENT_SECTION_IDENTIFICATOR]?id=[CONTENT_SECTION_ID]``` for a single content row.

# Installation

To run the project you will need Apache, PHP, Composer and NodeJs installed.

- clone project by running ```git clone https://github.com/martyhora/baas-cms``` into your DocumentRoot path
- change folder ```cd api/v1``` and run ```composer install```
- run ```npm i``` or ```yarn install``` in the project root
- run ```webpack --watch``` to compile changes in JS a LESS files
- create database and run SQL scripts in ```/api/v1/sql/db.sql``` to create database structure in it
- create ```/api/v1/app/config/config.local.neon``` and set up the the database connection
- open the project in the browser
