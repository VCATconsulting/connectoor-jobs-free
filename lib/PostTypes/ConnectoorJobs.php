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
	 * Function for hooks
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
					'name'                  => __( 'Connectoor Jobs', 'connectoor-jobs' ),
					'singular_name'         => __( 'Connectoor Job', 'connectoor-jobs' ),
					'all_items'             => __( 'All Connectoor Jobs', 'connectoor-jobs' ),
					'archives'              => __( 'Connectoor Jobs Archives', 'connectoor-jobs' ),
					'attributes'            => __( 'Connectoor Jobs Attributes', 'connectoor-jobs' ),
					'insert_into_item'      => __( 'Insert into Connectoor Jobs', 'connectoor-jobs' ),
					'uploaded_to_this_item' => __( 'Uploaded to this Connectoor Jobs', 'connectoor-jobs' ),
					'featured_image'        => _x( 'Featured Image', 'connectoor-jobs', 'connectoor-jobs' ),
					'set_featured_image'    => _x( 'Set featured image', 'connectoor-jobs', 'connectoor-jobs' ),
					'remove_featured_image' => _x( 'Remove featured image', 'connectoor-jobs', 'connectoor-jobs' ),
					'use_featured_image'    => _x( 'Use as featured image', 'connectoor-jobs', 'connectoor-jobs' ),
					'filter_items_list'     => __( 'Filter Connectoor Jobs list', 'connectoor-jobs' ),
					'items_list_navigation' => __( 'Connectoor Jobs list navigation', 'connectoor-jobs' ),
					'items_list'            => __( 'Connectoor Jobs list', 'connectoor-jobs' ),
					'new_item'              => __( 'New Connectoor Jobs', 'connectoor-jobs' ),
					'add_new'               => __( 'Add New', 'connectoor-jobs' ),
					'add_new_item'          => __( 'Add New Connectoor Jobs', 'connectoor-jobs' ),
					'edit_item'             => __( 'Edit Connectoor Jobs', 'connectoor-jobs' ),
					'view_item'             => __( 'View Connectoor Jobs', 'connectoor-jobs' ),
					'view_items'            => __( 'View Connectoor Jobs', 'connectoor-jobs' ),
					'search_items'          => __( 'Search Connectoor Jobs', 'connectoor-jobs' ),
					'not_found'             => __( 'No Connectoor Jobs found', 'connectoor-jobs' ),
					'not_found_in_trash'    => __( 'No Connectoor Jobs found in trash', 'connectoor-jobs' ),
					'parent_item_colon'     => __( 'Parent Connectoor Jobs:', 'connectoor-jobs' ),
					'menu_name'             => __( 'Connectoor Jobs', 'connectoor-jobs' ),
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
					'revisions',
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
			1  => sprintf( __( 'Connectoor Jobs updated. <a target="_blank" href="%s">View Connectoor Jobs</a>', 'connectoor-jobs' ), esc_url( $permalink ) ),
			2  => __( 'Custom field updated.', 'connectoor-jobs' ),
			3  => __( 'Custom field deleted.', 'connectoor-jobs' ),
			4  => __( 'Connectoor Jobs updated.', 'connectoor-jobs' ),
			/* translators: %s: date and time of the revision */
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'Connectoor Jobs restored to revision from %s', 'connectoor-jobs' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Safe usage: only reading 'revision' ID from URL in admin context, no action performed.
			/* translators: %s: post permalink */
			6  => sprintf( __( 'Connectoor Jobs published. <a href="%s">View Connectoor Jobs</a>', 'connectoor-jobs' ), esc_url( $permalink ) ),
			7  => __( 'Connectoor Jobs saved.', 'connectoor-jobs' ),
			/* translators: %s: post permalink */
			8  => sprintf( __( 'Connectoor Jobs submitted. <a target="_blank" href="%s">Preview Connectoor Jobs</a>', 'connectoor-jobs' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
			/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
			9  => sprintf( __( 'Connectoor Jobs scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Connectoor Jobs</a>', 'connectoor-jobs' ), date_i18n( __( 'M j, Y @ G:i', 'connectoor-jobs' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
			/* translators: %s: post permalink */
			10 => sprintf( __( 'Connectoor Jobs draft updated. <a target="_blank" href="%s">Preview Connectoor Jobs</a>', 'connectoor-jobs' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
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
			'updated'   => _n( '%s Connectoor Jobs updated.', '%s Connectoor Jobs updated.', $bulk_counts['updated'], 'connectoor-jobs' ),
			'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Connectoor Job not updated, somebody is editing it.', 'connectoor-jobs' ) :
				/* translators: %s: Number of connectoor Jobs. */
				_n( '%s Connectoor Jobs not updated, somebody is editing it.', '%s Connectoor Jobs not updated, somebody is editing them.', $bulk_counts['locked'], 'connectoor-jobs' ),
			/* translators: %s: Number of connectoor Jobs. */
			'deleted'   => _n( '%s Connectoor Jobs permanently deleted.', '%s Connectoor Jobs permanently deleted.', $bulk_counts['deleted'], 'connectoor-jobs' ),
			/* translators: %s: Number of connectoor Jobs. */
			'trashed'   => _n( '%s Connectoor Jobs moved to the Trash.', '%s Connectoor Jobs moved to the Trash.', $bulk_counts['trashed'], 'connectoor-jobs' ),
			/* translators: %s: Number of connectoor Jobs. */
			'untrashed' => _n( '%s Connectoor Jobs restored from the Trash.', '%s Connectoor Jobs restored from the Trash.', $bulk_counts['untrashed'], 'connectoor-jobs' ),
		];

		return $bulk_messages;
	}
}
