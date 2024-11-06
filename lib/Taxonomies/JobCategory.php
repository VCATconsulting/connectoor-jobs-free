<?php
/**
 * Custom Taxonomy Job Category
 *
 * @package CONNECTOOR_JOBS\Taxonomies
 */

namespace CONNECTOOR_JOBS\Taxonomies;

/**
 * Class JobCategory
 */
class JobCategory {
	/**
	 * Register the custom taxonomy and it's update messages
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_taxonomy' ] );
		add_filter( 'term_updated_messages', [ $this, 'updated_messages' ] );
	}

	/**
	 *
	 * Registers the `connectoor_tax_job_category Category` taxonomy for use with 'connectoor-jobs-free'.
	 */
	public function register_taxonomy() {
		register_taxonomy(
			'connectoor_tax_job_category',
			[ 'connectoor_jobs' ],
			[
				'hierarchical'      => true,
				'public'            => true,
				'show_in_nav_menus' => true,
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => [ 'slug' => 'job-category' ],
				'capabilities'      => [
					'manage_terms' => 'edit_posts',
					'edit_terms'   => 'edit_posts',
					'delete_terms' => 'edit_posts',
					'assign_terms' => 'edit_posts',
				],
				'labels'            => [
					'name'                       => __( 'Job Categories', 'connectoor-jobs-free' ),
					'singular_name'              => _x( 'Job Category', 'taxonomy general name', 'connectoor-jobs-free' ),
					'search_items'               => __( 'Search Job Categories', 'connectoor-jobs-free' ),
					'popular_items'              => __( 'Popular Job Categories', 'connectoor-jobs-free' ),
					'all_items'                  => __( 'All Job Categories', 'connectoor-jobs-free' ),
					'parent_item'                => __( 'Parent Job Category', 'connectoor-jobs-free' ),
					'parent_item_colon'          => __( 'Parent Job Category:', 'connectoor-jobs-free' ),
					'edit_item'                  => __( 'Edit Job Category', 'connectoor-jobs-free' ),
					'update_item'                => __( 'Update Job Category', 'connectoor-jobs-free' ),
					'view_item'                  => __( 'View Job Category', 'connectoor-jobs-free' ),
					'add_new_item'               => __( 'Add New Job Category', 'connectoor-jobs-free' ),
					'new_item_name'              => __( 'New Job Category', 'connectoor-jobs-free' ),
					'separate_items_with_commas' => __( 'Separate Job Categories with commas', 'connectoor-jobs-free' ),
					'add_or_remove_items'        => __( 'Add or remove Job Categories', 'connectoor-jobs-free' ),
					'choose_from_most_used'      => __( 'Choose from the most used Job Categories', 'connectoor-jobs-free' ),
					'not_found'                  => __( 'No Job Categories found.', 'connectoor-jobs-free' ),
					'no_terms'                   => __( 'No Job Categories', 'connectoor-jobs-free' ),
					'menu_name'                  => __( 'Job Categories', 'connectoor-jobs-free' ),
					'items_list_navigation'      => __( 'Job Categories list navigation', 'connectoor-jobs-free' ),
					'items_list'                 => __( 'Job Categories list', 'connectoor-jobs-free' ),
					'most_used'                  => _x( 'Most Used', 'Job Category', 'connectoor-jobs-free' ),
					'back_to_items'              => __( '&larr; Back to Job Categories', 'connectoor-jobs-free' ),
				],
				'show_in_rest'      => true,
				'rest_base'         => 'connectoor_tax_job_category',
			]
		);
	}

	/**
	 * Sets the post updated messages for the `connectoor_tax_job_category Category` taxonomy.
	 *
	 * @param array $messages Post updated messages.
	 *
	 * @return array Messages for the `connectoor_tax_job_category Category` taxonomy.
	 */
	public function updated_messages( $messages ) {
		$messages['connectoor_tax_job_category Category'] = [
			0 => '', // Unused. Messages start at index 1.
			1 => __( 'Job Category added.', 'connectoor-jobs-free' ),
			2 => __( 'Job Category deleted.', 'connectoor-jobs-free' ),
			3 => __( 'Job Category updated.', 'connectoor-jobs-free' ),
			4 => __( 'Job Category not added.', 'connectoor-jobs-free' ),
			5 => __( 'Job Category not updated.', 'connectoor-jobs-free' ),
			6 => __( 'Job Categories deleted.', 'connectoor-jobs-free' ),
		];

		return $messages;
	}
}
