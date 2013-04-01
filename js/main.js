
$(document).ready(function() {

	var allProjects = [];

	readThemAll = function(p) {
		$.getJSON(
			'https://api.github.com/users/hirmes/starred?page='+p,
			function(data) {
				if ( data.length < 1 ) {
					showThemAll(allProjects);
					return;
				}
				
			 	$.each(data, function(i, starred) {
			 		allProjects.push(starred);
			 		$.jStorage.set(starred.name,starred);
				});

				readThemAll(p+1);
			}
		  );
	};

	showThemAll = function(content) {
		$("#mainTable").html("");
		$.each(content, function(index, value) {
			$("#mainTable").append("<tr><td>" + value.name + "</td><td>" + value.description + "</td><td>" + value.language + "</td></tr>");
			//console.log(value);
		});

		$("#mainTable tr:even").addClass("stripe");
		
		$("#searchTerm").focus();

		var languages = {};
		$.each(content, function(index, val) {
			 //iterate through array or object
			 if ( typeof languages[val.language] != 'undefined' ) {
			 	languages[val.language]++;
			 } else {
			 	languages[val.language] = 1;
			 }
		});
		$.each(languages, function(index, val) {
			console.log(index + ": " + val);
		});
	};

	search = function() {
		var searchTerm = $("#searchTerm").val();
		if ( searchTerm.length == 0 ) {
			showThemAll(allProjects);
			return;
		}
		var options = {
		  keys: ['name', 'description', 'language']   // keys to search in
		}
		var f = new Fuse(allProjects, options);
		var result = f.search(searchTerm); // Fuzzy-search for pattern 'brwn'
		showThemAll(result);
	}

	$("#searchTerm").keyup(search);

	if ( $.jStorage.index().length ) {
		$.each($.jStorage.index(), function(index, value) {
			allProjects.push($.jStorage.get(value));
		});
		showThemAll(allProjects);
	} else {
		readThemAll(1);
	}

});
