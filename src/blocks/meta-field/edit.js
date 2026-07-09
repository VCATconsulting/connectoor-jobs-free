/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';


export function Edit(props) {
	const { attributes, setAttributes } = props;
	const { field } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Meta Field Settings", "connectoor-jobs")}>
					<SelectControl
						help={ __( 'Select the meta field to display.', 'connectoor-jobs' ) }
						label={ __( 'Meta Field', 'connectoor-jobs' ) }
						value={ field }
						options={ [
							{ label: __( 'Begin', 'connectoor-jobs' ), value: '_connectoor_jobs_begin' },
							{ label: __( 'Company', 'connectoor-jobs' ), value: '_connectoor_jobs_company' },
							{ label: __( 'Location Address', 'connectoor-jobs' ), value: '_connectoor_jobs_location_address' },
							{ label: __( 'City', 'connectoor-jobs' ), value: '_connectoor_jobs_city' },
							{ label: __( 'State', 'connectoor-jobs' ), value: '_connectoor_jobs_state' },
							{ label: __( 'Postalcode', 'connectoor-jobs' ), value: '_connectoor_jobs_postalcode' },
							{ label: __( 'Country', 'connectoor-jobs' ), value: '_connectoor_jobs_country' },
							{ label: __( 'Jobtype', 'connectoor-jobs' ), value: '_connectoor_jobs_jobtype' },
							{ label: __( 'Employment Duration', 'connectoor-jobs' ), value: '_connectoor_jobs_employment_duration' },
							{ label: __( 'Experience', 'connectoor-jobs' ), value: '_connectoor_jobs_experience' },
						] }
						onChange={ ( value ) => setAttributes( { field: value } ) }
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
