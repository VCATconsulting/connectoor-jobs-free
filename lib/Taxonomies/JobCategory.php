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
	 * Registers the `connectoor_tax_job_category Category` taxonomy for use with 'connectoor-jobs'.
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
					'name'                       => __( 'Job Categories', 'connectoor-jobs' ),
					'singular_name'              => _x( 'Job Category', 'taxonomy general name', 'connectoor-jobs' ),
					'search_items'               => __( 'Search Job Categories', 'connectoor-jobs' ),
					'popular_items'              => __( 'Popular Job Categories', 'connectoor-jobs' ),
					'all_items'                  => __( 'All Job Categories', 'connectoor-jobs' ),
					'parent_item'                => __( 'Parent Job Category', 'connectoor-jobs' ),
					'parent_item_colon'          => __( 'Parent Job Category:', 'connectoor-jobs' ),
					'edit_item'                  => __( 'Edit Job Category', 'connectoor-jobs' ),
					'update_item'                => __( 'Update Job Category', 'connectoor-jobs' ),
					'view_item'                  => __( 'View Job Category', 'connectoor-jobs' ),
					'add_new_item'               => __( 'Add New Job Category', 'connectoor-jobs' ),
					'new_item_name'              => __( 'New Job Category', 'connectoor-jobs' ),
					'separate_items_with_commas' => __( 'Separate Job Categories with commas', 'connectoor-jobs' ),
					'add_or_remove_items'        => __( 'Add or remove Job Categories', 'connectoor-jobs' ),
					'choose_from_most_used'      => __( 'Choose from the most used Job Categories', 'connectoor-jobs' ),
					'not_found'                  => __( 'No Job Categories found.', 'connectoor-jobs' ),
					'no_terms'                   => __( 'No Job Categories', 'connectoor-jobs' ),
					'menu_name'                  => __( 'Job Categories', 'connectoor-jobs' ),
					'items_list_navigation'      => __( 'Job Categories list navigation', 'connectoor-jobs' ),
					'items_list'                 => __( 'Job Categories list', 'connectoor-jobs' ),
					'most_used'                  => _x( 'Most Used', 'Job Category', 'connectoor-jobs' ),
					'back_to_items'              => __( '&larr; Back to Job Categories', 'connectoor-jobs' ),
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
			1 => __( 'Job Category added.', 'connectoor-jobs' ),
			2 => __( 'Job Category deleted.', 'connectoor-jobs' ),
			3 => __( 'Job Category updated.', 'connectoor-jobs' ),
			4 => __( 'Job Category not added.', 'connectoor-jobs' ),
			5 => __( 'Job Category not updated.', 'connectoor-jobs' ),
			6 => __( 'Job Categories deleted.', 'connectoor-jobs' ),
		];

		return $messages;
	}
}
