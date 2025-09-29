/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/jquery-ui-dist/jquery-ui.css":
/*!***************************************************!*\
  !*** ./node_modules/jquery-ui-dist/jquery-ui.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/_style.scss":
/*!******************************!*\
  !*** ./src/scss/_style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/_style.scss */ "./src/scss/_style.scss");
/* harmony import */ var jquery_ui_dist_jquery_ui_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-ui-dist/jquery-ui.css */ "./node_modules/jquery-ui-dist/jquery-ui.css");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




//Connectoor Jobs Plugin - Klickbare Index li-Container
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('ul.wp-block-post-template.branding-color li').forEach(li => {
    li.addEventListener('click', e => {
      if (e.target.tagName !== 'a') {
        window.location.href = li.querySelector('a').href;
      }
    });
    const jobMetaFields = li.querySelectorAll('.job-meta .wp-block-connectoor-jobs-meta-field');
    if (jobMetaFields.length === 0) {
      return;
    }
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
      lastField.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('now', 'connectoor-jobs');
    }
  });
});
jQuery(document).ready(function ($) {
  const $input = $('#connectoor-job-search');
  const defaultPerPage = 10;
  if ($input.length < 1) return;
  let suppressNextChange = false;
  $input.autocomplete({
    source: function (request, response) {
      $.ajax({
        url: searchVars.ajaxUrl,
        dataType: 'json',
        data: {
          action: 'connectoor_jobs_search_jobs',
          q: request.term,
          categories: searchVars.categoriesTerms,
          nonce: searchVars.nonce
        },
        success: function (data) {
          const seenTitles = new Set();
          const uniqueSuggestions = data.results.filter(post => {
            if (seenTitles.has(post.post_title)) {
              return false;
            }
            seenTitles.add(post.post_title);
            return true;
          }).map(post => ({
            label: post.post_title,
            value: post.post_title,
            postId: post.ID
          }));
          response(uniqueSuggestions);
        }
      });
    },
    minLength: 2,
    select: function (event, ui) {
      // Auswahl wurde getroffen (text bleibt im Feld)
      suppressNextChange = true;
      const searchTerm = ui.item.value;
      $input.val(searchTerm);
      // Ergebnisse rendern
      loadJobResults(searchTerm, 1, defaultPerPage);
    }
  });

  // Alternativ auch bei Enter oder Input-Änderung suchen
  $input.on('change keyup', function (e) {
    if (suppressNextChange) {
      suppressNextChange = false; // genau einen change/keyup schlucken
      return;
    }
    if (e.keyCode === 13 || $input.val().length >= 3) {
      loadJobResults($input.val(), 1, defaultPerPage);
    }
  });
  let currentRequest = null;

  // Ajax-Suchergebnisse laden
  function loadJobResults(searchTerm, page = 1, perPage = 10) {
    if (currentRequest !== null) {
      currentRequest.abort();
    }
    const container = $('.wp-block-query');
    container.empty();

    // Reload the query loop based on the search term.
    $.ajax({
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
        page_id: searchVars.page_id
      },
      success: function (data) {
        currentRequest = null; // Reset if successfull.
        const ul = $('<ul class="branding-color wp-block-post-template"></ul>');
        data.results.forEach(function (post) {
          const li = $(`<li class="connectoor_jobs">${post.html}</li>`);
          ul.append(li);
        });
        container.append(ul);

        // Include pagination in gutenberg style.
        renderPagination(container, data.max_pages, data.paged);

        // Make li clickable.
        $(document).on('click', 'ul.branding-color li.connectoor_jobs', function (e) {
          if (e.target.tagName.toLowerCase() !== 'a') {
            window.location.href = $(this).find('a').attr('href');
          }
        });
      },
      error: function () {
        currentRequest = null; // Rest if error.
      }
    });
  }
  function renderPagination(container, maxPages, currentPage) {
    // Remove old pagination
    container.find('.wp-block-query-pagination').remove();
    if (maxPages < 2) return;
    const nav = $(`
    <nav class="wp-block-query-pagination is-layout-flex wp-block-query-pagination-is-layout-flex"
         role="navigation" aria-label="Seitennummerierung"></nav>
  `);

    //  Previous Link only append if currentPage > 1
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      nav.append(`
      <a href="?query-1-page=${prevPage}"
         class="wp-block-query-pagination-previous"
         aria-label="Vorherige Seite">
        Vorherige Seite
      </a>
    `);
    }

    // Number Container
    const numbers = $(`<div class="wp-block-query-pagination-numbers"></div>`);
    const total = maxPages;
    const delta = 2;
    let range = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || i >= currentPage - delta && i <= currentPage + delta) {
        range.push(i);
      }
    }
    let last = 0;
    range.forEach(i => {
      if (last + 1 < i) {
        // Dots with own element and spacer.
        numbers.append('<span class="page-numbers dots">…</span>&nbsp;');
      }
      if (i === currentPage) {
        numbers.append(`<span aria-current="page" class="page-numbers current">${i}</span>&nbsp;`);
      } else {
        numbers.append(`<a class="page-numbers" href="?query-1-page=${i}">${i}</a>&nbsp;`);
      }
      last = i;
    });
    nav.append(numbers);

    // Next Link only append if not last page
    if (currentPage < total) {
      const nextPage = currentPage + 1;
      nav.append(`
      <a href="?query-1-page=${nextPage}"
         class="wp-block-query-pagination-next"
         aria-label="Nächste Seite">
        Nächste Seite
      </a>
    `);
    }
    container.append(nav);

    // Click-Handler
    container.find('.wp-block-query-pagination-previous, .page-numbers[href], .wp-block-query-pagination-next').off('click').on('click', function (e) {
      e.preventDefault();
      const href = $(this).attr('href');
      const page = href.match(/query-1-page=(\d+)/) ? parseInt(href.match(/query-1-page=(\d+)/)[1], 10) : 1;
      loadJobResults($('#connectoor-job-search').val(), page, defaultPerPage);
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map