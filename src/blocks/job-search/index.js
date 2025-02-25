/**
 * Internal dependencies
 */
import { __ } from '@wordpress/i18n';

import edit from './edit';
import metadata from './block.json';

import './styles/editor.scss';
import './styles/style.scss';

export { metadata };

export const settings = {
	title: __('Job Search', 'connectoor-jobs-free'),
	icon: 'search',
	edit,
	save() {
		// Rendering in PHP.
		return null;
	},
};
