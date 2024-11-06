/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin.scss":
/*!************************!*\
  !*** ./src/admin.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api":
/*!*****************************!*\
  !*** external ["wp","api"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["api"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
/*!**********************!*\
  !*** ./src/admin.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.scss */ "./src/admin.scss");
/* harmony import */ var _wordpress_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api */ "@wordpress/api");
/* harmony import */ var _wordpress_api__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);






class App extends _wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Component {
  state = {};
  constructor() {
    super(...arguments);
    this.state = {
      brandingColor: '',
      saveSettingsIsLoading: false,
      settingsSaved: false,
      isAPILoaded: false
    };
  }
  componentDidMount() {
    _wordpress_api__WEBPACK_IMPORTED_MODULE_2___default().loadPromise.then(() => {
      this.settings = new (_wordpress_api__WEBPACK_IMPORTED_MODULE_2___default().models).Settings();
      const {
        isAPILoaded
      } = this.state;
      if (isAPILoaded === false) {
        this.settings.fetch().then(response => {
          this.setState({
            brandingColor: response['_connectoor_jobs_branding_color'],
            isAPILoaded: true
          });
        });
      }
    });
  }
  render() {
    const {
      brandingColor,
      saveSettingsIsLoading,
      saveSettingsStatus,
      settingsSaved,
      isAPILoaded
    } = this.state;
    if (!isAPILoaded) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null));
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "connectoor-jobs__header"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "connectoor-jobs__container"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "connectoor-jobs__title"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Connectoor Jobs Free - Settings', 'connectoor-jobs-free'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
      icon: "admin-plugins"
    }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "connectoor-jobs__main"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Panel, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Connectoor Jobs Pro - Upgrade', 'connectoor-jobs-free'),
      icon: "admin-plugins"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl.VisualLabel, {
      className: "api-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      dangerouslySetInnerHTML: {
        // eslint-disable-next-line no-undef
        // translators: %s: URL to the Connectoor Jobs Pro page.
        __html: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Use all the benefits, automatic job advertisements, AI and more in the <strong>PRO version</strong> and our Connectoor recruiting software. <a href="%s">Find out more.</a>', 'connectoor-jobs-free'), 'https://www.connectoor.com/wordpress-plugin')
      }
    })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Branding Settings', 'connectoor-jobs-free'),
      icon: "admin-plugins"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.BaseControl.VisualLabel, {
      className: "api-description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Here you can add specific settings for your brand.', 'connectoor-jobs-free')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
      color: brandingColor,
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Select a branding color', 'connectoor-jobs-free'),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Branding Color', 'connectoor-jobs-free'),
      onChange: brandingColor => this.setState({
        brandingColor
      }),
      enableAlpha: true,
      defaultValue: "blue"
    })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      className: "branding-color",
      isPrimary: true,
      isLarge: true,
      onClick: this.saveSettings
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Save Data', 'connectoor-jobs-free')), saveSettingsIsLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), !saveSettingsIsLoading && settingsSaved && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `connectoor-jobs components-notice is-${saveSettingsStatus}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "connectoor-jobs components-notice__content"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Settings saved', 'connectoor-jobs-free'))))));
  }
  saveSettings = () => {
    const {
      brandingColor
    } = this.state;
    console.log(brandingColor);
    const settings = new (_wordpress_api__WEBPACK_IMPORTED_MODULE_2___default().models).Settings({
      ['_connectoor_jobs_branding_color']: brandingColor
    });
    this.setState({
      saveSettingsIsLoading: true
    });
    settings.save().then(res => {
      this.setState({
        saveSettingsIsLoading: false,
        settingsSaved: true
      });
    });
  };
  loginCredentials = () => {
    this.setState({
      loginConnectionIsLoading: true
    });
  };
}
document.addEventListener('DOMContentLoaded', () => {
  const htmlOutput = document.getElementById('connectoor-jobs-settings');
  if (htmlOutput) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), htmlOutput);
  }
});
/******/ })()
;
//# sourceMappingURL=admin.js.map