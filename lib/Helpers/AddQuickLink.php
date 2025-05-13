<?php
/**
 * Class to add custom quick links.
 *
 * @package CONNECTOOR_JOBS\Helpers
 */

namespace CONNECTOOR_JOBS\Helpers;

/**
 * Class AddQuickLink
 */
class AddQuickLink {
	/**
	 * Initialize the helper
	 */
	public function init() {
		add_filter( 'views_edit-connectoor_jobs', [ $this, 'add_new_view_tab' ] );
		add_filter( 'query_vars', [ $this, 'add_query_var' ] );
		add_filter( 'pre_get_posts', [ $this, 'list_manually_add_jobs' ] );
	}

	/**
	 * Add query vars.
	 *
	 * @param array $qvars The current query vars.
	 *
	 * @return array
	 */
	public function add_query_var( $qvars ) {
		// This is safe: we are only reading a URL param to add a query var, no action is performed.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( is_admin() && current_user_can( 'edit_posts' ) && isset( $_GET['post_type'] ) && 'connectoor_jobs' === sanitize_key( $_GET['post_type'] ) ) {
			$qvars[] = 'connectoor_jobs_add_type';
		}

		return $qvars;
	}

	/**
	 * List manually added jobs.
	 *
	 * @param object $query The current query.
	 *
	 * @return mixed
	 */
	public function list_manually_add_jobs( $query ) {
		global $pagenow;

		$current_screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		$current_user = wp_get_current_user();

		if (!is_admin() || 'edit.php' !== $pagenow || !$current_screen instanceof \WP_Screen || 'connectoor_jobs' !== $current_screen->post_type || !isset($query->query_vars['connectoor_jobs_add_type'])) {
			return $query;
		}

		if ( 'connectoor_jobs' === $query->query_vars['post_type'] && 'manually_added' === $query->query_vars['connectoor_jobs_add_type'] && 'administrator' === $current_user->roles[0] ) :
			$query->set(
				'meta_query',
				[
					'relation' => 'OR',
					[
						'key'     => '_connectoor_jobs_referencenumber',
						'value'   => '',
						'compare' => '=',
					],
					[
						'key'     => '_connectoor_jobs_referencenumber',
						'compare' => 'NOT EXISTS',
					],
				]
			);
		endif;

		return $query;
	}

	/**
	 * Add new view tab.
	 *
	 * @param array $views The current views.
	 *
	 * @return array
	 */
	public function add_new_view_tab( $views ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return $views;
		}

		// This is safe: we're only reading post_type in admin context to show custom view tabs.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( is_admin() && isset( $_GET['post_type'] ) && 'connectoor_jobs' === sanitize_key( $_GET['post_type'] ) ) {
			global $wp_query;

			$query = [
				'post_type'  => 'connectoor_jobs',
				'meta_query' => [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
					'relation' => 'OR',
					[
						'key'     => '_connectoor_jobs_referencenumber',
						'value'   => '',
						'compare' => '=',
					],
					[
						'key'     => '_connectoor_jobs_referencenumber',
						'compare' => 'NOT EXISTS',
					],
				],
			];

			$result                  = new \WP_Query( $query );
			$class                   = ( isset( $wp_query->query_vars['connectoor_jobs_add_type'] ) && 'manually_added' === $wp_query->query_vars['connectoor_jobs_add_type'] ) ? 'current' : '';
			$views['manually_added'] = sprintf(
			// translators: %1$s: admin url link, %2$s: class string, %3$d: number of manually added jobs.
				__( '<a href="%1$s" class="%2$s">Manually jobs (%3$d)</a>', 'connectoor-jobs' ),
				admin_url( 'edit.php?post_type=connectoor_jobs&connectoor_jobs_add_type=manually_added' ),
				$class,
				$result->found_posts
			);
		}

		return $views;
	}
}
