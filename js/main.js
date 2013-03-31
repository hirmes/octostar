
$(document).ready(function() {

	var allProjects = [];

	readThemAll = function(p) {
		$.getJSON(
			'https://api.github.com/users/hirmes/starred?page='+p,
			function(data) {
				if ( data.length < 1 ) {
					showThemAll();
					return;
				}
				
			 	$.each(data, function(i, starred) {
			 		allProjects.push(starred);
				});

				readThemAll(p+1);
			}
		  );
	};

	showThemAll = function() {
		
		$.each(allProjects, function(index, value) {
			$("#content").append(value.name + "<br />");
		});
		
	};

	readThemAll(1);

});
