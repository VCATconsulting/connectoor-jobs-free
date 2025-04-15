<?php
/**
 * Connectoor Jobs
 *
 * @package connectoor-jobs
 * @author  VCAT Consulting GmbH - Team WordPress
 * @license GPLv3
 *
 * @wordpress-plugin
 * Plugin Name: Connectoor Jobs
 * Plugin URI: https://github.com/VCATconsulting/connectoor-jobs
 * Description: Plugin for creating jobs in WordPress
 * Version: 1.2.5
 * Author: VCAT Consulting GmbH - Team WordPress
 * Author URI: https://www.vcat.de
 * Text Domain: connectoor-jobs
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CONNECTOOR_JOBS_VERSION', '1.2.5' );
define( 'CONNECTOOR_JOBS_FILE', __FILE__ );
define( 'CONNECTOOR_JOBS_PATH', plugin_dir_path( CONNECTOOR_JOBS_FILE ) );
define( 'CONNECTOOR_JOBS_URL', plugin_dir_url( CONNECTOOR_JOBS_FILE ) );

// The pre_init functions check the compatibility of the plugin and calls the init function, if check were successful.
connectoor_jobs_pre_init();

/**
 * Pre init function to check the plugins compatibility.
 */
function connectoor_jobs_pre_init() {

	// Check, if the min. required PHP version is available and if not, show an admin notice.
	if ( version_compare( PHP_VERSION, '7.4', '<' ) ) {
		add_action( 'admin_notices', 'connectoor_jobs_min_php_version_error' );

		// Stop the further processing of the plugin.
		return;
	}

	if ( file_exists( CONNECTOOR_JOBS_PATH . 'composer.json' ) && ! file_exists( CONNECTOOR_JOBS_PATH . 'vendor/autoload.php' ) ) {
		add_action( 'admin_notices', 'connectoor_jobs_autoloader_missing' );

		// Stop the further processing of the plugin.
		return;
	} else {
		$autoloader = CONNECTOOR_JOBS_PATH . 'vendor/autoload.php';

		if ( is_readable( $autoloader ) ) {
			include $autoloader;
		}
	}

	// If all checks were successful, load the plugin.
	require_once CONNECTOOR_JOBS_PATH . 'lib/load.php';
}

/**
 * Show a admin notice error message, if the PHP version is too low
 */
function connectoor_jobs_min_php_version_error() {
	echo '<div class="error"><p>';
	esc_html_e( 'Connectoor Jobs requires PHP version 7.4 or higher to function properly. Please upgrade PHP or deactivate Connectoor Jobs.', 'connectoor-jobs' );
	echo '</p></div>';
}

/**
 * Show a admin notice error message, if the PHP version is too low
 */
function connectoor_jobs_autoloader_missing() {
	echo '<div class="error"><p>';
	esc_html_e( 'Connectoor Jobs is missing the Composer autoloader file. Please run `composer install --no-dev -o` in the root folder of the plugin or use a release version including the `vendor` folder.', 'connectoor-jobs' );
	echo '</p></div>';
}
