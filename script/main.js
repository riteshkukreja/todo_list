$(function() {
	$(".floating_button").click(function() {
		var topic = DRAW.get();
		if(topic)
			TODO.add(topic);
	});

	$(".modal .close").click(function() {
		DRAW.hideModal();
	});

	$(".new_subtask").click(function()  {
		var topic = DRAW.get();
		if(topic) {
			var id = $(this).parent().data("id");
			TODO.addSub(id ,topic);
		}
	});

	TODO.all();
});