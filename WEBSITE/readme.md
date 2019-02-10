# YelpCamp
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

#Each Campgrounds has:
* Name
* Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Intro to Databases
* What is a database?
    * A collection of information/data
    * Has an interface
* SQL(relational) vs. NoSQL(non-relational)
* SQL 非常有格式 NoSQL所有东西nested一起，一个对应{}

#Intro to MongoDB
* What is MongoDB
* Why are we using it?
* Install!

#Mongo Commands
* mongod
* mongod
* help
* show dbs(show collections)
* use (切换app对应的数据库,数据库里有很多collections)
* insert
* find
* update
* remove

#Mongoose
* What is Mongoose
* Why are we using it
* Interact with a Mongo Database using Mongoose

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template 

RESTFUL Routes
name     url         verb   desc.
==============================================
INDEX   /dogs        GET   Display a list of all dogs
NEW     /dogs/new    GET   Display form to make a new dogs
CREATE  /dogs        POST  Add new dog to DB
SHOW    /dogs/:id    GET   Shows info about one dog

#Intro to REST
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show example of RESTful routing in paractice

REST - mapping between HTTP routes and CRUD

BLOG

CREATE      
READ        /allBlogs
UPDATE      /updateBlog/:id
DESTORY     /destroyBlog/:id

#Basic Layout
* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav

#SHOWtime
* Add Show route
* Add Show template
* Add links to show page
* Style show template

#Edit/Update
* Add Edit Routes
* Add Edit Form
* Add Update Routes
* Add Update Form
* Add Method-Override

#Delete 
* Add Destroy Routes
* Add Edit and Destroy Links

#Intro to Associations
* Define associations: Data is related
* Discuss one:one, one:many, and many:many relationships
* 学生 课程 关系 

#Embedding Data
User 一对多关系
Post

#Referencing Data

#Module.Exports
* Intro module.exports
* move models into seperate files(oop)

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts!


#Add the Comment model!
* Make errors go
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

NEW     campgrounds/:id/comments/new    GET       
CREATE  campgrounds/:id/comments        POST

#Add Style Show Page
* Add sidebar to show page
* Display comments nicely

##Intro to Auth
* What tools are we using?
    * Passport
    * Passport Local
    * Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
    * Express-Session   

#Auth Code Along Part 1
* Set up folder structure
* Install needed packages
* Add root route and template
* Add secret route and template

#Auth CodeAlong Part 2
* Create User model
* Configure passport

#Auth CodeAlong Part 3
* Add Register routes
* Add Register form

#Auth CodeAlong Part 4
* Add Login routes
* Add Login form

#Auth CodeAlong Part 5
* Add Logout Route
* Add isLoggedIn middleware

##Auth Pt.1 - Add User Model
* Install all packages needed
* Define User model

##Auth Pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt.3 - Login
* Add login routes
* Add login template

##Auth Pt.4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

##Auth Pt.5 - Show/Hide links
* Show/hide auth links in navbar correctly

##Refactor The Routes
* Use Express router to reoragnize all routes

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

#Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground