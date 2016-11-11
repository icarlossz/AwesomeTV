/* 
** Module dependencies 
*/

import $ from 'jquery'
import $tvShowsContainer from 'src/tv-shows-container'

var template = `<article class="tv-show">
					<div class="left">
						<img src=":img:" alt=":img alt:" />
					</div>
					<div class="left info">
						<h1>:name:</h1>
						<h4>Rating: :rating:</h4>
						<h4>Date: :date:</h4>
						<p>:summary:</p>
						<button class="fav">⭐</button>
					</div>
				</article>`

export default function renderShows(shows){
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