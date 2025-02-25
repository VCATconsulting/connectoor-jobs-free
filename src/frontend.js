import './select2/index.js';
import './scss/_style.scss';
import { __ } from '@wordpress/i18n';


//Connectoor Jobs Plugin - Klickbare Index li-Container
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('ul.wp-block-post-template.branding-color li').forEach(li => {
		li.addEventListener('click', e => {
			if (e.target.tagName !== 'a') {
				window.location.href = li.querySelector('a').href;
			}
		});

		const jobMetaFields = li.querySelectorAll('.job-meta .wp-block-connectoor-jobs-meta-field');
		const lastField = jobMetaFields[jobMetaFields.length - 1];

		// Extrahiere das Datum aus dem letzten Feld
		const dateText = lastField.textContent.trim();
		const [day, month, year] = dateText.split('.').map(Number);
		const jobDate = new Date(year, month - 1, day); // JavaScript Monate sind 0-indexiert

		// Heutiges Datum (ohne Uhrzeit)
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Entfernt Uhrzeit für Vergleich

		// Prüfe, ob das Datum heute oder in der Vergangenheit liegt
		if (jobDate <= today) {
			lastField.textContent = __('now','connectoor-jobs-free');
		}
	});
});


jQuery(document).ready(function ($) {
	let selectedIds = [];

	function initializeSelect2() {
		$('#select2-search').select2({
			ajax: {
				url: searchVars.ajaxUrl,
				dataType: 'json',
				delay: 250,
				data: function (params) {
					return {
						action: 'connectoor_jobs_search_jobs',
						q: params.term,
						categories: searchVars.catIds
					};
				},
				processResults: function (data) {
					let results = data.map(post => ({
						id: post.ID,
						text: post.post_title
					}));

					// Extract an array of IDs from the results.
					selectedIds = results.map(result => result.id);
					return {
						results: results
					};
				},
				cache: true
			},
			minimumInputLength: 1,
			language: "de",
			placeholder: searchVars.placeholderText,
			allowClear: true
		}).on('select2:select', function (e) {
			let searchTerm = e.params.data.text;

			// Reload the query loop based on the search term.
			$.ajax({
				url: searchVars.ajaxUrl,
				type: 'GET',
				data: {
					action: 'connectoor_jobs_search_jobs',
					q: searchTerm,
					ids: selectedIds,
					categories: searchVars.catIds
				},
				success: function (data) {
					const queryLoopContainer = $('.wp-block-query');
					queryLoopContainer.empty();

					// Create ul-container to append the results.
					let ul = $('<ul class="branding-color wp-block-post-template"></ul>');

					// Add the results.
					data.forEach(function (post) {
						let li = $(
							'<li class="connectoor_jobs">' +
							'<article class="wp-block-group">' +
							'<div class="wp-block-group">' + post.company + '</div>' +
							'<h3><a href="' + post.link + '" title="' + post.post_title + '">' + post.post_title + '</a></h3>' +
							'<div class="search-result-meta">' +
							'<div>' + post.location + '</div>' +
							'<div>' + post.job_type + '</div>' +
							'<div>' + post.time + '</div>' +
							'</div>' +
							'<a class="wp-block-read-more" href="' + post.link + '" target="_self">' + searchVars.readMoreText + '<span class="screen-reader-text">: ' + post.post_title + '</span></a>' +
							'</article>' +
							'</li>'
						);

						ul.append(li);
					});

					// Add ul-container to query loop container.
					queryLoopContainer.append(ul);

					// Re-initialize Select2 after updating results.
					initializeSelect2();

					// Make li clickable.
					$(document).on('click', 'ul.branding-color li.connectoor_jobs', function (e) {
						if (e.target.tagName.toLowerCase() !== 'a') {
							window.location.href = $(this).find('a').attr('href');
						}
					});
				}
			});
		});
	}

	if ( $('#select2-search').length < 1) {
		return;
	}
	// Initialize Select2 on page load
	initializeSelect2();

});
