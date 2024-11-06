<?php
/**
 * File for PostType 'connectoor_jobs'
 *
 * @package CONNECTOOR_JOBS\PostTypes
 */

namespace CONNECTOOR_JOBS\PostTypes;

/**
 * Class ConnectoorJobs
 */
class ConnectoorJobs {
	/**
	 * Initialize the helper
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_filter( 'post_updated_messages', [ $this, 'updated_messages' ] );
		add_filter( 'bulk_post_updated_messages', [ $this, 'bulk_post_updated_messages' ], 10, 2 );
	}

	/**
	 * Registers the `connectoor_jobs` post type
	 */
	public function register_post_type() {
		register_post_type(
			'connectoor_jobs',
			[
				'labels'                => [
					'name'                  => __( 'Connectoor Jobs', 'connectoor-jobs-free' ),
					'singular_name'         => __( 'Connectoor Job', 'connectoor-jobs-free' ),
					'all_items'             => __( 'All Connectoor Jobs', 'connectoor-jobs-free' ),
					'archives'              => __( 'Connectoor Jobs Archives', 'connectoor-jobs-free' ),
					'attributes'            => __( 'Connectoor Jobs Attributes', 'connectoor-jobs-free' ),
					'insert_into_item'      => __( 'Insert into Connectoor Jobs', 'connectoor-jobs-free' ),
					'uploaded_to_this_item' => __( 'Uploaded to this Connectoor Jobs', 'connectoor-jobs-free' ),
					'featured_image'        => _x( 'Featured Image', 'connectoor-jobs-free', 'connectoor-jobs-free' ),
					'set_featured_image'    => _x( 'Set featured image', 'connectoor-jobs-free', 'connectoor-jobs-free' ),
					'remove_featured_image' => _x( 'Remove featured image', 'connectoor-jobs-free', 'connectoor-jobs-free' ),
					'use_featured_image'    => _x( 'Use as featured image', 'connectoor-jobs-free', 'connectoor-jobs-free' ),
					'filter_items_list'     => __( 'Filter Connectoor Jobs list', 'connectoor-jobs-free' ),
					'items_list_navigation' => __( 'Connectoor Jobs list navigation', 'connectoor-jobs-free' ),
					'items_list'            => __( 'Connectoor Jobs list', 'connectoor-jobs-free' ),
					'new_item'              => __( 'New Connectoor Jobs', 'connectoor-jobs-free' ),
					'add_new'               => __( 'Add New', 'connectoor-jobs-free' ),
					'add_new_item'          => __( 'Add New Connectoor Jobs', 'connectoor-jobs-free' ),
					'edit_item'             => __( 'Edit Connectoor Jobs', 'connectoor-jobs-free' ),
					'view_item'             => __( 'View Connectoor Jobs', 'connectoor-jobs-free' ),
					'view_items'            => __( 'View Connectoor Jobs', 'connectoor-jobs-free' ),
					'search_items'          => __( 'Search Connectoor Jobs', 'connectoor-jobs-free' ),
					'not_found'             => __( 'No Connectoor Jobs found', 'connectoor-jobs-free' ),
					'not_found_in_trash'    => __( 'No Connectoor Jobs found in trash', 'connectoor-jobs-free' ),
					'parent_item_colon'     => __( 'Parent Connectoor Jobs:', 'connectoor-jobs-free' ),
					'menu_name'             => __( 'Connectoor Jobs', 'connectoor-jobs-free' ),
				],
				'public'                => true,
				'hierarchical'          => true,
				'show_ui'               => true,
				'show_in_nav_menus'     => true,
				'supports'              => [
					'title',
					'editor',
					'author',
					'thumbnail',
					'excerpt',
					'custom-fields',
				],
				'has_archive'           => true,
				'rewrite'               => [ 'slug' => 'jobs' ],
				'query_var'             => true,
				'menu_position'         => null,
				'menu_icon'             => 'dashicons-businessperson',
				'show_in_rest'          => true,
				'rest_base'             => 'connectoor_jobs',
				'rest_controller_class' => 'WP_REST_Posts_Controller',
				'template'              => [
					[
						'core/pattern',
						[ 'slug' => 'connectoor-jobs/job-apply-button' ],
					],
				],
			]
		);
	}

	/**
	 * Sets the post updated messages for the `connectoor_jobs` post type.
	 *
	 * @param array $messages Post updated messages.
	 *
	 * @return array Messages for the `connectoor_jobs` post type.
	 */
	public function updated_messages( $messages ) {
		global $post;

		$permalink = get_permalink( $post );

		$messages['connectoor_jobs'] = [
			0  => '',
			// Unused. Messages start at index 1.
			/* translators: %s: post permalink */
			1  => sprintf( __( 'Connectoor Jobs updated. <a target="_blank" href="%s">View Connectoor Jobs</a>', 'connectoor-jobs-free' ), esc_url( $permalink ) ),
			2  => __( 'Custom field updated.', 'connectoor-jobs-free' ),
			3  => __( 'Custom field deleted.', 'connectoor-jobs-free' ),
			4  => __( 'Connectoor Jobs updated.', 'connectoor-jobs-free' ),
			/* translators: %s: date and time of the revision */
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'Connectoor Jobs restored to revision from %s', 'connectoor-jobs-free' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			// phpcs:ignore WordPress.Security.NonceVerification.Recommended
			/* translators: %s: post permalink */
			6  => sprintf( __( 'Connectoor Jobs published. <a href="%s">View Connectoor Jobs</a>', 'connectoor-jobs-free' ), esc_url( $permalink ) ),
			7  => __( 'Connectoor Jobs saved.', 'connectoor-jobs-free' ),
			/* translators: %s: post permalink */
			8  => sprintf( __( 'Connectoor Jobs submitted. <a target="_blank" href="%s">Preview Connectoor Jobs</a>', 'connectoor-jobs-free' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
			/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
			9  => sprintf( __( 'Connectoor Jobs scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Connectoor Jobs</a>', 'connectoor-jobs-free' ), date_i18n( __( 'M j, Y @ G:i', 'connectoor-jobs-free' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
			/* translators: %s: post permalink */
			10 => sprintf( __( 'Connectoor Jobs draft updated. <a target="_blank" href="%s">Preview Connectoor Jobs</a>', 'connectoor-jobs-free' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		];

		return $messages;
	}

	/**
	 * Sets the bulk post updated messages for the `connectoor_jobs` post type.
	 *
	 * @param array[] $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
	 *                               keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
	 * @param int[]   $bulk_counts Array of item counts for each message, used to build internationalized strings.
	 */
	public function bulk_post_updated_messages( $bulk_messages, $bulk_counts ) {
		$bulk_messages['connectoor_jobs'] = [
			/* translators: %s: Number of questions. */
			'updated'   => _n( '%s Connectoor Jobs updated.', '%s Connectoor Jobs updated.', $bulk_counts['updated'], 'connectoor-jobs-free' ),
			'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Connectoor Job not updated, somebody is editing it.', 'connectoor-jobs-free' ) :
				/* translators: %s: Number of connectoor Jobs. */
				_n( '%s Connectoor Jobs not updated, somebody is editing it.', '%s Connectoor Jobs not updated, somebody is editing them.', $bulk_counts['locked'], 'connectoor-jobs-free' ),
			/* translators: %s: Number of connectoor Jobs. */
			'deleted'   => _n( '%s Connectoor Jobs permanently deleted.', '%s Connectoor Jobs permanently deleted.', $bulk_counts['deleted'], 'connectoor-jobs-free' ),
			/* translators: %s: Number of connectoor Jobs. */
			'trashed'   => _n( '%s Connectoor Jobs moved to the Trash.', '%s Connectoor Jobs moved to the Trash.', $bulk_counts['trashed'], 'connectoor-jobs-free' ),
			/* translators: %s: Number of connectoor Jobs. */
			'untrashed' => _n( '%s Connectoor Jobs restored from the Trash.', '%s Connectoor Jobs restored from the Trash.', $bulk_counts['untrashed'], 'connectoor-jobs-free' ),
		];

		return $bulk_messages;
	}
}
