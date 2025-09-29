import './scss/_style.scss';
import 'jquery-ui-dist/jquery-ui.css';
import { __ } from '@wordpress/i18n';


//Connectoor Jobs Plugin - Klickbare Index li-Container
document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( 'ul.wp-block-post-template.branding-color li' ).forEach( li => {
		li.addEventListener( 'click', e => {
			if ( e.target.tagName !== 'a' ) {
				window.location.href = li.querySelector( 'a' ).href;
			}
		} );

		const jobMetaFields = li.querySelectorAll( '.job-meta .wp-block-connectoor-jobs-meta-field' );
		if ( jobMetaFields.length === 0 ) {
			return;
		}

		const lastField = jobMetaFields[ jobMetaFields.length - 1 ];

		// Extrahiere das Datum aus dem letzten Feld
		const dateText = lastField.textContent.trim();
		const [ day, month, year ] = dateText.split( '.' ).map( Number );
		const jobDate = new Date( year, month - 1, day ); // JavaScript Monate sind 0-indexiert

		// Heutiges Datum (ohne Uhrzeit)
		const today = new Date();
		today.setHours( 0, 0, 0, 0 ); // Entfernt Uhrzeit für Vergleich

		// Prüfe, ob das Datum heute oder in der Vergangenheit liegt
		if ( jobDate <= today ) {
			lastField.textContent = __( 'now', 'connectoor-jobs' );
		}
	} );
} );


jQuery( document ).ready( function ( $ ) {

	const $input = $( '#connectoor-job-search' );
	const defaultPerPage = 10;

	if ( $input.length < 1 ) return;

	let suppressNextChange = false;
	$input.autocomplete( {
		source: function ( request, response ) {
			$.ajax( {
				url: searchVars.ajaxUrl,
				dataType: 'json',
				data: {
					action: 'connectoor_jobs_search_jobs',
					q: request.term,
					categories: searchVars.categoriesTerms,
					nonce: searchVars.nonce
				},
				success: function ( data ) {
					const seenTitles = new Set();

					const uniqueSuggestions = data.results.filter( post => {
						if ( seenTitles.has( post.post_title ) ) {
							return false;
						}
						seenTitles.add( post.post_title );
						return true;
					} ).map( post => ( {
						label: post.post_title,
						value: post.post_title,
						postId: post.ID
					} ) );

					response( uniqueSuggestions );
				}
			} );
		},
		minLength: 2,
		select: function ( event, ui ) {
			// Auswahl wurde getroffen (text bleibt im Feld)
			suppressNextChange = true;
			const searchTerm = ui.item.value;
			$input.val(searchTerm);
			// Ergebnisse rendern
			loadJobResults( searchTerm, 1, defaultPerPage );
		}
	} );

	// Alternativ auch bei Enter oder Input-Änderung suchen
	$input.on( 'change keyup', function ( e ) {
		if (suppressNextChange) {
			suppressNextChange = false;          // genau einen change/keyup schlucken
			return;
		}
		if ( e.keyCode === 13 || $input.val().length >= 3 ) {
			loadJobResults( $input.val(), 1, defaultPerPage );
		}
	} );

	let currentRequest = null;

	// Ajax-Suchergebnisse laden
	function loadJobResults( searchTerm, page = 1, perPage = 10 ) {

		if ( currentRequest !== null ) {
			currentRequest.abort();
		}
		const container = $( '.wp-block-query' );
		container.empty();


		// Reload the query loop based on the search term.
		$.ajax( {
			url: searchVars.ajaxUrl,
			dataType: 'json',
			method: 'GET',
			data: {
				action: 'connectoor_jobs_search_jobs',
				q: searchTerm,
				nonce: searchVars.nonce,
				categories: searchVars.categoriesTerms,
				page: page,
				per_page: perPage,
				page_id: searchVars.page_id,
			},
			success: function ( data ) {
				currentRequest = null; // Reset if successfull.
				const ul = $( '<ul class="branding-color wp-block-post-template"></ul>' );

				data.results.forEach( function ( post ) {
					const li = $( `<li class="connectoor_jobs">${ post.html }</li>` );
					ul.append( li );
				} );

				container.append( ul );

				// Include pagination in gutenberg style.
				renderPagination( container, data.max_pages, data.paged );

				// Make li clickable.
				$( document ).on( 'click', 'ul.branding-color li.connectoor_jobs', function ( e ) {
					if ( e.target.tagName.toLowerCase() !== 'a' ) {
						window.location.href = $( this ).find( 'a' ).attr( 'href' );
					}
				} );


			},
			error: function () {
				currentRequest = null; // Rest if error.
			}
		} );
	}

		function renderPagination( container, maxPages, currentPage ) {
		// Remove old pagination
			container.find( '.wp-block-query-pagination' ).remove();
			if ( maxPages < 2 ) return;

			const nav = $( `
    <nav class="wp-block-query-pagination is-layout-flex wp-block-query-pagination-is-layout-flex"
         role="navigation" aria-label="Seitennummerierung"></nav>
  ` );

		//  Previous Link only append if currentPage > 1
			if ( currentPage > 1 ) {
				const prevPage = currentPage - 1;
				nav.append( `
      <a href="?query-1-page=${ prevPage }"
         class="wp-block-query-pagination-previous"
         aria-label="Vorherige Seite">
        Vorherige Seite
      </a>
    ` );
			}

		// Number Container
			const numbers = $( `<div class="wp-block-query-pagination-numbers"></div>` );
			const total = maxPages;
			const delta = 2;
			let range = [];
			for ( let i = 1; i <= total; i++ ) {
				if (
					i === 1 ||
					i === total ||
					( i >= currentPage - delta && i <= currentPage + delta )
				) {
					range.push( i );
				}
			}

			let last = 0;
			range.forEach( i => {
				if ( last + 1 < i ) {
				// Dots with own element and spacer.
					numbers.append( '<span class="page-numbers dots">…</span>&nbsp;' );
				}
				if ( i === currentPage ) {
					numbers.append( `<span aria-current="page" class="page-numbers current">${ i }</span>&nbsp;` );
				} else {
					numbers.append( `<a class="page-numbers" href="?query-1-page=${ i }">${ i }</a>&nbsp;` );
				}
				last = i;
			} );

			nav.append( numbers );

		// Next Link only append if not last page
			if ( currentPage < total ) {
				const nextPage = currentPage + 1;
				nav.append( `
      <a href="?query-1-page=${ nextPage }"
         class="wp-block-query-pagination-next"
         aria-label="Nächste Seite">
        Nächste Seite
      </a>
    ` );
			}

			container.append( nav );

		// Click-Handler
			container
				.find( '.wp-block-query-pagination-previous, .page-numbers[href], .wp-block-query-pagination-next' )
				.off( 'click' )
				.on( 'click', function ( e ) {
					e.preventDefault();
					const href = $( this ).attr( 'href' );
					const page = href.match( /query-1-page=(\d+)/ )
						? parseInt( href.match( /query-1-page=(\d+)/ )[ 1 ], 10 )
						: 1;
					loadJobResults( $( '#connectoor-job-search' ).val(), page, defaultPerPage );
				} );
		}
	}
)
