/*
* Module dependencies 
*/

import $ from 'jquery'
import page from 'page'
import { getShows } from 'src/tvmaze-api-client/index.js'
import renderShows from 'src/render/index.js'
import $tvShowsContainer from 'src/tv-shows-container/index.js'

page ('/', function (ctx, next) { 
	if (!localStorage.shows) {
		getShows(function (shows) {
			$tvShowsContainer.find('.loader').remove()
			localStorage.shows = JSON.stringify(shows)
			renderShows(shows)
		})
	} else {
		renderShows(JSON.parse(localStorage.shows))
	}
})

page()