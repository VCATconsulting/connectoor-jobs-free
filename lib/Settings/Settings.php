<?php
/**
 * Class Settings
 *
 * @package CONNECTOOR_JOBS\Settings
 */

namespace CONNECTOOR_JOBS\Settings;

/**
 * Class Settings
 */
class Settings {
	/**
	 * Constructor.
	 *
	 * @since 4.7.0
	 */
	public function __construct() {
	}

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_plugin_settings' ] );
		add_action( 'admin_menu', [ $this, 'add_options_page' ] );
	}

	/**
	 * Add the settings, sections and fields.
	 */
	public function register_plugin_settings() {
		register_setting(
			'connectoor_jobs-brand-settings',
			'_connectoor_jobs_branding_color',
			[
				'default'      => '',
				'show_in_rest' => true,
				'type'         => 'string',
			]
		);
	}

	/**
	 * Add an option page for the settings
	 */
	public function add_options_page() {
		add_options_page(
			__( 'Connectoor Jobs Settings', 'connectoor-jobs-free' ),
			__( 'Connectoor Jobs Settings', 'connectoor-jobs-free' ),
			'manage_options',
			'connectoor-jobs-settings',
			[ $this, 'options_page' ]
		);
	}

	/**
	 * Render the options page
	 */
	public function options_page() {
		?>
		<div id="connectoor-jobs-settings"></div>
		<?php
	}
}
