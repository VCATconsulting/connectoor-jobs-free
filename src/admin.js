import './admin.scss';

import api from '@wordpress/api';

import {
	BaseControl,
	Button,
	Icon,
	Panel,
	PanelBody,
	PanelRow,
	Placeholder,
	Spinner,
	ColorPicker,
} from '@wordpress/components';


import { Component, render } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

class App extends Component {
	state = {};

	constructor() {
		super( ...arguments );

		this.state = {
			brandingColor: '',
			saveSettingsIsLoading: false,
			settingsSaved: false,
			isAPILoaded: false,
		};
	}

	componentDidMount() {
		api.loadPromise.then(
			() => {
				this.settings = new api.models.Settings();
				const { isAPILoaded } = this.state;

				if ( isAPILoaded === false ) {
					this.settings.fetch().then(
						( response ) => {
							this.setState(
								{
									brandingColor: response[ '_connectoor_jobs_branding_color' ],
									isAPILoaded: true,
								}
							);
						}
					);
				}
			}
		);
	}

	render() {
		const {
			brandingColor,
			saveSettingsIsLoading,
			saveSettingsStatus,
			settingsSaved,
			isAPILoaded,
		} = this.state;

		if ( !isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner/>
				</Placeholder>
			);
		}

		return (
			<>
				<div className='connectoor-jobs__header'>
					<div className='connectoor-jobs__container'>
						<div className='connectoor-jobs__title'>
							<h1>{ __( 'Connectoor Jobs Free - Settings', 'connectoor-jobs-free' ) } <Icon icon='admin-plugins'/></h1>
						</div>
					</div>
				</div>
				<div className='connectoor-jobs__main'>
					<Panel>
						<PanelBody
							title={ __( 'Connectoor Jobs Pro - Upgrade', 'connectoor-jobs-free' ) }
							icon='admin-plugins'
						>
							<BaseControl>
								<BaseControl.VisualLabel
									className='api-description'
								>
									<div
										dangerouslySetInnerHTML={ {
											// eslint-disable-next-line no-undef
											// translators: %s: URL to the Connectoor Jobs Pro page.
											__html: sprintf( __( 'Use all the benefits, automatic job advertisements, AI and more in the <strong>PRO version</strong> and our Connectoor recruiting software. <a href="%s">Find out more.</a>', 'connectoor-jobs-free' ), 'https://www.connectoor.com/wordpress-plugin' )
										} }
									></div>
								</BaseControl.VisualLabel>
							</BaseControl>
						</PanelBody>
						<PanelBody
							title={ __( 'Branding Settings', 'connectoor-jobs-free' ) }
							icon='admin-plugins'
						>
							<BaseControl>
								<BaseControl.VisualLabel
									className='api-description'
								>
									{ __( 'Here you can add specific settings for your brand.', 'connectoor-jobs-free' ) }
								</BaseControl.VisualLabel>

								<PanelRow>
									<ColorPicker
										color={ brandingColor }
										help={ __( 'Select a branding color', 'connectoor-jobs-free' ) }
										label={ __( 'Branding Color', 'connectoor-jobs-free' ) }
										onChange={ ( brandingColor ) => this.setState( { brandingColor } ) }
										enableAlpha
										defaultValue="blue"
									/>
								</PanelRow>

							</BaseControl>
						</PanelBody>

						<Button
							className="branding-color"
							isPrimary
							isLarge
							onClick={
								this.saveSettings
							}
						>
							{ __( 'Save Data', 'connectoor-jobs-free' ) }
						</Button>
						{ saveSettingsIsLoading && <Spinner/> }

						{ !saveSettingsIsLoading && settingsSaved &&
							<div className={ `connectoor-jobs components-notice is-${ saveSettingsStatus }` }>
								<div className="connectoor-jobs components-notice__content">
									{
										__( 'Settings saved', 'connectoor-jobs-free' )
									}
								</div>
							</div>
						}
					</Panel>
				</div>
			</>
		);
	}

	saveSettings = () => {
		const {
			brandingColor
		} = this.state;

		console.log( brandingColor );
		const settings = new api.models.Settings(
			{
				[ '_connectoor_jobs_branding_color' ]: brandingColor,
			}
		);

		this.setState( {
			saveSettingsIsLoading: true,
		} )

		settings.save().then(
			( res ) => {
				this.setState(
					{
						saveSettingsIsLoading: false,
						settingsSaved: true,
					}
				);
			}
		)
	}

	loginCredentials = () => {

		this.setState( {
			loginConnectionIsLoading: true,
		} )
	}

}

document.addEventListener(
	'DOMContentLoaded', () => {
		const htmlOutput = document.getElementById( 'connectoor-jobs-settings' );

		if ( htmlOutput ) {
			render(
				<App/>,
				htmlOutput
			);
		}
	}
);
