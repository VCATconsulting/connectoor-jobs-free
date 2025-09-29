<?php
/**
 * Save raw date when job is created manuel.
 *
 * @package CONNECTOOR_JOBS\Helpers
 */

namespace CONNECTOOR_JOBS\Helpers;

/**
 * Class SaveManualDate
 */
class SaveManualDate {

	/**
	 * Initialize the helper
	 */
	public function init() {
		add_action( 'admin_init', [ $this, 'save_raw_date_empty' ] );
		add_action( 'save_post_connectoor_jobs', [ $this, 'save_raw_date' ], 10, 3 );
	}


	/**
	 * Save the raw date if missing for existing jobs.
	 */
	public function save_raw_date_empty() {
		$jobs = get_posts(
			[
				'post_type'      => 'connectoor_jobs',
				'post_status'    => 'publish',
				'posts_per_page' => - 1,
				'meta_query'     => [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
					'relation' => 'OR',
					[
						'relation' => 'OR',
						[
							'key'     => '_connectoor_jobs_begin_raw',
							'value'   => '',
							'compare' => '=',
						],
						[
							'key'     => '_connectoor_jobs_begin_raw',
							'compare' => 'NOT EXISTS',
						],
					],
					[
						'relation' => 'OR',
						[
							'key'     => '_connectoor_jobs_deadline_raw',
							'value'   => '',
							'compare' => '=',
						],
						[
							'key'     => '_connectoor_jobs_deadline_raw',
							'compare' => 'NOT EXISTS',
						],
					],
				],
			]
		);

		if ( ! empty( $jobs ) ) {
			foreach ( $jobs as $job ) {
				$this->save_raw_date( $job->ID, $job, true );
			}
		}
	}

	/**
	 * Save the raw date when job is created manuel.
	 *
	 * @param int      $post_id The post ID.
	 * @param \WP_Post $post The post object.
	 * @param bool     $update Whether this is an existing post being updated or not.
	 *
	 * @return int
	 */
	public function save_raw_date( $post_id, $post, $update ) {
		$begin_date    = get_post_meta( $post_id, '_connectoor_jobs_begin', true );
		$deadline_date = get_post_meta( $post_id, '_connectoor_jobs_deadline', true );
		if ( ! empty( $begin_date ) ) {
			$timestamp = strtotime( $begin_date );
			update_post_meta( $post_id, '_connectoor_jobs_begin_raw', sanitize_text_field( $timestamp ) );
		}
		if ( ! empty( $deadline_date ) ) {
			$timestamp = strtotime( $deadline_date );
			update_post_meta( $post_id, '_connectoor_jobs_deadline_raw', sanitize_text_field( $timestamp ) );
		}

		return $post_id;
	}
}
