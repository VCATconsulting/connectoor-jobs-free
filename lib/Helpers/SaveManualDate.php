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
		add_action( 'admin_init', [ $this, 'maybe_migrate_raw_dates' ] );
		add_action( 'save_post_connectoor_jobs', [ $this, 'save_raw_date' ], 10, 3 );
	}


	/**
	 * Save the raw date if missing for existing jobs.
	 * 1. Check if the migration is complete.
	 * 2. Check if the migration is locked.
	 * 3. Get the list of jobs that need to be migrated.
	 * 4. Update the raw date for each job.
	 * 5. Delete the migration lock.
	 * 6. Delete the migration complete option.
	 */
	public function maybe_migrate_raw_dates() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( get_option( '_connectoor_jobs_raw_date_migration_complete' ) ) {
			return;
		}

		if ( get_transient( 'connectoor_jobs_raw_date_migration_lock' ) ) {
			return;
		}

		set_transient( 'connectoor_jobs_raw_date_migration_lock', 1, MINUTE_IN_SECONDS );

		$job_ids = get_posts(
			[
				'post_type'      => 'connectoor_jobs',
				'post_status'    => 'publish',
				'fields'         => 'ids',
				'posts_per_page' => 50,
				'meta_query'     => [
					'relation' => 'OR',
					[
						'key'     => '_connectoor_jobs_begin_raw',
						'compare' => 'NOT EXISTS',
					],
					[
						'key'     => '_connectoor_jobs_begin_raw',
						'value'   => '',
						'compare' => '=',
					],
					[
						'key'     => '_connectoor_jobs_deadline_raw',
						'compare' => 'NOT EXISTS',
					],
					[
						'key'     => '_connectoor_jobs_deadline_raw',
						'value'   => '',
						'compare' => '=',
					],
				],
			]
		);

		if ( empty( $job_ids ) ) {
			update_option( '_connectoor_jobs_raw_date_migration_complete', time(), false );
			delete_transient( 'connectoor_jobs_raw_date_migration_lock' );
			return;
		}

		foreach ( $job_ids as $job_id ) {
			$post = get_post( $job_id );

			if ( $post instanceof \WP_Post ) {
				$this->save_raw_date( $job_id, $post, true );
			}
		}

		/*
		 * Delete the option after the migration is complete.
		 */
		delete_option( '_connectoor_jobs_raw_date_migration_complete' );
		delete_transient( 'connectoor_jobs_raw_date_migration_lock' );
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
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		$begin_date    = get_post_meta( $post_id, '_connectoor_jobs_begin', true );
		$deadline_date = get_post_meta( $post_id, '_connectoor_jobs_deadline', true );

		if ( ! empty( $begin_date ) ) {
			$timestamp = strtotime( $begin_date );
			if ( false !== $timestamp ) {
				update_post_meta( $post_id, '_connectoor_jobs_begin_raw', (string) absint( $timestamp ) );
			}
		}

		if ( ! empty( $deadline_date ) ) {
			$timestamp = strtotime( $deadline_date );
			if ( false !== $timestamp ) {
				update_post_meta( $post_id, '_connectoor_jobs_deadline_raw', (string) absint( $timestamp ) );
			}
		}

		return $post_id;
	}
}
