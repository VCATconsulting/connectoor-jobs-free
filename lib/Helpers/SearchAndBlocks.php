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

		register_block_type_from_metadata(
			CONNECTOOR_JOBS_PATH . 'build/blocks/meta-field',
			[
				'render_callback' => [ $this, 'connectoor_jobs_render_meta_field_block' ],
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

		if ( '_connectoor_jobs_begin' === $field ) {
			$deadline         = get_post_meta( get_the_ID(), '_connectoor_jobs_deadline', true );
			$deadline_visible = get_post_meta( get_the_ID(), '_connectoor_jobs_deadline_visible', true );
			$begin            = get_post_meta( get_the_ID(), '_connectoor_jobs_begin', true );
			$begin_raw        = get_post_meta( get_the_ID(), '_connectoor_jobs_begin_raw', true );

			$begin_check = (int) strtotime( gmdate( 'd.m.Y' ) ) < (int) $begin_raw;
			if ( empty( $begin ) || 0 === $begin_check ) {
				$begin = esc_html__( 'now', 'connectoor-jobs' );
			}

			if ( $deadline_visible && ! empty( $deadline ) ) {
				$value = sprintf(
				// translators: %s: date.
					__( 'until: %s', 'connectoor-jobs' ),
					esc_html( $deadline )
				);
			} else {
				$value = $begin;
			}
		} else {
			$value = get_post_meta( get_the_ID(), $field, true );
		}

		/**
		 * Add a filter to customize the output of the meta field block.
		 */
		$value = apply_filters( 'connectoor_jobs_render_meta_field_block_value', $value, $field );

		return sprintf( '<div class="wp-block-connectoor-jobs-meta-field" data-format="%s">%s</div>', esc_html( $value ), esc_html( $value ) );
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
			$search_term = get_query_var( 's' );
			if ( ! empty( $search_term ) ) {
				$query->set( 'post_type', 'connectoor_jobs' );
			}
		}
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

		$blocks     = parse_blocks( $post->post_content );
		$categories = [];
		foreach ( $blocks as $block ) {
			if ( 'core/group' === $block['blockName'] && isset( $block['innerBlocks'][1] ) && 'core/query' === $block['innerBlocks'][1]['blockName'] && ! empty( $block['innerBlocks'][1]['attrs']['query']['taxQuery'] ) ) {
				$categories = $block['innerBlocks'][1]['attrs']['query']['taxQuery'];
				break;
			} else {
				$categories = [];
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
				'categoriesTerms' => $categories,
				'placeholderText' => esc_html__( 'Search Jobs...', 'connectoor-jobs' ),
				'readMoreText'    => esc_html__( 'read more', 'connectoor-jobs' ),
				'nonce'           => wp_create_nonce( 'connectoor_jobs_search_nonce' ),
				'page_id'         => get_the_ID(),
			]
		);

		ob_start();
		?>
		<div class="connectoor-jobs-search-field-wrapper">
			<label for="connectoor-job-search" class="screen-reader-text"><?php esc_html_e( 'Search Jobs', 'connectoor-jobs' ); ?></label>
			<input
				aria-label="Search Jobs"
				type="text"
				id="connectoor-job-search"
				class="connectoor-job-search"
				placeholder="<?php esc_html_e( 'Search Jobs...', 'connectoor-jobs' ); ?>"
				value="<?php echo esc_attr( $attributes['searchTerm'] ); ?>"/>
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
		// Verify nonce for security.
		if ( ! isset( $_GET['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['nonce'] ) ), 'connectoor_jobs_search_nonce' ) ) {
			wp_send_json_error( [ 'message' => esc_html__( 'Invalid request', 'connectoor-jobs' ) ], 403 );
		}

		if ( ! isset( $_GET['q'] ) ) {
			wp_send_json( [] );
		}

		/*
		 * Get the search query and the categories.
		 */
		$search_query = sanitize_text_field( wp_unslash( $_GET['q'] ) );

		$page_id  = isset( $_GET['page_id'] ) ? (int) $_GET['page_id'] : 0;
		$paged    = isset( $_GET['page'] ) ? (int) $_GET['page'] : 1;
		$per_page = isset( $_GET['per_page'] ) ? (int) $_GET['per_page'] : 10;

		// Parse category filters from block context.
		$categories_query = [];
		if ( isset( $_GET['categories'] ) && is_array( $_GET['categories'] ) ) {
			$categories_raw = wp_unslash( $_GET['categories'] ); //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

			/*
			 * Sanitize the categories.
			 */
			foreach ( $categories_raw as $category => $cat_ids ) {
				$category                      = sanitize_text_field( $category );
				$categories_query[ $category ] = array_unique( array_map( 'intval', $cat_ids ) );
			}
		}

		// Base query arguments with filters.
		$args = [
			'post_type'      => 'connectoor_jobs',
			'post_status'    => 'publish',
			'orderby'        => 'title',
			'order'          => 'ASC',
			'tax_query'      => [ 'relation' => 'AND' ], // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'meta_query'     => [ 'relation' => 'AND' ], // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'posts_per_page' => - 1, // ALLE IDs holen!
		];

		/*
		* Additional fixed taxonomy filters from block context.
		*/
		$block_tax_query = $this->get_connectoor_jobs_tax_query( $categories_query );
		if ( $block_tax_query ) {
			$args['tax_query'] = array_merge( $args['tax_query'] ?? [], $block_tax_query ); // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		}

		/*
		 * Primary query for filtered results.
		 */
		$query           = new \WP_Query( $args );
		$post_ids_filter = wp_list_pluck( $query->posts, 'ID' );
		$post_ids_search = [];

		/*
		 * Optional fulltext search across meta fields and taxonomies.
		 */
		if ( $search_query ) {
			$title_ids = get_posts(
				[
					'post_type'      => 'connectoor_jobs',
					'post_status'    => 'publish',
					'fields'         => 'ids',
					's'              => $search_query,
					'posts_per_page' => - 1,
				]
			);

			$meta_ids = get_posts(
				[
					'post_type'      => 'connectoor_jobs',
					'post_status'    => 'publish',
					'posts_per_page' => - 1,
					'fields'         => 'ids',
					'meta_query'     => [ //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
						'relation' => 'OR',
						[
							'key'     => '_connectoor_jobs_company',
							'value'   => $search_query,
							'compare' => 'LIKE',
						],
						[
							'key'     => '_connectoor_jobs_intern_title',
							'value'   => $search_query,
							'compare' => 'LIKE',
						],
						[
							'key'     => '_connectoor_jobs_state',
							'value'   => $search_query,
							'compare' => 'LIKE',
						],
						[
							'key'     => '_connectoor_jobs_postalcode',
							'value'   => $search_query,
							'compare' => 'LIKE',
						],
						[
							'key'     => '_connectoor_jobs_city',
							'value'   => $search_query,
							'compare' => 'LIKE',
						],
						[
							'key'     => '_connectoor_jobs_jobtype',
							'value'   => $search_query,
							'compare' => 'LIKE',
						],
					],
				]
			);

			/*
			 * Get the term ids by the search query.
			 */
			$term_ids = get_terms(
				[
					'taxonomy'   => [ 'connectoor_tax_job_category', 'connectoor_tax_job_emp_type' ],
					'name__like' => $search_query,
					'fields'     => 'ids',
				]
			);

			$tax_ids = [];
			if ( $term_ids ) {
				$tax_query = [
					'post_type'      => 'connectoor_jobs',
					'post_status'    => 'publish',
					'fields'         => 'ids',
					'posts_per_page' => - 1,
					'tax_query'      => [ //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						'relation' => 'OR',
						[
							'taxonomy' => 'connectoor_tax_job_category',
							'field'    => 'term_id',
							'terms'    => $term_ids,
						],
						[
							'taxonomy' => 'connectoor_tax_job_emp_type',
							'field'    => 'term_id',
							'terms'    => $term_ids,
						],
					],
				];
				$tax_ids   = get_posts( $tax_query );
			}

			$post_ids_search = array_unique( array_merge( $title_ids, $meta_ids, $tax_ids ) );
		}

		if ( $search_query ) {
			if ( ! empty( $post_ids_filter ) ) {
				$post_ids = array_intersect( $post_ids_filter, $post_ids_search );
			} else {
				$post_ids = [];
			}
		} else {
			$post_ids = $post_ids_filter;
		}

		/*
		 * Get the final data.
		 */
		if ( empty( $post_ids ) ) {
			wp_send_json(
				[
					'results'     => [],
					'total_found' => 0,
					'max_pages'   => 0,
					'paged'       => $paged,
				]
			);
		}

		// Final query to fetch matching results.
		$args_final = [
			'post_type'              => 'connectoor_jobs',
			'post_status'            => 'publish',
			'post__in'               => $post_ids,
			'orderby'                => 'post__in',
			'posts_per_page'         => $per_page,
			'paged'                  => $paged,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		];

		$query_final = new \WP_Query( $args_final );

		/*
		 * Get the final results.
		 */
		$results = [];

		if ( $query_final->have_posts() ) {
			while ( $query_final->have_posts() ) {
				$query_final->the_post();

				/*
				 * Build the results.
				 */
				$results[] = [
					'ID'         => get_the_ID(),
					'post_title' => get_the_title(),
					'link'       => get_the_permalink(),
					'html'       => $this->render_connectoor_jobs_post_template( get_the_ID(), $page_id ),
				];
			}
		}

		/*
		 * Prepare the response.
		 */
		$response = [
			'results'     => $results,
			'total_found' => $query_final->found_posts,
			'max_pages'   => $query_final->max_num_pages,
			'paged'       => $paged,
		];

		wp_send_json( $response );
	}

	/**
	 * Get the tax query for the connectoor jobs.
	 *
	 * @param array $categories_query The categories query.
	 *
	 * @return array
	 */
	private function get_connectoor_jobs_tax_query( $categories_query ) {
		$tax_query = [];

		/*
		 * Check if the categories are set.
		 */
		if ( is_array( $categories_query ) ) {
			if ( ( isset( $categories_query['connectoor_tax_job_category'][0] ) && 0 !== $categories_query['connectoor_tax_job_category'][0] ) ||
				( isset( $categories_query['connectoor_tax_job_emp_type'][0] ) && 0 !== $categories_query['connectoor_tax_job_emp_type'][0] ) ) {
				/*
				 * Check if the connectoor_tax_job_category category is set.
				 */
				if ( isset( $categories_query['connectoor_tax_job_category'][0] ) && 0 !== $categories_query['connectoor_tax_job_category'][0] ) {
					$tax_query[] = [
						[
							'taxonomy' => 'connectoor_tax_job_category',
							'terms'    => $categories_query['connectoor_tax_job_category'],
							'field'    => 'term_id',
						],
					];
				}

				/*
				 * Check if the connectoor_tax_job_emp_type category is set.
				 */
				if ( isset( $categories_query['connectoor_tax_job_emp_type'][0] ) && 0 !== $categories_query['connectoor_tax_job_emp_type'][0] ) {
					$tax_query[] = [
						[
							'taxonomy' => 'connectoor_tax_job_emp_type',
							'terms'    => $categories_query['connectoor_tax_job_emp_type'],
							'field'    => 'term_id',
						],
					];
				}
			}

			/*
			 * Check if both categories are set.
			 */
			if ( ( isset( $categories_query['connectoor_tax_job_category'][0] ) && 0 !== $categories_query['connectoor_tax_job_category'][0] ) &&
				( isset( $categories_query['connectoor_tax_job_emp_type'][0] ) && 0 !== $categories_query['connectoor_tax_job_emp_type'][0] ) ) {
				$tax_query[] = [
					[
						'taxonomy' => 'connectoor_tax_job_category',
						'terms'    => $categories_query['connectoor_tax_job_category'],
						'field'    => 'term_id',
					],
					[
						'taxonomy' => 'connectoor_tax_job_emp_type',
						'terms'    => $categories_query['connectoor_tax_job_emp_type'],
						'field'    => 'term_id',
					],
				];
			}
			if ( ! empty( $tax_query ) ) {
				$tax_query['relation'] = 'AND';
			}
		}

		return $tax_query;
	}

	/**
	 * Render the results for the AJAX search.
	 *
	 * @param int $post_id      The post ID to render.
	 * @param int $block_page_id The page ID where the block is located.
	 *
	 * @return string
	 */
	public function render_connectoor_jobs_post_template( int $post_id, int $block_page_id ) {
		$page_post = get_post( $block_page_id );
		if ( ! $page_post ) {
			return '';
		}

		$blocks  = parse_blocks( $page_post->post_content );
		$pattern = 'connectoor-jobs/job-custom-post-query-loop';

		$templates = $this->connectoor_jobs_find_post_templates_in_blocks( $blocks, $post_id, $pattern, true );
		if ( ! empty( $templates ) ) {
			return $templates[0];
		}
		// Fallback.
		$templates_fallback = $this->connectoor_jobs_find_post_templates_in_blocks( $blocks, $post_id, '', false );
		return $templates_fallback[0] ?? '';
	}

	/**
	 * Search for post templates in blocks.
	 *
	 * @param array  $blocks       The blocks to search in.
	 * @param int    $post_id      The post ID to render.
	 * @param string $pattern_name Optional. The pattern name to match.
	 * @param bool   $require_pattern true = nur rendern, wenn block.attrs.metadata.patternName exakt passt.
	 *
	 * @return array
	 */
	private function connectoor_jobs_find_post_templates_in_blocks( array $blocks, int $post_id, string $pattern_name = '', bool $require_pattern = true ): array {
		$results = [];

		foreach ( $blocks as $block ) {
			if ( ! is_array( $block ) ) {
				continue;
			}

			$has_pattern_meta   = isset( $block['attrs']['metadata']['patternName'] );
			$current_pattern    = $has_pattern_meta ? $block['attrs']['metadata']['patternName'] : null;
			$pattern_matches    = '' !== $pattern_name && $current_pattern === $pattern_name;
			$pattern_constraint = $require_pattern ? $pattern_matches : true; // Fall back: if not required, always true.

			// If we are currently on a container (e.g. core/group or something),
			// we only check strictly for pattern if $require_pattern = true and $pattern_name
			// is not empty.
			if ( $pattern_constraint ) {
				// Try to find and render a core/query → core/post-template structure within this container.
				if ( ! empty( $block['innerBlocks'] ) ) {
					foreach ( $block['innerBlocks'] as $inner ) {
						if ( isset( $inner['blockName'] ) && 'core/query' === $inner['blockName'] && ! empty( $inner['innerBlocks'] ) ) {
							foreach ( $inner['innerBlocks'] as $sub ) {
								if ( isset( $sub['blockName'] ) && 'core/post-template' === $sub['blockName'] ) {
									$render_html = '';

									$post = get_post( $post_id );

									try {
										if ( $post instanceof \WP_Post ) {
											setup_postdata( $post ); // set global $post context.
										}

										if ( ! empty( $sub['innerBlocks'] ) ) {
											foreach ( $sub['innerBlocks'] as $template_block ) {
												$render_html .= render_block( $template_block );
											}
										}
									} finally {
										if ( $post instanceof \WP_Post ) {
											wp_reset_postdata(); // revert $post global to previous state.
										}
									}

									if ( '' !== $render_html ) {
										$results[] = $render_html;
									}
								}
							}
						}
					}
				}
			}

			// Recurse into inner blocks.
			if ( ! empty( $block['innerBlocks'] ) ) {
				$results = array_merge(
					$results,
					$this->connectoor_jobs_find_post_templates_in_blocks( $block['innerBlocks'], $post_id, $pattern_name, $require_pattern )
				);
			}
		}

		return $results;
	}
}
