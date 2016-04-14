#iStudent

This is a project for Web-Developers course by Shay Tavor.<br>
Took place in JCE Jerusalem College of Engineering, On 2015 semester a, during studies in Software Engineer department, in the 3rd year.
This project is called "iStudent" - a student management center.<br>

##Authors:
* Alon Shmilovich
* Dor Harel 
* Barak Turgeman

##Please visit our [live application!](http://istudentjce.azurewebsites.net)

##Github repository link
Please read this before you continue, we highly recommend that you'll read this in a different way: This markdown readme file is well read in git-hub repository [here](https://github.com/alonshmilo/istudent). A simple README file is also attached in the repository.

##Files submitted:
In this project you will find the files:
<br>
* index.html - In this file are presented all the hyper text markup codes, all the "simple" elemtes that are shown.
* style.css - This is the css file. Here all the style and the design codes are written. From here, every div and section has it's class where they take their own design.
* iStudent.js - This file contains all the objects we need to do what we want in this app. It also contains the functions we are using. The objects are: course, todo, assignment, exam, and the big one: iStudent. It covers all the rest.
* script.js - Contains all the jquery functions we need for the app. Plus, it contains the "ready" functions.

##Screens
* Schedule - Presents weekly schedule by hours. You can add courses by pressing "add course", and give it a name, Instructor, day and time in the week. After you added a course, you can edit it by pressing it again and change whatever you like.
* Assignment - A list of assignments by courses only. You can add what ever assignment that you want, but the course you want to add it to, must be on your schedule, or else you won't be able to attach it to the right course. After adding the assignment, you can edit it b clicking on the icon, or you can mark it as done. When you mark it as done, the due date will dissapear because it is no longer interesting.
* To-do list - In this list you can add issues for yourself that is not attached to any course, but on general issues you have. Also here you can mark it as done, or add it, as much as in assignment list.
* Exam list - Here you can add an exam to an existing course in you schedule. It will present you a list of exams divided by courses, you can aedit each one of them by clicking the edit icon. Only existing courses can get an exam on the list. <br>
Note! By erasing a course in the schedule screen, all the assignments and the exams will be automaically erased! So be sure before you erase anything.

##Project Structure
* The project is divided to 2 folders: css and js, each one contains the files of each kind.
* The index.html file