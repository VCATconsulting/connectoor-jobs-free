import './admin.scss';

import backendBanner from './images/backend-banner.png';

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
	ResponsiveWrapper
} from '@wordpress/components';


import { Component, createRoot } from '@wordpress/element';

import { __, sprintf } from '@wordpress/i18n';

class App extends Component {
	state = {};

	constructor() {
		super( ...arguments );

		this.state = {
			brandingColor: '',
			saveSettingsIsLoading: false,
			settingsSaved: false,
			saveSettingsStatus: '',
			saveSettingsMessage: '',
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
									brandingColor: response._connectoor_jobs_branding_color,
									isAPILoaded: true,
								}
							);
						}
					).catch(
						() => {
							this.setState(
								{
									isAPILoaded: true,
									settingsSaved: true,
									saveSettingsStatus: 'error',
									saveSettingsMessage: __( 'Settings could not be loaded', 'connectoor-jobs' ),
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
			saveSettingsMessage,
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
							<h1>{ __( 'Connectoor Jobs - Settings', 'connectoor-jobs' ) } <Icon icon='admin-plugins'/></h1>
						</div>
					</div>
				</div>
				<div className='connectoor-jobs__main'>
					<ResponsiveWrapper naturalWidth={ 1280 } naturalHeight={ 664 }>
						<img
							src={backendBanner}
							alt="Connectoor Jobs Pro Banner"
						/>
					</ResponsiveWrapper>
					<Panel>
						<PanelBody
							title={ __( 'Connectoor Jobs Pro - Upgrade', 'connectoor-jobs' ) }
							icon='admin-plugins'
						>
							<BaseControl>
								<BaseControl.VisualLabel
									className='api-description'
								>
									<div
										dangerouslySetInnerHTML={ {
											// eslint-disable-next-line no-undef

											__html: sprintf(
												// translators: %s: URL to the Connectoor Jobs Pro page.
												__( 'Use all the benefits, automatic job advertisements, AI and more in the <strong>PRO version</strong> and our Connectoor recruiting software. <a href="%s">Find out more.</a>', 'connectoor-jobs' ),
												'https://www.connectoor.com/wordpress-plugin'
											)
										} }
									></div>
								</BaseControl.VisualLabel>
							</BaseControl>
						</PanelBody>
						<PanelBody
							title={ __( 'Branding Settings', 'connectoor-jobs' ) }
							icon='admin-plugins'
						>
							<BaseControl>
								<BaseControl.VisualLabel
									className='api-description'
								>
									{ __( 'Here you can add specific settings for your brand.', 'connectoor-jobs' ) }
								</BaseControl.VisualLabel>

								<PanelRow>
									<ColorPicker
										color={ brandingColor }
										help={ __( 'Select a branding color', 'connectoor-jobs' ) }
										label={ __( 'Branding Color', 'connectoor-jobs' ) }
										onChange={ ( color ) => this.setState( { brandingColor: color } ) }
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
							disabled={ saveSettingsIsLoading }
							onClick={
								this.saveSettings
							}
						>
							{ __( 'Save Data', 'connectoor-jobs' ) }
						</Button>
						{ saveSettingsIsLoading && <Spinner/> }

						{ !saveSettingsIsLoading && settingsSaved &&
							<div className={ `connectoor-jobs components-notice is-${ saveSettingsStatus }` }>
								<div className="connectoor-jobs components-notice__content">
									{ saveSettingsMessage }
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

		const settings = new api.models.Settings(
			{
				_connectoor_jobs_branding_color: brandingColor,
			}
		);

		this.setState( {
			saveSettingsIsLoading: true,
			settingsSaved: false,
			saveSettingsStatus: '',
			saveSettingsMessage: '',
		} );

		settings.save().then(
			() => {
				this.setState(
					{
						saveSettingsIsLoading: false,
						settingsSaved: true,
						saveSettingsStatus: 'success',
						saveSettingsMessage: __( 'Settings saved', 'connectoor-jobs' ),
					}
				);
			}
		).catch(
			() => {
				this.setState(
					{
						saveSettingsIsLoading: false,
						settingsSaved: true,
						saveSettingsStatus: 'error',
						saveSettingsMessage: __( 'Settings could not be saved', 'connectoor-jobs' ),
					}
				);
			}
		)
	}
}

document.addEventListener(
	'DOMContentLoaded', () => {
		const htmlOutput = document.getElementById( 'connectoor-jobs-settings' );

		if ( htmlOutput ) {
			createRoot( htmlOutput ).render( <App/> );
		}
	}
);
