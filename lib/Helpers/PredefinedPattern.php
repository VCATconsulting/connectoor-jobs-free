<?php
/**
 * Helper class to predefined pattern
 *
 * @see      WooCommerce/Admin/WC_Helper_API
 *
 * @package  CONNECTOOR_JOBS\Helpers
 */

namespace CONNECTOOR_JOBS\Helpers;

/**
 * Class PredefinedPattern
 */
class PredefinedPattern {
	/**
	 * Initialize the helper
	 */
	public function init() {
		add_action( 'init', [ $this, 'connectoor_jobs_register_pattern' ] );
	}

	/**
	 * Register Block Pattern and Category.
	 */
	public function connectoor_jobs_register_pattern() {
		register_block_pattern(
			'connectoor-jobs/job-apply-button',
			[
				'title'       => __( 'Apply Button', 'connectoor-jobs-free' ),
				'description' => _x( 'Add a pre defined template for the apply button.', 'Block pattern description', 'connectoor-jobs-free' ),
				'categories'  => [ 'connectoor' ],
				'content'     => '<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"branding-color"} --><div class="wp-block-button branding-color"><a class="wp-block-button__link wp-element-button" href="">Jetzt bewerben</a></div>
<!-- /wp:button --></div><!-- /wp:buttons --><!-- wp:paragraph {"align":"right","className":"powered-by"} -->
<p class="has-text-align-right powered-by"><a href="https://www.connectoor.com">powered by Connectoor</a></p>
<!-- /wp:paragraph -->',
			]
		);

		register_block_pattern(
			'connectoor-jobs/job-custom-post-query-loop',
			[
				'title'       => __( 'Connectoor Jobs Query Loop', 'connectoor-jobs-free' ),
				'description' => _x( 'Displays a list of Jobs with meta fields and search', 'Block pattern description', 'connectoor-jobs-free' ),
				'categories'  => [ 'connectoor' ],
				'content'     => '<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide"><!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"connectoor_jobs","order":"desc","orderBy":"date"},"className":"connectoor-jobs-list"} -->
<div class="wp-block-query connectoor-jobs-list">
    <!-- wp:connectoor-jobs/job-search /-->
    <!-- wp:post-template {"className":"branding-color"} -->
    <!-- wp:group {"tagName":"article"} -->
    <article class="wp-block-group">
    	<!-- wp:connectoor-jobs/meta-field {"field":"_connectoor_jobs_company"} /-->
        <!-- wp:post-title {"level":3,"isLink":true} /-->
  		<!-- wp:group {"className":"job-meta","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
		<div class="wp-block-group job-meta">
			<!-- wp:connectoor-jobs/meta-field {"field":"_connectoor_jobs_city"} /-->
			<!-- wp:connectoor-jobs/meta-field {"field":"_connectoor_jobs_jobtype"} /-->
			<!-- wp:connectoor-jobs/meta-field {"field":"_connectoor_jobs_begin"} /-->
		</div>
		<!-- /wp:group -->
		<!-- wp:read-more {"content":"weiterlesen"} /-->
    </article>
    <!-- /wp:group -->
    <!-- /wp:post-template -->
    <!-- wp:query-pagination -->
    <div class="wp-block-query-pagination">
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-numbers /-->
        <!-- wp:query-pagination-next /-->
    </div>
    <!-- /wp:query-pagination -->
</div>
<!-- /wp:query --></div>
<!-- /wp:group -->',
			]
		);

		/**
		 * Register new block pattern category for connectoor.
		 */
		register_block_pattern_category(
			'connectoor',
			[ 'label' => __( 'Connectoor', 'connectoor-jobs-free' ) ]
		);
	}
}
