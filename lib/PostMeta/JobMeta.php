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
			'_connectoor_jobs_begin',
			'_connectoor_jobs_intern_title',
			'_connectoor_jobs_referencenumber',
			'_connectoor_jobs_sourcename',
			'_connectoor_jobs_company',
			'_connectoor_jobs_location_address',
			'_connectoor_jobs_url',
			'_connectoor_jobs_apply_url',
			'_connectoor_jobs_email',
			'_connectoor_jobs_city',
			'_connectoor_jobs_state',
			'_connectoor_jobs_postalcode',
			'_connectoor_jobs_country',
			'_connectoor_jobs_deadline',
			'_connectoor_jobs_deadline_visible',
			'_connectoor_jobs_jobtype',
			'_connectoor_jobs_employment_duration',
			'_connectoor_jobs_experience',
		];

		foreach ( $metafields as $metafield ) {
			register_post_meta(
				'connectoor_jobs',
				$metafield,
				[
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => 'string',
					'sanitize_callback' => 'sanitize_text_field',
					'auth_callback'     => function () {
						return current_user_can( 'edit_posts' );
					},
				]
			);
		}
	}
}
