var DRAW = {};

DRAW.container = ".container";

DRAW.add = function(id, topic, done, date) {

	var task = $("<div />", {
		class: 'task'
	});

	if(done == 2) {
		task.addClass("success");
	}

	task.attr('data-id', id);

	task.click(function() {
		TODO.get(id);
	});

	var details = $("<div />", {
		class: 'details'
	});

	var heading = $("<span />", {
		class: 'heading',
		text: topic
	}).appendTo(details);

	var time = $("<span />", {
		class: 'time',
		text: date
	}).appendTo(details);

	task.append(details);

	DRAW.controls(task, done);

	$(DRAW.container).append(task);
}

DRAW.controls = function(holder, doneFLAG) {
	var control = $("<div/>", {
		class: 'task_control'
	});

	var done = $("<span />", {
		class: 'done'
	}).appendTo(control);

	done.click(function(e) {
		TODO.done($(this).parent().parent().data('id'));
	});

	var del = $("<span />", {
		class: 'delete'
	}).appendTo(control);

	del.click(function(e) {
		TODO.del($(this).parent().parent().data('id'));
	});

	holder.append(control);
}

DRAW.done = function(id) {
	$(".container *[data-id=" + id + "]").addClass("success");
}

DRAW.del = function(id) {
	$(".container *[data-id=" + id + "]").addClass("remove");
}

DRAW.modal = function(id, topic, date, subtasks) {
	$(".modal").attr("data-id", id);
	$(".modal .heading").text(topic);
	$(".modal .date").text(date);
	$(".modal .subtask_holder").html("");

	for(i = 0 ; i < subtasks.length; i++) {
		DRAW.addSub(subtasks[i].SID, subtasks[i].TOPIC, subtasks[i].STATUS);		
	}
}

DRAW.addSub = function(ID, TOPIC, STATUS) {
	var subtask = $("<div />", {
		class: 'subtask'
	});

	if(STATUS == 2)
		subtask.addClass("done");

	subtask.attr("data-id", ID);

	var span = $("<span />", {
		text: TOPIC
	}).appendTo(subtask);

	var del = $("<span />", {
		class: 'delete'
	}).appendTo(subtask);

	del.click(function() {
		var sid = $(this).parent().data("id");
		TODO.delSub(sid);
	});


	var done = $("<span />", {
		class: 'done'
	}).appendTo(subtask);

	done.click(function() {
		var sid = $(this).parent().data("id");
		TODO.doneSub(sid);
	});

	$(".modal .subtask_holder").append(subtask);
}

DRAW.doneSub = function(ID) {
	$(".subtask[data-id=" + ID + "]").addClass("done");
}

DRAW.delSub = function(ID) {
	$(".subtask[data-id=" + ID + "]").addClass("remove");
}

DRAW.showModal = function() {
	$(".modal").show();
}

DRAW.hideModal = function() {
	$(".modal").hide();
}

DRAW.get = function() {
	var z = prompt("Enter Task : ");
	if(z != null) {
		return z;
	}

	return false;
}