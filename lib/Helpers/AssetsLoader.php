<?php
/**
 * Class to register client-side assets (scripts and stylesheets) for the Gutenberg block.
 *
 * @package CONNECTOOR_JOBS\Helpers
 */

namespace CONNECTOOR_JOBS\Helpers;

/**
 * Class AssetsLoader
 */
class AssetsLoader {
	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in the corresponding context.
	 *
	 * @see https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type/#enqueuing-block-scripts
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ], 10 );
		add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 10 );
		add_action( 'wp_enqueue_scripts', [ $this, 'dynamic_css' ], 10 );
		add_action( 'admin_enqueue_scripts', [ $this, 'wp_enqueue_admin_scripts' ] );
	}

	/**
	 * Register the assets for all blocks.
	 */
	public function register_assets() {
		$block_editor_assets_path  = 'build/index.asset.php';
		$frontend_assets_path      = 'build/frontend.asset.php';
		$block_editor_scripts_path = 'build/index.js';
		$frontend_scripts_path     = 'build/frontend.js';
		$block_editor_style_path   = 'build/index.css';
		$frontend_style_path       = 'build/frontend.css';
		$admin_asset_path          = 'build/admin.asset.php';
		$admin_style_path          = 'build/admin.css';
		$admin_scripts_path        = 'build/admin.js';

		if ( file_exists( CONNECTOOR_JOBS_PATH . $block_editor_assets_path ) ) {
			$block_editor_asset = require CONNECTOOR_JOBS_PATH . $block_editor_assets_path;
		} else {
			$block_editor_asset = [
				'dependencies' => [
					'wp-i18n',
					'wp-element',
					'wp-blocks',
					'wp-components',
					'wp-editor',
					'wp-polyfill',
				],
				'version'      => CONNECTOOR_JOBS_VERSION,
			];
		}

		if ( file_exists( CONNECTOOR_JOBS_PATH . $frontend_assets_path ) ) {
			$frontend_asset = require CONNECTOOR_JOBS_PATH . $frontend_assets_path;
		} else {
			$frontend_asset = [
				'dependencies' => [],
				'version'      => CONNECTOOR_JOBS_VERSION,
			];
		}

		if ( file_exists( CONNECTOOR_JOBS_PATH . $admin_asset_path ) ) {
			$admin_asset = require CONNECTOOR_JOBS_PATH . $admin_asset_path;
		} else {
			$admin_asset = [
				'dependencies' => [],
				'version'      => CONNECTOOR_JOBS_VERSION,
			];
		}

		// Register the bundled block JS file.
		if ( file_exists( CONNECTOOR_JOBS_PATH . $block_editor_scripts_path ) ) {
			wp_register_script(
				'connectoor-jobs-editor',
				CONNECTOOR_JOBS_URL . $block_editor_scripts_path,
				$block_editor_asset['dependencies'],
				$block_editor_asset['version'],
				true
			);
		}

		// Register optional editor only styles.
		if ( file_exists( CONNECTOOR_JOBS_PATH . $block_editor_style_path ) ) {
			wp_register_style(
				'connectoor-jobs-editor',
				CONNECTOOR_JOBS_URL . $block_editor_style_path,
				[],
				$block_editor_asset['version']
			);
		}

		// Register optional frontend only JS file.
		if ( file_exists( CONNECTOOR_JOBS_PATH . $frontend_scripts_path ) ) {
			wp_register_script(
				'connectoor-jobs-frontend',
				CONNECTOOR_JOBS_URL . $frontend_scripts_path,
				$frontend_asset['dependencies'],
				$frontend_asset['version'],
				true
			);
		}

		// Register optional frontend only styles.
		if ( file_exists( CONNECTOOR_JOBS_PATH . $frontend_style_path ) ) {
			wp_register_style(
				'connectoor-jobs-frontend',
				CONNECTOOR_JOBS_URL . $frontend_style_path,
				[],
				$frontend_asset['version']
			);
		}

		if ( file_exists( CONNECTOOR_JOBS_PATH . $admin_style_path ) ) {
			wp_register_style(
				'connectoor-jobs-admin-settings',
				CONNECTOOR_JOBS_URL . $admin_style_path,
				[ 'wp-components' ],
				$admin_asset['version'],
			);
		}

		if ( file_exists( CONNECTOOR_JOBS_PATH . $admin_scripts_path ) ) {
			wp_register_script(
				'connectoor-jobs-admin-settings',
				CONNECTOOR_JOBS_URL . $admin_scripts_path,
				$admin_asset['dependencies'],
				$admin_asset['version'],
				true
			);
		}

		wp_set_script_translations( 'connectoor-jobs-frontend', 'connectoor-jobs', plugin_dir_path( CONNECTOOR_JOBS_FILE ) . 'languages' );
		wp_set_script_translations( 'connectoor-jobs-editor', 'connectoor-jobs', plugin_dir_path( CONNECTOOR_JOBS_FILE ) . 'languages' );
		wp_set_script_translations( 'connectoor-jobs-admin-settings', 'connectoor-jobs', plugin_dir_path( CONNECTOOR_JOBS_FILE ) . 'languages' );
	}

	/**
	 * Add dynamic CSS to the frontend and admin settings page.
	 */
	public function dynamic_css() {
		/*
		 * Get the branding color from the settings.
		 */
		$branding_color = $this->sanitize_hex_color_8( get_option( '_connectoor_jobs_branding_color' ) );

		if ( ! $branding_color ) {
			$branding_color = sanitize_hex_color( '#0073aa' );
		}

		/*
		 * Create css variable for branding color.
		 */
		$custom_css = sprintf(
		// Translators: %s is the branding color.
			esc_html( ':root { --connectoor-jobs-branding-color: %s; }' ),
			esc_attr( $branding_color )
		);

		/*
		 * Add the css to the frontend and admin settings page.
		 */
		wp_add_inline_style( 'connectoor-jobs-frontend', $custom_css );
		wp_add_inline_style( 'connectoor-jobs-admin-settings', $custom_css );
	}

	/**
	 * Sanitizes a hex color including 8-digit (with alpha).
	 *
	 * @param string|null $color Color to sanitize.
	 *
	 * @return string|null Sanitized color (like '#rrggbbaa') or null if not valid.
	 */
	private function sanitize_hex_color_8( $color ) {
		if ( ! is_string( $color ) ) {
			return null;
		}
		$color = trim( $color );

		// Accept 8-digit.
		if ( preg_match( '/^#([A-Fa-f0-9]{8})$/', $color ) ) {
			return strtolower( $color );
		}

		// Accept 4-digit (#RGBA) -> expand to 8-digit.
		if ( preg_match( '/^#([A-Fa-f0-9]{4})$/', $color, $m ) ) {
			$r = $m[1][0];
			$g = $m[1][1];
			$b = $m[1][2];
			$a = $m[1][3];
			return strtolower( "#{$r}{$r}{$g}{$g}{$b}{$b}{$a}{$a}" );
		}

		// Fallback: 6/3-digit via core (no alpha).
		if ( function_exists( 'sanitize_hex_color' ) ) {
			$hex = sanitize_hex_color( $color ); // returns '#rrggbb' or null.
			return $hex ? $hex : null;
		}

		return null;
	}

	/**
	 * Enqueue the block editor assets.
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_script( 'connectoor-jobs-editor' );
		wp_enqueue_style( 'connectoor-jobs-editor' );
		wp_enqueue_script( 'jquery' );
	}

	/**
	 * Enqueue the frontend assets.
	 */
	public function wp_enqueue_scripts() {
		wp_enqueue_script( 'connectoor-jobs-frontend' );
		wp_enqueue_style( 'connectoor-jobs-frontend' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui-autocomplete' );
	}

	/**
	 * Enqueue the frontend assets.
	 */
	public function wp_enqueue_admin_scripts() {
		wp_enqueue_script( 'connectoor-jobs-admin-settings' );
		wp_enqueue_style( 'connectoor-jobs-admin-settings' );
		$this->dynamic_css();
	}
}
