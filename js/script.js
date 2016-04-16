/*
Alon Shmilovich 034616359
Dor Harel 300300563
Barak Turgeman 305631293
Contains all the jquery functions we need for the app. Plus, it contains the "ready" functions
*/

//This file is a jquesry functions file, and the "main" function - ready.
function editCourse(indexNum) {//to edit a course
	$('#courseEdit').data('index',indexNum);
	var tempCourse = iStudent.getCourse(indexNum);
	$('#courseEdit .modal-title').text('Course: ' + tempCourse.name);
	$('#editCourseName').val(tempCourse.name);
	$('#editCourseDay').val(tempCourse.day);
	$('#editCourseHour').val(tempCourse.hour);
	$('#editCourseInstructor').val(tempCourse.instructor);
	$('#courseEdit').modal();
}
function editExam(course_id,exam_id) { //to edit an exam
	$('#examEdit').data('course_id',course_id);
	$('#examEdit').data('exam_id',exam_id);
	var tempExam = iStudent.getExam(course_id,exam_id);
	$('#examEdit .modal-title').text('Exam: ' + tempExam.name);
	$('#editExamName').val(tempExam.name);
	$('#editExamDescription').val(tempExam.description);
	$('#editExamDate').val(tempExam.date);
	$('#editExamHour').val(tempExam.hour);
	$('#examEdit').modal();
	return false;
}
function editAssigmment(course_id,assigmment_id) { //to edit an assignment
	$('#assigmmentEdit').data('course_id',course_id);
	$('#assigmmentEdit').data('assigmment_id',assigmment_id);
	var tempAssigmment = iStudent.getAssigmment(course_id,assigmment_id);
	$('#assigmmentEdit .modal-title').text('Course: ' + tempAssigmment.name);
	$('#editAssigmmentName').val(tempAssigmment.name);
	$('#editAssigmmentDescription').val(tempAssigmment.description);
	$('#editAssigmmentDate').val(tempAssigmment.date);
	$('#assigmmentEdit').modal();
	return false;
}
function toggleDoneAssigmment(course_id,assigmment_id) {
	iStudent.toggleDoneAssigmment(course_id,assigmment_id);
	printiStudent(iStudent)
	return false;
}
function editToDo(toDo_id) {
	$('#toDoEdit').data('toDo_id',toDo_id);
	var tempToDo = iStudent.getToDo(toDo_id);
	$('#toDoEdit .modal-title').text('To-Do: ' + tempToDo.name);
	$('#editToDoName').val(tempToDo.name);
	$('#editToDoDescription').val(tempToDo.description);
	$('#editToDoDate').val(tempToDo.date);
	$('#toDoEdit').modal();
	return false;
}
function toggleDoneToDo(toDo_id) {
	iStudent.toggleDoneToDo(toDo_id);
	printiStudent(iStudent)
	return false;
}
function printiStudent(iStudent) { //This function is printing the whole board on the screen
	$("#exams .inner").html('');
	$("#assignments .inner").html('');
	$("#todolist .inner").html('');
	$("#schedule tbody tr td").html('');
	var coursesOption = '';
	iStudent.courses.forEach(function(element, index) { //prints all the courses
		$("#schedule tbody tr:nth-child(" + (parseInt(element.hour) - 7) + ") td:nth-child(" + (parseInt(element.day) + 1)  + ")").append( '<div class="course" onclick="editCourse(' + index + ');">' + element.name + '</div>' );
		coursesOption += '<option value="' + index + '">' + element.name + '</option>';
		if (element.assigmments.length > 0) {
			var temp_todo_list = '';
			element.assigmments.forEach(function(element2, index2) {
				if (element2.done == 1)
					temp_todo_list += '<li><a href="#" onclick="return toggleDoneAssigmment(' + index + ',' + index2 + ');"><i class="fa fa-check-square"></i></a> <a href="#" onclick="return editAssigmment(' + index + ',' + index2 + ');"><i class="fa fa-pencil-square-o"></i></a> ' + element2.name + '</li>';
				else temp_todo_list += '<li><a href="#" onclick="return toggleDoneAssigmment(' + index + ',' + index2 + ');"><i class="fa fa-square-o"></i></a> <a href="#" onclick="return editAssigmment(' + index + ',' + index2 + ');"><i class="fa fa-pencil-square-o"></i></a> ' + element2.name + ' to submit at: '+ element2.date + '</li>';
			});
			$("#assignments .inner").append('<h2>' + element.name + ':</h2><ul class="todo-list">' + temp_todo_list + '</ul>');
		}
		if (element.exams.length > 0) {//If there are any exams...
			var temp_exam_list = '';
			element.exams.forEach(function(element2, index2) { //prints all the exams
				if (element2.done == 1)
					temp_exam_list += '<li><a href="#" onclick="return editExam(' + index + ',' + index2 + ');"><i class="fa fa-pencil-square-o"></i></a> ' + element2.name + '</li>';
				else temp_exam_list += '<li><a href="#" onclick="return editExam(' + index + ',' + index2 + ');"><i class="fa fa-pencil-square-o"></i></a> ' + element2.name + ' at: ' + element2.date + ' in: ' + element2.hour+ '</li>';
			});
			$("#exams .inner").append('<h2>' + element.name + ':</h2><ul class="todo-list">' + temp_exam_list + '</ul>');
		}
	});
	$('select.courses').html(coursesOption);
	
	if (iStudent.toDoList.length > 0) {//If there are any to-do's
		var temp_todo_list = '';
		iStudent.toDoList.forEach(function(element, index) { //print all the to-do's
			if (element.done == 1)
				temp_todo_list += '<li><a href="#" onclick="return toggleDoneToDo(' + index + ');"><i class="fa fa-check-square"></i></a> <a href="#" onclick="return editToDo(' + index + ');"><i class="fa fa-pencil-square-o"></i></a> ' + element.name + '</li>';
			else temp_todo_list += '<li><a href="#" onclick="return toggleDoneToDo(' + index + ');"><i class="fa fa-square-o"></i></a> <a href="#" onclick="return editToDo(' + index + ');"><i class="fa fa-pencil-square-o"></i></a> ' + element.name + ' to complete untill: ' + element.date + '</li>';
		});
		$("#todolist .inner").append('<ul class="todo-list">' + temp_todo_list + '</ul>');
	}
}

jQuery(document).ready(function ($) { //ready!
	
	printiStudent(iStudent); //print it!!
	
	$('nav a').click(function() {
		if (!$(this).hasClass('active')) {
			if ($($(this).attr('href')).length) {
				$('nav a').removeClass('active');
				$(this).addClass('active');
				$('main > div').hide();
				$($(this).attr('href')).show();
			}
		}
		return false;
	});
	$('#addCourse').submit(function() { //submit for add course
		iStudent.addCourse($('#addCourseName').val(), $('#addCourseDay').val(), $('#addCourseHour').val(), $('#addCourseInstructor').val());
		printiStudent(iStudent);
		$('#courseAdd').modal('hide');
		document.getElementById("addCourse").reset();
		return false;
	});
	$('#courseEdit .deleteCourse').click(function() { //delete course
		iStudent.deleteCourse($(this).closest('#courseEdit').data('index'));
		$('#courseEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	$('#editCourse').submit(function() { //submit for edit course
		var indexNum = $(this).closest('#courseEdit').data('index');
		iStudent.editCourse(indexNum, $('#editCourseName').val(), $('#editCourseDay').val(), $('#editCourseHour').val(), $('#editCourseInstructor').val());
		$('#courseEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
	$('#addExam').submit(function() {//submit for add exam
		iStudent.addExam($('#addExamCourse').val(), $('#addExamName').val(), $('#addExamDescription').val(), $('#addExamDate').val(), $('#addExamHour').val());
		printiStudent(iStudent);
		$('#examAdd').modal('hide');
		document.getElementById("addExam").reset();
		return false;
	});
	
	$('#examEdit .deleteExam').click(function() { //submit for delete exam
		iStudent.deleteExam($(this).closest('#examEdit').data('course_id'), $(this).closest('#examEdit').data('exam_id'));
		$('#examEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
	$('#editExam').submit(function() { //submit for edit exam
		var course_id = $(this).closest('#examEdit').data('course_id');
		var exam_id = $(this).closest('#examEdit').data('exam_id');
		iStudent.editExam(course_id,exam_id, $('#editExamName').val(), $('#editExamDescription').val(), $('#editExamDate').val(), $('#editExamHour').val());
		$('#examEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
	$('#addAssigmment').submit(function() {//submit for add assignment
		iStudent.addAssigmment($('#addAssigmmentCourse').val(), $('#addAssigmmentName').val(), $('#addAssigmmentDescription').val(), $('#addAssigmmentDate').val());
		printiStudent(iStudent);
		$('#assigmmentAdd').modal('hide');
		document.getElementById("addAssigmment").reset();
		return false;
	});
	
	$('#assigmmentEdit .deleteAssigmment').click(function() {//submit for delete assignment
		iStudent.deleteAssigmment($(this).closest('#assigmmentEdit').data('course_id'), $(this).closest('#assigmmentEdit').data('assigmment_id'));
		$('#assigmmentEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
	$('#editAssigmment').submit(function() { //submit for edit assignment
		var course_id = $(this).closest('#assigmmentEdit').data('course_id');
		var assigmment_id = $(this).closest('#assigmmentEdit').data('assigmment_id');
		iStudent.editAssigmment(course_id,assigmment_id, $('#editAssigmmentName').val(), $('#editAssigmmentDescription').val(), $('#editAssigmmentDate').val());
		$('#assigmmentEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
	$('#addToDo').submit(function() { //submit for add todo
		iStudent.addToDo($('#addToDoName').val(), $('#addToDoDescription').val(), $('#addToDoDate').val());
		printiStudent(iStudent);
		$('#toDoAdd').modal('hide');
		document.getElementById("addToDo").reset();
		return false;
	});
	
	$('#toDoEdit .deleteToDo').click(function() { //submit for delete todo
		iStudent.deleteToDo($(this).closest('#toDoEdit').data('toDo_id'));
		$('#toDoEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
	$('#editToDo').submit(function() { //submit for edit to do
		var toDo_id = $(this).closest('#toDoEdit').data('toDo_id');
		iStudent.editToDo(toDo_id, $('#editToDoName').val(), $('#editToDoDescription').val(), $('#editToDoDate').val());
		$('#toDoEdit').modal('hide');
		printiStudent(iStudent);
		return false;
	});
	
});