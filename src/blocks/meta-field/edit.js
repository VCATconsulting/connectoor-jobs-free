/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';


export function Edit(props) {
	const { attributes, setAttributes } = props;
	const { field } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Meta Field Settings", "connectoor-jobs")}>
					<TextControl
						help={__("Enter the meta field key (e.g. _connectoor_jobs_city)", "connectoor-jobs")}
						label={__("Meta Field", "connectoor-jobs")}
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
