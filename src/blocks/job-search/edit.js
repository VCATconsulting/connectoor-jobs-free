/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export function Edit(  ) {

	return (
		<div className="connetoor-jobs-search-field-wrapper">
			<input type="text" className="connetoor-jobs-search" placeholder={ __( 'Search jobs..', 'connectoor-jobs' ) } value=""/>
		</div>
	);
}

export default Edit;
