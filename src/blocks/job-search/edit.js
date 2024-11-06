/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, } from '@wordpress/components';


export function Edit(  ) {

	return (
		<div>
			<BlockControls>
				<ToolbarGroup/>
			</BlockControls>
			<input type="text" className="select2-search" placeholder={ __( 'Search jobs..', 'connectoor-jobs-free' ) } value=""/>
		</div>
	);
}

export default Edit;
