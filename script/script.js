let url = 'https://api.github.com/search/repositories?',
	result = $('#result-view')
	page = 1,
	pagination = $('#list-pagination li');

$(document).ready(function(){
	getTopGit();
});

$(document).on('keyup', '#text-search', function(){
	$('#list-pagination li').remove();
	$('.result-view tr').not('.table-header').remove();
	let req = $('#text-search').val().trim();
	if(req){
		getSearchGit(req);
	}else{
		getTopGit();
	}
});

function getTopGit(){
	$.ajax({
		url: url + 'q=stars:>=5000&sort=stars&order=desc?page=1&per_page=10',
		type: 'GET',
		error: function(error){
			console.log(error);
		},
		success: function(data){
			data.items.forEach(function(item){
				result.append('<tr><td>' + item.name + '</td><td>' + item.stargazers_count + '</td><td>' + item.updated_at + '</td><td>' + '<a href="' + item.html_url + '">Открыть</a>' + '</td></tr>');
			})
		}
	})
}

function getSearchGit(req){
	$.ajax({
		url: url + 'q=' + req + '&sort=stars&order=desc?page=' + page + '&per_page=10',
		type: 'GET',
		error: function(error){
			console.log(error);
		},
		success: function(data){
			let count = Math.ceil(data.total_count / 10);
			for(var i = 0; i <= 10; i++){
				$('#list-pagination').append('<li><a href="?page=' + i + '">' + i + '</a></li>');
			}
			data.items.forEach(function(item){
				result.append('<tr><td>' + item.name + '</td><td>' + item.stargazers_count + '</td><td>' + item.updated_at + '</td><td>' + '<a href="' + item.html_url + '">Открыть</a>' + '</td></tr>');
			})
		}
	})
}