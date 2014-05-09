var API_URL = "https://api.github.com";
var USERNAME = "espinola3";
var PASSWORD = "espinola@3";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});
$("#get_repo").click(function(e) {
	e.preventDefault();
	getRepo($("#repository_name").val());
	});
	
$("#get_list_repos").click(function(e) {
	e.preventDefault();
	getRepos();
	});
	
$("#delete_repo").click(function(e){
	e.preventDefault();
	deleteRepo($("#repository_name").val());
	});
		
$("#button_edit_repo").click(function(e) {
	e.preventDefault();
	 var newRepo = new Object();
	newRepo.name = $("#repository_name_edit").val()
	newRepo.description = $("#repository_description").val()
	
	editRepo(newRepo);
});

$("#button_create_repo").click(function(e){
	e.preventDefault();
	var createRepo = new Object();
	createRepo.name = $("#repository_name_create").val()
	createRepo.description = $("#repository_description_create").val()
	CreateRepo(createRepo);
	});
	
	function getRepos() {
	var url = API_URL + '/users/' + USERNAME + '/repos';

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
				
				$.each(repos, function(i, v) {
					var repo = v;
					$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#list_repo_result'));
					$('<p>').appendTo($('#list_repo_result'));	
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#list_repo_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#list_repo_result'));
					$('</p>').appendTo($('#list_repo_result'));
					console.log(v);
				});
				

	}).fail(function() {
		$("#list_repo_result").text("No repositories.");
	});

}

function getRepo(repository_name){
var url = API_URL + '/repos/' + USERNAME + '/' + repository_name;

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var repo = data;

				$("#get_repo_result").text('');
				$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#repo_result'));
				$('<p>').appendTo($('#repo_result'));	
				$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repo_result'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repo_result'));
				$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repo_result'));
				$('</p>').appendTo($('#repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#repo_result"));
	});
}


function editRepo(newRepo){
var url = API_URL + '/repos/' + USERNAME + '/' + newRepo.name;
var data = JSON.stringify(newRepo);

$("#edit_result").text(' ');

$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
	statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#edit_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#edit_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#edit_result"));
	});
}

function CreateRepo(createRepo){
var url = API_URL + '/user/repos';
var data = JSON.stringify(createRepo);

$("#create_result").text(' ');

$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	statusCode: {
    		404: function() {$('<span><div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div></span>').appendTo($("#create_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});
}
function deleteRepo(repository_name){
var url = API_URL + '/repos/' + USERNAME + '/' + repository_name;
$("#edit_result").text(' ');

$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json',
	statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#repo_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Deleted</div>').appendTo($("#repo_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#repo_result"));
	});
}
