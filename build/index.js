/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/job-search/block.json":
/*!******************************************!*\
  !*** ./src/blocks/job-search/block.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"connectoor-jobs/job-search","title":"Search Field","category":"connectoor-jobs","attributes":{},"supports":{"html":false},"editorStyle":"wp-block-connectoor-jobs-job-search-editor","style":"wp-block-connectoor-jobs-job-search"}');

/***/ }),

/***/ "./src/blocks/job-search/edit.js":
/*!***************************************!*\
  !*** ./src/blocks/job-search/edit.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Edit: () => (/* binding */ Edit),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

function Edit() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "connetoor-jobs-search-field-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "connetoor-jobs-search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search jobs..', 'connectoor-jobs'),
    value: ""
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/job-search/index.js":
/*!****************************************!*\
  !*** ./src/blocks/job-search/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   metadata: () => (/* reexport default export from named module */ _block_json__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/job-search/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/job-search/block.json");
/* harmony import */ var _styles_editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/editor.scss */ "./src/blocks/job-search/styles/editor.scss");
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/style.scss */ "./src/blocks/job-search/styles/style.scss");
/**
 * Internal dependencies
 */






const settings = {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Job Search', 'connectoor-jobs'),
  icon: 'search',
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save() {
    // Rendering in PHP.
    return null;
  }
};

/***/ }),

/***/ "./src/blocks/job-search/styles/editor.scss":
/*!**************************************************!*\
  !*** ./src/blocks/job-search/styles/editor.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/job-search/styles/style.scss":
/*!*************************************************!*\
  !*** ./src/blocks/job-search/styles/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/meta-field/block.json":
/*!******************************************!*\
  !*** ./src/blocks/meta-field/block.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"connectoor-jobs/meta-field","title":"Meta Field","category":"connectoor-jobs","attributes":{"field":{"type":"string","default":""}},"usesContext":["postId"],"supports":{"anchor":true,"reusable":false,"html":false},"editorScript":"file:./index.js","editorStyle":"wp-block-connectoor-jobs-job-meta-editor","style":"wp-block-connectoor-jobs-job-meta"}');

/***/ }),

/***/ "./src/blocks/meta-field/edit.js":
/*!***************************************!*\
  !*** ./src/blocks/meta-field/edit.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Edit: () => (/* binding */ Edit),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);

/**
 * WordPress dependencies
 */



function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    field
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Meta Field Settings", "connectoor-jobs")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the meta field to display.', 'connectoor-jobs'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Field', 'connectoor-jobs'),
    value: field,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Begin', 'connectoor-jobs'),
      value: '_connectoor_jobs_begin'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Company', 'connectoor-jobs'),
      value: '_connectoor_jobs_company'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Location Address', 'connectoor-jobs'),
      value: '_connectoor_jobs_location_address'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('City', 'connectoor-jobs'),
      value: '_connectoor_jobs_city'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('State', 'connectoor-jobs'),
      value: '_connectoor_jobs_state'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Postalcode', 'connectoor-jobs'),
      value: '_connectoor_jobs_postalcode'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Country', 'connectoor-jobs'),
      value: '_connectoor_jobs_country'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Jobtype', 'connectoor-jobs'),
      value: '_connectoor_jobs_jobtype'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Employment Duration', 'connectoor-jobs'),
      value: '_connectoor_jobs_employment_duration'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Experience', 'connectoor-jobs'),
      value: '_connectoor_jobs_experience'
    }],
    onChange: value => setAttributes({
      field: value
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Meta Field:"), " ", field));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/meta-field/index.js":
/*!****************************************!*\
  !*** ./src/blocks/meta-field/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   metadata: () => (/* reexport default export from named module */ _block_json__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   settings: () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit */ "./src/blocks/meta-field/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/meta-field/block.json");
/* harmony import */ var _styles_editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/editor.scss */ "./src/blocks/meta-field/styles/editor.scss");
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/style.scss */ "./src/blocks/meta-field/styles/style.scss");
/**
 * Internal dependencies
 */





const settings = {
  title: 'Meta Field',
  icon: 'admin-post',
  edit: _edit__WEBPACK_IMPORTED_MODULE_0__["default"],
  save() {
    // Rendering in PHP.
    return null;
  }
};

/***/ }),

/***/ "./src/blocks/meta-field/styles/editor.scss":
/*!**************************************************!*\
  !*** ./src/blocks/meta-field/styles/editor.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/meta-field/styles/style.scss":
/*!*************************************************!*\
  !*** ./src/blocks/meta-field/styles/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/jobs/jobs.js":
/*!*************************************!*\
  !*** ./src/components/jobs/jobs.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);






const MetaBox = ({
  postType,
  metaFields,
  setMetaFields
}) => {
  if ('connectoor_jobs' !== postType) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Job Information', 'connectoor-jobs'),
    icon: "businessman",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_referencenumber,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Referencenumber", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_referencenumber: value
    }),
    readOnly: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_intern_title,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Intern title", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_intern_title: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_begin,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Begin", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_begin: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_company,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Company", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_company: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_sourcename,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Sourcename", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_sourcename: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_location_address,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Location Address", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_location_address: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_postalcode,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Postalcode", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_postalcode: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_city,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("City", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_city: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_state,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("State", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_state: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_country,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Country", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_country: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_url,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Job URL", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_url: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_apply_url,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Apply URL", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_apply_url: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_email,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("E-Mail", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_email: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ToggleControl, {
    value: metaFields._connectoor_jobs_deadline_visible,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Deadline Visible", "connectoor-jobs"),
    checked: metaFields._connectoor_jobs_deadline_visible,
    onChange: value => setMetaFields({
      _connectoor_jobs_deadline_visible: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_deadline,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Deadline", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_deadline: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_jobtype,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Jobtype", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_jobtype: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_employment_duration,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Employment Duration", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_employment_duration: value
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: metaFields._connectoor_jobs_experience,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Experience", "connectoor-jobs"),
    onChange: value => setMetaFields({
      _connectoor_jobs_experience: value
    })
  })));
};
const applyWithSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withSelect)(select => {
  return {
    metaFields: select('core/editor').getEditedPostAttribute('meta'),
    postType: select('core/editor').getCurrentPostType()
  };
});
const applyWithDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withDispatch)(dispatch => {
  return {
    setMetaFields(newValue) {
      dispatch('core/editor').editPost({
        meta: newValue
      });
    }
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)([applyWithSelect, applyWithDispatch])(MetaBox));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_jobs_jobs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/jobs/jobs */ "./src/components/jobs/jobs.js");
/* harmony import */ var _blocks_job_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/job-search */ "./src/blocks/job-search/index.js");
/* harmony import */ var _blocks_meta_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/meta-field */ "./src/blocks/meta-field/index.js");

const {
  registerBlockType
} = wp.blocks;

// Register Blocks




//import './scss/_editor-styles.scss';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */

(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('connectoor-jobs-job-metadata', {
  render: _components_jobs_jobs__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
const registerBlock = block => {
  if (!block) {
    return;
  }
  const {
    metadata,
    settings
  } = block;
  registerBlockType(metadata, {
    ...settings
  });
};

/**
 * Function to register all blocks provided by Connectoor Jobs.
 */
const registerBlocks = () => {
  [_blocks_job_search__WEBPACK_IMPORTED_MODULE_2__, _blocks_meta_field__WEBPACK_IMPORTED_MODULE_3__].forEach(registerBlock);
};
registerBlocks();

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunk_connectoor_connectoor_jobs"] = globalThis["webpackChunk_connectoor_connectoor_jobs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map