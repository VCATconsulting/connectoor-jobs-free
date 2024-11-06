/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl,ToolbarGroup } from '@wordpress/components';


export function Edit(props) {
	const { attributes, setAttributes } = props;
	const { field } = attributes;

	return (
		<>
			<BlockControls>
				<ToolbarGroup />
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Meta Field Settings">
					<TextControl
						label={__("Meta Field Key","connectoor-jobs")}
						value={field}
						onChange={(value) => setAttributes({ field: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div>
				<strong>Meta Field:</strong> {field}
			</div>
		</>
	);
}

export default Edit;
