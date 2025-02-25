/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

import './styles/editor.scss';
import './styles/style.scss';

export { metadata };

export const settings = {
	title: 'Meta Field',
	icon: 'admin-post',
	edit,
	save() {
		// Rendering in PHP.
		return null;
	},
};
