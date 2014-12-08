window.Models = {

		restAdapter:function (url, callback) {
			var client = new XMLHttpRequest();
			client.onreadystatechange = function () {
				if (client.readyState != client.DONE || client.status != 200)
					return void(0);

				return callback(JSON.parse(client.responseText));

			};
			client.open('GET', url, true);
			client.send();
		}
	
};

Models.Gists = (function (Models) {

	var uri = 'https://api.github.com/users/torvalds/gists';
	
		var titlefy = function (name) {
		name = name.replace(/\-+/g, ' ').trim();
		name = name && name[0].toUpperCase() + name.slice(1);
		return name;
	};

	var dataTreatment = function (data) {
		for (var i in data) {
			data[i].title = titlefy(data[i].name);
			data[i].type 	='repos';
			data[i].url 	= data[i].git_url;
			data[i].created_at 	= data[i].pushed_at;
			data[i].font 	= 'GitHub Repository';
		}
		return data;
	};
	
	return function (view) {
		Models.restAdapter(uri, view);
	};

})(Models);


window.Models.Repositories = (function (Models) {

	var uri = 'https://api.github.com/users/torvalds/repos';

	return function (view) {
		Models.restAdapter(uri, view);
	}

})(Models);
