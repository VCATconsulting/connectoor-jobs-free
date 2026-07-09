<?php
/**
 * Class to register client-side assets (scripts and stylesheets) for the Gutenberg block.
 *
 * @package CONNECTOR_JOBS\PostMeta
 */

namespace CONNECTOOR_JOBS\PostMeta;

/**
 * Class JobMeta
 */
class JobMeta {
	/**
	 * Initialize the helper
	 */
	public function init() {
		add_action( 'init', [ $this, 'connectoor_jobs_post_meta' ] );
	}

	/**
	 * Add post meta to 'connector_jobs' post type.
	 */
	public function connectoor_jobs_post_meta() {
		$metafields = [
			'_connectoor_jobs_begin'               => 'sanitize_text_field',
			'_connectoor_jobs_begin_raw'           => 'sanitize_text_field',
			'_connectoor_jobs_intern_title'        => 'sanitize_text_field',
			'_connectoor_jobs_referencenumber'     => 'sanitize_text_field',
			'_connectoor_jobs_sourcename'          => 'sanitize_text_field',
			'_connectoor_jobs_company'             => 'sanitize_text_field',
			'_connectoor_jobs_location_address'    => 'sanitize_text_field',
			'_connectoor_jobs_url'                 => 'esc_url_raw',
			'_connectoor_jobs_apply_url'           => 'esc_url_raw',
			'_connectoor_jobs_email'               => 'sanitize_email',
			'_connectoor_jobs_city'                => 'sanitize_text_field',
			'_connectoor_jobs_state'               => 'sanitize_text_field',
			'_connectoor_jobs_postalcode'          => 'sanitize_text_field',
			'_connectoor_jobs_country'             => 'sanitize_text_field',
			'_connectoor_jobs_deadline'            => 'sanitize_text_field',
			'_connectoor_jobs_deadline_raw'        => 'sanitize_text_field',
			'_connectoor_jobs_jobtype'             => 'sanitize_text_field',
			'_connectoor_jobs_employment_duration' => 'sanitize_text_field',
			'_connectoor_jobs_experience'          => 'sanitize_text_field',
		];

		foreach ( $metafields as $metafield => $sanitize_callback ) {
			register_post_meta(
				'connectoor_jobs',
				$metafield,
				[
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => 'string',
					'sanitize_callback' => $sanitize_callback,
					'auth_callback'     => function ( $allowed, $meta_key, $post_id ) {
						return current_user_can( 'edit_post', $post_id );
					},
				]
			);
		}

		$metafields_toggle = [
			'_connectoor_jobs_deadline_visible',
		];

		foreach ( $metafields_toggle as $metafield_toggle ) {
			register_post_meta(
				'connectoor_jobs',
				$metafield_toggle,
				[
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => 'boolean',
					'sanitize_callback' => 'rest_sanitize_boolean',
					'auth_callback'     => function ( $allowed, $meta_key, $post_id ) {
						return current_user_can( 'edit_post', $post_id );
					},
				]
			);
		}
	}
}
