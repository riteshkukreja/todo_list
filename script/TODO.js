var TODO = {};

TODO.ajax = function(url, data, response) {
	$.ajax({
		url: url,
		data: data,
		dataType: 'json',
		type: 'post',

		success: response,
		failed: function() {
			console.log("Failure @" + url);
		}
	});
}

TODO.add = function(topic) {
	// add to DB
	TODO.ajax('source/modify.php', {method: 'ADD', TOPIC:topic}, function(response) {
		if(response.success) {

			var currentdate = new Date(); 
			var datetime = 	currentdate.getFullYear() + "-"  
			                + (currentdate.getMonth()+1)  + "-" 
			                + currentdate.getDate() + " "
			                + currentdate.getHours() + ":"  
			                + currentdate.getMinutes() + ":" 
			                + currentdate.getSeconds();

			DRAW.add(response.success, topic, 1, datetime);
		} else {
			console.log(response);
		}
	});
}

TODO.done = function(id) {
	// add to DB
	TODO.ajax('source/modify.php', {method: 'DONE', ID:id}, function(response) {
		if(response.success) {
			DRAW.done(id);
		} else {
			console.log(response);
		}
	});
}

TODO.del = function(id) {
	// add to DB
	TODO.ajax('source/modify.php', {method: 'DEL', ID:id}, function(response) {
		if(response.success) {
			DRAW.del(id);
		} else {
			console.log(response);
		}
	});
}

TODO.addSub = function(id, topic) {
	// add to DB
	TODO.ajax('source/modify.php', {method: 'ADDSUB', ID: id, TOPIC:topic}, function(response) {
		if(response.success) {
			DRAW.addSub(response.success, topic, 1);
		} else {
			console.log(response);
		}
	});
}

TODO.doneSub = function(id) {
	// add to DB
	TODO.ajax('source/modify.php', {method: 'DONESUB', SID:id}, function(response) {
		if(response.success) {
			DRAW.doneSub(id);
		} else {
			console.log(response);
		}
	});
}

TODO.delSub = function(id) {
	// add to DB
	TODO.ajax('source/modify.php', {method: 'DELSUB', SID:id}, function(response) {
		if(response.success) {
			DRAW.delSub(id);
		} else {
			console.log(response);
		}
	});
}

TODO.get = function(id) {
	TODO.ajax('source/fetch.php', {method: 'ID', ID: id}, function(response) {
		if(response.success) {
			//console.log(response.data.sub);
			DRAW.modal(id, response.data.TOPIC, response.data.DATE, response.data.sub);
			DRAW.showModal();
		} else {
			console.log(response);
		}
	});
}

TODO.all = function() {
	TODO.ajax('source/fetch.php', {method: 'ALL'}, function(response) {
		console.log(response);
		if(response.success) {
			for(i = 0 ; i < response.data.length; i++) {
				DRAW.add(response.data[i].ID, response.data[i].TOPIC, response.data[i].STATUS, response.data[i].DATE);
			}
		} else {
			console.log(response);
		}
	});
}