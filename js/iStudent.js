/*
Alon Shmilovich 034616359
Dor Harel 300300563
Barak Turgeman 305631293
This file contains all the objects we need to do what we want in this app. It also contains the functions we are using. The objects are: course, todo, assignment, exam, and the big one: iStudent. It covers all the rest
*/

function toDo(name,description,date,done) { //Todo object
    this.name = name;
    this.description = description;
    this.date = date;
	this.done = typeof done !== 'undefined' ? done : 0;
    
	if (typeof toDo.prototype.edit != "function")
        {
            toDo.prototype.toString = function() {
                var res = "To-Do name: " + this.name + ", description: " + this.description + ", Date: " + this.date + ", done: " + this.done;
                return res;
            };
            
            toDo.prototype.edit = function(name,description,date,done) {
				this.name = name;
				this.description = description;
				this.date = date;
				if (typeof done !== 'undefined')
					this.done = done;
            };
            toDo.prototype.toggleDone = function() {
				this.done = this.done == 0? 1 : 0;
            };
        }

}
function exam(name,description,date,hour) { //exam object
    this.name = name;
    this.description = description;
    this.date = date;
    this.hour = hour;
    
	if (typeof exam.prototype.edit != "function")
        {
            exam.prototype.toString = function() {
                var res = "Exam name: " + this.name + ", description: " + this.description + ", Date: " + this.date + ", hour: " + this.hour;
                return res;
            };
            
            exam.prototype.edit = function(name,description,date,hour) {
				this.name = name;
				this.description = description;
				this.date = date;
				this.hour = hour;
            };
        }

}
function assigmment(name,description,date,done) { //assignment object
    this.name = name;
    this.description = description;
    this.date = date;
	this.done = typeof done !== 'undefined' ? done : 0;
    
	if (typeof assigmment.prototype.edit != "function")
        {
            assigmment.prototype.toString = function() {
                var res = "Assigment name: " + this.name + ", description: " + this.description + ", Date: " + this.date + ", done: " + this.done;
                return res;
            };
            
            assigmment.prototype.edit = function(name,description,date,done) {
				this.name = name;
				this.description = description;
				this.date = date;
				if (typeof done !== 'undefined')
					this.done = done;
            };
            assigmment.prototype.toggleDone = function() {
				this.done = this.done == 0? 1 : 0;
            };
        }

}
function course(name, day, hour, instructor) { //course object
    this.assigmments = [];
    this.exams = [];
	this.name = name;
    this.day = day;
    this.hour = hour;
    this.instructor = instructor;
    
    
	if (typeof course.prototype.edit != "function")
        {
            course.prototype.toString = function() {
                var res = "Course name: " + this.name + ", day: " + this.day + ", hour: " + this.hour + ", instructor: " + instructor;
                return res;
            };
            
            course.prototype.edit = function(name, day, hour, instructor) {
				this.name = name;
				this.day = day;
				this.hour = hour;
				this.instructor = instructor;
            };
		}

}

//iStudent Object
function iStudent(){
    this.courses = []; //list of all courses
	this.toDoList = []; //list of all to-do's
    if (localStorage.getItem("iStudent_courses") !== null) {
		var tempCourses = JSON.parse(localStorage.getItem("iStudent_courses"));
		for (var i=0; i< tempCourses.length; i++) {
			var tempCourse = new course(tempCourses[i]['name'], tempCourses[i]['day'], tempCourses[i]['hour'], tempCourses[i]['instructor']);
			
			if (tempCourses[i]['assigmments'].length > 0) {
				for (var j=0; j< tempCourses[i]['assigmments'].length; j++) {
					var tempAssigmment = new assigmment(tempCourses[i]['assigmments'][j].name,tempCourses[i]['assigmments'][j].description,tempCourses[i]['assigmments'][j].date,tempCourses[i]['assigmments'][j].done);
					tempCourse.assigmments.push(tempAssigmment);
				}
			}
			if (tempCourses[i]['exams'].length > 0) {
				for (var j=0; j< tempCourses[i]['exams'].length; j++) {
					var tempExam = new exam(tempCourses[i]['exams'][j].name,tempCourses[i]['exams'][j].description,tempCourses[i]['exams'][j].date,tempCourses[i]['exams'][j].hour);
					tempCourse.exams.push(tempExam);
				}
			}
			this.courses.push(tempCourse);
		}
	}
    if (localStorage.getItem("iStudent_toDoList") !== null) {
		var tempToDoList = JSON.parse(localStorage.getItem("iStudent_toDoList"));
		for (var i=0; i< tempToDoList.length; i++) {
			var tempToDo = new toDo(tempToDoList[i].name,tempToDoList[i].description,tempToDoList[i].date,tempToDoList[i].done);
			this.toDoList.push(tempToDo);
		}
	}
	
    
	if (typeof iStudent.prototype.save != "function") {
        iStudent.prototype.toString = function() {
            var res = "";
			this.courses.forEach(function(element, index) {
				res += 'Course ' + index + ': ' + element.toString() + '\n';
			});
            return res;
        };    
            
        iStudent.prototype.save = function() {
			localStorage.setItem('iStudent_courses', JSON.stringify(this.courses));
			localStorage.setItem('iStudent_toDoList', JSON.stringify(this.toDoList));
        };

        iStudent.prototype.getCourse = function(course_id) {
			return this.courses[course_id];
		};
		
		iStudent.prototype.addCourse = function(name, day, hour, instructor) {
            var tempCourse = new course(name, day, hour, instructor);
			this.courses.push(tempCourse);
			this.save();
        };
		
		iStudent.prototype.editCourse = function(course_id, name, day, hour, instructor) {
            this.courses[course_id].edit(name, day, hour, instructor);
			this.save();
        };
		
		iStudent.prototype.deleteCourse = function(course_id) {
            this.courses.splice(course_id, 1);
			this.save();
        };
		
		
        iStudent.prototype.getExam = function(course_id,exam_id) {
			return this.courses[course_id].exams[exam_id];
		};
		
		iStudent.prototype.addExam = function(course_id,name,description,date,hour) {
			var tempExam = new exam(name,description,date,hour);
			this.courses[course_id].exams.push(tempExam);
			this.save();
        };
		
		iStudent.prototype.editExam = function(course_id,exam_id, name,description,date,hour) {
			this.courses[course_id].exams[exam_id].edit(name,description,date,hour);
			this.save();
        };
		
		iStudent.prototype.deleteExam = function(course_id,exam_id) {
            this.courses[course_id].exams.splice(exam_id, 1);
			this.save();
        };
		
		
        iStudent.prototype.getAssigmment = function(course_id,assigmment_id) {
			return this.courses[course_id].assigmments[assigmment_id];
		};
		
		iStudent.prototype.addAssigmment = function(course_id,name,description,date) {
			var tempAssigment = new assigmment(name,description,date);
			this.courses[course_id].assigmments.push(tempAssigment);
			this.save();
        };
		
		iStudent.prototype.editAssigmment = function(course_id,assigmment_id, name,description,date) {
			this.courses[course_id].assigmments[assigmment_id].edit(name,description,date);
			this.save();
        };
		
		iStudent.prototype.toggleDoneAssigmment = function(course_id,assigmment_id) {
            this.courses[course_id].assigmments[assigmment_id].toggleDone();
			this.save();
        };
		
		iStudent.prototype.deleteAssigmment = function(course_id,assigmment_id) {
            this.courses[course_id].assigmments.splice(assigmment_id, 1);
			this.save();
        };
		
		
        iStudent.prototype.getToDo = function(toDo_id) {
			return this.toDoList[toDo_id];
		};
		
		iStudent.prototype.addToDo = function(name,description,date) {
            var tempToDo = new toDo(name,description,date);
			this.toDoList.push(tempToDo);
			this.save();
        };
		
		iStudent.prototype.toggleDoneToDo = function(toDo_id) {
            this.toDoList[toDo_id].toggleDone();
			this.save();
        };
		
		iStudent.prototype.editToDo = function(toDo_id, name,description,date) {
            this.toDoList[toDo_id].edit(name,description,date);
			return;
			this.save();
        };
		
		iStudent.prototype.deleteToDo = function(toDo_id) {
            this.toDoList.splice(toDo_id, 1);
			this.save();
        };
	}
}
var iStudent = new iStudent();
// iStudent.printSchedule();
