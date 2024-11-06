<?php
/**
 * Custom Taxonomy Job Employment Type
 *
 * @package CONNECTOOR_JOBS\Taxonomies
 */

namespace CONNECTOOR_JOBS\Taxonomies;

/**
 * Class EmploymentType
 */
class EmploymentType {
	/**
	 * Register the custom taxonomy and it's update messages
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_taxonomy' ] );
		add_filter( 'term_updated_messages', [ $this, 'updated_messages' ] );
	}

	/**
	 *
	 * Registers the `connectoor_tax_job_type Category` taxonomy for use with 'connectoor-jobs-free'.
	 */
	public function register_taxonomy() {
		register_taxonomy(
			'connectoor_tax_job_emp_type',
			[ 'connectoor_jobs' ],
			[
				'hierarchical'      => false,
				'public'            => true,
				'show_in_nav_menus' => true,
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => [ 'slug' => 'job-employment-type' ],
				'capabilities'      => [
					'manage_terms' => 'edit_posts',
					'edit_terms'   => 'edit_posts',
					'delete_terms' => 'edit_posts',
					'assign_terms' => 'edit_posts',
				],
				'labels'            => [
					'name'                       => __( 'Job Employment Types', 'connectoor-jobs-free' ),
					'singular_name'              => _x( 'Job Employment Type', 'taxonomy general name', 'connectoor-jobs-free' ),
					'search_items'               => __( 'Search Job Employment Types', 'connectoor-jobs-free' ),
					'popular_items'              => __( 'Popular Job Employment Types', 'connectoor-jobs-free' ),
					'all_items'                  => __( 'All Job Employment Types', 'connectoor-jobs-free' ),
					'parent_item'                => __( 'Parent Job Employment Type', 'connectoor-jobs-free' ),
					'parent_item_colon'          => __( 'Parent Job Employment Type:', 'connectoor-jobs-free' ),
					'edit_item'                  => __( 'Edit Job Employment Type', 'connectoor-jobs-free' ),
					'update_item'                => __( 'Update Job Employment Type', 'connectoor-jobs-free' ),
					'view_item'                  => __( 'View Job Employment Type', 'connectoor-jobs-free' ),
					'add_new_item'               => __( 'Add New Job Employment Type', 'connectoor-jobs-free' ),
					'new_item_name'              => __( 'New Job Employment Type', 'connectoor-jobs-free' ),
					'separate_items_with_commas' => __( 'Separate Job Employment Types with commas', 'connectoor-jobs-free' ),
					'add_or_remove_items'        => __( 'Add or remove Job Employment Types', 'connectoor-jobs-free' ),
					'choose_from_most_used'      => __( 'Choose from the most used Job Employment Types', 'connectoor-jobs-free' ),
					'not_found'                  => __( 'No Job Employment Types found.', 'connectoor-jobs-free' ),
					'no_terms'                   => __( 'No Job Employment Types', 'connectoor-jobs-free' ),
					'menu_name'                  => __( 'Job Employment Types', 'connectoor-jobs-free' ),
					'items_list_navigation'      => __( 'Job Employment Types list navigation', 'connectoor-jobs-free' ),
					'items_list'                 => __( 'Job Employment Types list', 'connectoor-jobs-free' ),
					'most_used'                  => _x( 'Most Used', 'Employment Type', 'connectoor-jobs-free' ),
					'back_to_items'              => __( '&larr; Back to Job Employment Types', 'connectoor-jobs-free' ),
				],
				'show_in_rest'      => true,
				'rest_base'         => 'connectoor_tax_job_emp_type',
			]
		);
	}

	/**
	 * Sets the post updated messages for the `connectoor_tax_job_type Category` taxonomy.
	 *
	 * @param array $messages Post updated messages.
	 *
	 * @return array Messages for the `connectoor_tax_job_type Category` taxonomy.
	 */
	public function updated_messages( $messages ) {
		$messages['connectoor_tax_job_type Category'] = [
			0 => '', // Unused. Messages start at index 1.
			1 => __( 'Job Employment Type added.', 'connectoor-jobs-free' ),
			2 => __( 'Job Employment Type deleted.', 'connectoor-jobs-free' ),
			3 => __( 'Job Employment Type updated.', 'connectoor-jobs-free' ),
			4 => __( 'Job Employment Type not added.', 'connectoor-jobs-free' ),
			5 => __( 'Job Employment Type not updated.', 'connectoor-jobs-free' ),
			6 => __( 'Job Employment Types deleted.', 'connectoor-jobs-free' ),
		];

		return $messages;
	}
}
