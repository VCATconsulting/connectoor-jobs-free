import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch, } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelRow, TextControl } from '@wordpress/components';



const MetaBox = ( { postType, metaFields, setMetaFields } ) => {

	if ( 'connectoor_jobs' !== postType ) return null;

	return (

		<PluginDocumentSettingPanel
			title={ __( 'Job Information','connectoor-jobs-free' ) }
			icon="businessman"
			initialOpen={ false }
		>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_referencenumber }
					label={ __( "Referencenumber", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_referencenumber: value } ) }
					readOnly
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_intern_title }
					label={ __( "Intern title", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_intern_title: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_begin }
					label={ __( "Begin", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_begin: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_company }
					label={ __( "Company", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_company: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_sourcename }
					label={ __( "Sourcename", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_sourcename: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_location_address }
					label={ __( "Location Address", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_location_address: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_postalcode }
					label={ __( "Postalcode", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_postalcode: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_city }
					label={ __( "City", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_city: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_state }
					label={ __( "State", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_state: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_country }
					label={ __( "Country", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_country: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_url }
					label={ __( "Job URL", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_url: value } ) }
					readOnly
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_apply_url }
					label={ __( "Apply URL", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_apply_url: value } ) }
					readOnly
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_email }
					label={ __( "E-Mail", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_email: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_deadline_visible }
					label={ __( "Deadline Visible", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_deadline_visible: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_deadline }
					label={ __( "Deadline", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_deadline: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_jobtype }
					label={ __( "Jobtype", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_jobtype: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_employment_duration }
					label={ __( "Employment Duration", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_employment_duration: value } ) }
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					value={ metaFields._connectoor_jobs_experience }
					label={ __( "Experience", "connectoor-jobs" ) }
					onChange={ ( value ) => setMetaFields( { _connectoor_jobs_experience: value } ) }
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	)
		;
}

const applyWithSelect = withSelect( ( select ) => {
	return {
		metaFields: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
		postType: select( 'core/editor' ).getCurrentPostType()
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	return {
		setMetaFields( newValue ) {
			dispatch( 'core/editor' ).editPost( { meta: newValue } )
		}
	}
} );

export default compose( [
	applyWithSelect,
	applyWithDispatch
] )( MetaBox );
