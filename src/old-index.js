import $ from 'jquery';

$(function() {
	/*
	* Submit form
	*/
var $tvShowsContainer = $('.app-body').find('.tv-shows')

	$tvShowsContainer.on('click', 'button.fav', function(ev){
		var $this = $(this)
			$this.closest('.tv-show').toggleClass('faved')
	})

	function renderShows(shows){
		$tvShowsContainer.find('.loader').remove();
		shows.forEach(function (show) {
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':rating:', show.rating.average)
				.replace(':date:', show.premiered)
				.replace(':summary:', show.summary)
				.replace(':img-alt:', show.name + "logo")

			var $article = $(article)
			$article.hide();	
			$tvShowsContainer.append($article.fadeIn(2000));
		})
	}

	$('.app-body')
		.find('form')
		.submit(function(ev){
			ev.preventDefault();
			var search = $(this)
				.find('input[type="text"]')
				.val();

		$tvShowsContainer.find('.tv-show').remove()
			var $loader = $('<div class="loader">');
			$loader.appendTo($tvShowsContainer);
			$.ajax({
				url: 'http://api.tvmaze.com/search/shows',
				data: { q: search },
				success: function(res, textStatus, xhr){
					$loader.remove()

					var shows = res.map(function(el){
						return el.show
					})
				renderShows(shows)
			}
		})
	})

	var template = '<article class="tv-show">' +
					'<div class="left">' +
						'<img src=":img:" alt=":img alt:" />' +
					'</div>' +
					'<div class="left info">' +
						'<h1>:name:</h1>' +
						'<h4>Rating: :rating:</h4>' +
						'<h4>Date: :date:</h4>' +
						'<p>:summary:</p>' +
						'<button class="fav">⭐</button>'
					'</div>'+
				'</article>';

if (!localStorage.shows) {
	$
		.ajax('http://api.tvmaze.com/shows')
		.then(function (shows) {			
			$tvShowsContainer.find('.loader').remove()
			localStorage.shows = JSON.stringify(shows)
			renderShows(shows)
		})
	} else {
		renderShows(JSON.parse(localStorage.shows))
	}

})