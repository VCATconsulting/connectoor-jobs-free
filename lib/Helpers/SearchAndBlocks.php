<?php
/**
 * Helper class to add blocks and search functionality
 *
 * @see      WooCommerce/Admin/WC_Helper_API
 *
 * @package  CONNECTOOR_JOBS\Helpers
 */

namespace CONNECTOOR_JOBS\Helpers;

/**
 * Class SearchAndBlocks
 */
class SearchAndBlocks {
	/**
	 * Initialize the helper
	 */
	public function init() {
		add_action( 'init', [ $this, 'connectoor_jobs_register_blocks' ] );
		add_action( 'pre_get_posts', [ $this, 'connectoor_jobs_modify_query_based_on_search' ] );
		add_action( 'wp_ajax_connectoor_jobs_search_jobs', [ $this, 'connectoor_jobs_ajax_search_jobs' ] );
		add_action( 'wp_ajax_nopriv_connectoor_jobs_search_jobs', [ $this, 'connectoor_jobs_ajax_search_jobs' ] );
	}

	/**
	 * Register the blocks.
	 */
	public function connectoor_jobs_register_blocks() {
		register_block_type(
			'connectoor-jobs/job-search',
			[
				'render_callback' => [ $this, 'connectoor_jobs_render_search_field_block' ],
				'attributes'      => [
					'searchTerm' => [
						'type' => 'string',
					],
				],
			]
		);

		register_block_type(
			'connectoor-jobs/meta-field',
			[
				'render_callback' => [ $this, 'connectoor_jobs_render_meta_field_block' ],
				'attributes'      => [
					'field' => [
						'type' => 'string',
					],
				],
			]
		);
	}

	/**
	 * Render the meta field block.
	 *
	 * @param array $attributes The block attributes.
	 */
	public function connectoor_jobs_render_meta_field_block( $attributes ) {
		if ( ! isset( $attributes['field'] ) ) {
			return '';
		}

		$field = $attributes['field'];
		$value = get_post_meta( get_the_ID(), $field, true );

		return sprintf( '<div class="wp-block-connectoor-jobs-meta-field">%s</div>', esc_html( $value ) );
	}

	/**
	 * Customize the query based on the search term.
	 *
	 * @param object $query The query object.
	 *
	 * @return void
	 */
	public function connectoor_jobs_modify_query_based_on_search( $query ) {
		if ( ! is_admin() && $query->is_main_query() && $query->is_search() ) {
			if ( isset( $_GET['s'] ) && ! empty( $_GET['s'] ) ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended
				$query->set( 'post_type', 'connectoor_jobs' );
			}
		}

		wp_reset_postdata();
	}

	/**
	 * Create the Ajax search.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return false|string
	 */
	public function connectoor_jobs_render_search_field_block( $attributes ) {
		global $post;
		if ( ! isset( $attributes['searchTerm'] ) ) {
			$attributes['searchTerm'] = '';
		}

		$blocks  = parse_blocks( $post->post_content );
		$cat_ids = [];
		foreach ( $blocks as $block ) {
			if ( 'core/group' === $block['blockName'] && isset( $block['innerBlocks'][0] ) && 'core/query' === $block['innerBlocks'][0]['blockName'] && ! empty( $block['innerBlocks'][0]['attrs']['query']['taxQuery'] ) ) {
				$cat_ids = $block['innerBlocks'][0]['attrs']['query']['taxQuery'];
				break;
			} else {
				$cat_ids = [];
			}
		}

		/*
		 * Include script and set PHP variables
		 */
		wp_localize_script(
			'connectoor-jobs-frontend',
			'searchVars',
			[
				'ajaxUrl'         => admin_url( 'admin-ajax.php' ),
				'catIds'          => $cat_ids,
				'placeholderText' => esc_html__( 'Search Jobs...', 'connectoor-jobs-free' ),
				'readMoreText'    => esc_html__( 'read more', 'connectoor-jobs-free' ),
			]
		);

		ob_start();
		?>
		<div class="connectoor-jobs-search-field-wrapper">
			<input
				type="text"
				id="select2-search"
				class="select2-search"
				placeholder="<?php esc_html_e( 'Search Jobs...', 'connectoor-jobs-free' ); ?>"
				value="<?php echo esc_attr( $attributes['searchTerm'] ); ?>"/>
		</div>
		<div class="wp-block-query-container">
			<div class="wp-block-query"></div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * The Search.
	 *
	 * @return void
	 */
	public function connectoor_jobs_ajax_search_jobs() {
		if ( ! isset( $_GET['q'] ) ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended
			wp_send_json( [] );
		}

		/*
		 * Get the search query and the categories.
		 */
		$search_query = sanitize_text_field( wp_unslash( $_GET['q'] ) ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended
		//phpcs:disable
		$categories_query = isset( $_GET['categories'] ) ? wp_unslash( $_GET['categories'] ) : '';
		$query_post_ids   = isset( $_GET['ids'] ) ? wp_unslash( $_GET['ids'] ) : '';
		//phpcs:enable

		/*
		 * Get the data from the post, meta and taxonomies.
		 */
		if ( ! empty( $query_post_ids ) ) {
			$args_post = [
				'post_type'   => 'connectoor_jobs',
				'post_status' => 'publish',
				'post__in'    => $query_post_ids,
			];
		} else {
			$args_post = [
				'post_type'   => 'connectoor_jobs',
				'post_status' => 'publish',
				's'           => $search_query,
			];
		}

		$data_post = get_posts( $args_post );

		/*
		 * Get the data from the meta.
		 */
		$args_meta = [
			'post_type'   => 'connectoor_jobs',
			'post_status' => 'publish',
			'meta_query'  => [ //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				'relation' => 'OR',
				[
					'key'     => '_connectoor_jobs_city',
					'value'   => $search_query,
					'compare' => 'LIKE',
				],
				[
					'key'     => '_connectoor_jobs_state',
					'value'   => $search_query,
					'compare' => 'LIKE',
				],
				[
					'key'     => '_connectoor_jobs_jobtype',
					'value'   => $search_query,
					'compare' => 'LIKE',
				],
				[
					'key'     => '_connectoor_jobs_postalcode',
					'value'   => $search_query,
					'compare' => 'LIKE',
				],
				[
					'key'     => '_connectoor_jobs_intern_title',
					'value'   => $search_query,
					'compare' => 'LIKE',
				],
				[
					'key'     => '_connectoor_jobs_company',
					'value'   => $search_query,
					'compare' => 'LIKE',
				],
			],
		];

		$data_meta = get_posts( $args_meta );

		/*
		 * Get the term ids by the search query.
		 */
		$term_ids = get_terms(
			[
				'name__like' => $search_query,
				'fields'     => 'ids',
			]
		);

		/*
		 * Get the data from the taxonomies.
		 */
		$args_tax = [
			'post_type'   => 'connectoor_jobs',
			'post_status' => 'publish',
			'tax_query'   => [ //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				'relation' => 'OR',
				[
					'taxonomy' => 'connectoor_tax_job_category',
					'terms'    => $term_ids,
					'field'    => 'term_id',
				],
				[
					'taxonomy' => 'connectoor_tax_job_emp_type',
					'terms'    => $term_ids,
					'field'    => 'term_id',
				],
			],
		];

		$data_tax = get_posts( $args_tax );

		/*
		 * Merge all the data.
		 */
		$all_data = array_merge( $data_post, $data_meta, $data_tax );

		/*
		 * Get the unique post ids.
		 */
		$post_ids = array_unique( wp_list_pluck( $all_data, 'ID' ) );

		/*
		 * Get the final data.
		 */
		if ( empty( $post_ids ) ) {
			wp_send_json( [] );
		}

		$args_final = [
			'post_type'   => 'connectoor_jobs',
			'post_status' => 'publish',
			'post__in'    => $post_ids,
			'order'       => 'ASC',
			'orderby'     => 'title',
		];

		/*
		 * Check if the categories are set.
		 */
		if ( is_array( $categories_query ) ) {
			if ( ( isset( $categories_query['connectoor_tax_job_category'] ) && ( 0 !== (int) $categories_query['connectoor_tax_job_category'][0] ) ||
				( isset( $categories_query['connectoor_tax_job_emp_type'] ) && 0 !== (int) $categories_query['connectoor_tax_job_emp_type'][0] ) ) ) {
				/*
				 * Check if the connectoor_tax_job_category category is set.
				 */
				if ( isset( $categories_query['connectoor_tax_job_category'] ) && 0 !== (int) $categories_query['connectoor_tax_job_category'][0] ) {
					$args_final['tax_query'] = [ //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						'relation' => 'AND',
						[
							'taxonomy' => 'connectoor_tax_job_category',
							'terms'    => $categories_query['connectoor_tax_job_category'][0],
							'field'    => 'term_id',
						],
					];
				}

				/*
				 * Check if the connectoor_tax_job_emp_type category is set.
				 */
				if ( isset( $categories_query['connectoor_tax_job_emp_type'] ) && 0 !== (int) $categories_query['connectoor_tax_job_emp_type'][0] ) {
					$args_final['tax_query'] = [ //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						'relation' => 'AND',
						[
							'taxonomy' => 'connectoor_tax_job_emp_type',
							'terms'    => $categories_query['connectoor_tax_job_emp_type'][0],
							'field'    => 'term_id',
						],
					];
				}
			}

			/*
			 * Check if both categories are set.
			 */
			if ( ( isset( $categories_query['connectoor_tax_job_category'] ) && ( 0 !== (int) $categories_query['connectoor_tax_job_category'][0] ) &&
				( isset( $categories_query['connectoor_tax_job_emp_type'] ) && 0 !== (int) $categories_query['connectoor_tax_job_emp_type'][0] ) ) ) {
				$args_final['tax_query'] = [  //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
					'relation' => 'AND',
					[
						'taxonomy' => 'connectoor_tax_job_category',
						'terms'    => $categories_query['connectoor_tax_job_category'][0],
						'field'    => 'term_id',
					],
					[
						'taxonomy' => 'connectoor_tax_job_emp_type',
						'terms'    => $categories_query['connectoor_tax_job_emp_type'][0],
						'field'    => 'term_id',
					],
				];
			}
		}

		$query = new \WP_Query( $args_final );

		$results = [];

		/*
		 * Get the final results.
		 */
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();

				$deadline         = get_post_meta( get_the_ID(), '_connectoor_jobs_deadline', true );
				$deadline_visible = get_post_meta( get_the_ID(), '_connectoor_jobs_deadline_visible', true );
				$begin            = get_post_meta( get_the_ID(), '_connectoor_jobs_begin', true );

				if ( empty( $begin ) || strtotime( gmdate( 'd.m.Y' ) ) < strtotime( $begin ) ) {
					$begin = esc_html__( 'now', 'connectoor-jobs-free' );
				}

				$time = true === $deadline_visible ? $deadline : $begin;

				$company = get_post_meta( get_the_ID(), '_connectoor_jobs_company', true );

				/*
				 * Build the results.
				 */
				$results[] = [
					'ID'         => get_the_ID(),
					'post_title' => get_the_title(),
					'link'       => get_the_permalink(),
					'time'       => $time,
					'location'   => get_post_meta( get_the_ID(), '_connectoor_jobs_city', true ),
					'job_type'   => get_post_meta( get_the_ID(), '_connectoor_jobs_jobtype', true ),
					'company'    => $company,
				];
			}
		}

		wp_send_json( $results );
	}
}
