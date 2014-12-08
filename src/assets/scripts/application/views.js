window.Views = {};

window.Views.GistList = (function () {

	var titlefy = function (title) {

		title = Object.keys(title)[0];
		title = title.replace(/\.md|-/g, ' ').trim()
		title = title && title[0].toUpperCase() + title.slice(1);

		return title;
	};

	var dataTreatment = function (data) {
		for (var i in data) {
			data[i].title 	= titlefy(data[i].files);
			data[i].type 	='gist';
			
			data[i].font 	= 'Gist';
		}
		return data;
	};

	var compile = function (data) {
		data = dataTreatment(data);
		var source = document.querySelector("#contents");
		var template = Handlebars.compile(source.innerHTML);
		var context = {
			items: data
		};
		var html = template(context);
		document.querySelector('#preload').style.display='none';
		source.parentNode.innerHTML+=html;
	};

	return function (model) {
		return model(compile);
	};

})();

window.Views.RepositoriesList = (function () {


	var titlefy = function (name) {
		name = name.replace(/\-+/g, ' ').trim();
		name = name && name[0].toUpperCase() + name.slice(1);
		return name;
	};

	var dataTreatment = function (data) {
		for (var i in data) {
			data[i].title = titlefy(data[i].name);
			data[i].type 	='repos';
			
			var date = new Date(data[i].pushed_at);
			data[i].created_at 	=date.toLocaleString();
			data[i].font 	= 'Github';
		}
		return data;
	};

	var compile = function (data) {
		data = dataTreatment(data);
		var source = document.querySelector("#contents");
		var template = Handlebars.compile(source.innerHTML);
		var context = {
			items: data
		};
		var html = template(context);
		document.querySelector('#preload').style.display='none';
		source.parentNode.innerHTML+=html;
	};

	return function (model) {
		return model(compile);
	};
})();