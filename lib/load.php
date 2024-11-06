<?php
/**
 * Main plugin file to load other classes
 *
 * @package CONNECTOOR_JOBS
 */

namespace CONNECTOOR_JOBS;

use CONNECTOOR_JOBS\Helpers\AssetsLoader;
use CONNECTOOR_JOBS\PostTypes\ConnectoorJobs;
use CONNECTOOR_JOBS\Settings\Settings;
use CONNECTOOR_JOBS\PostMeta\JobMeta;
use CONNECTOOR_JOBS\Taxonomies\JobCategory;
use CONNECTOOR_JOBS\Taxonomies\EmploymentType;
use CONNECTOOR_JOBS\Helpers\PredefinedPattern;
use CONNECTOOR_JOBS\Helpers\SearchAndBlocks;
use CONNECTOOR_JOBS\Helpers\AddQuickLink;


/**
 * Init function of the plugin
 */
function init() {
	// Construct all modules to initialize.
	$modules = [
		'connectoor_jobs_helpers_assets_loader'      => new AssetsLoader(),
		'connectoor_jobs_settings_stettings'         => new Settings(),
		'connectoor_jobs_post_type_connectoor_jobs'  => new ConnectoorJobs(),
		'connectoor_jobs_post_meta_job_meta'         => new JobMeta(),
		'connectoor_jobs_taxonomy_job_category'      => new JobCategory(),
		'connectoor_jobs_taxonomy_employment_type'   => new EmploymentType(),
		'connectoor_jobs_helpers_predefined_pattern' => new PredefinedPattern(),
		'connectoor_jobs_helpers_search_and_blocks'  => new SearchAndBlocks(),
		'connectoor_jobs_helpers_add_quick_link'     => new AddQuickLink(),
	];

	// Initialize all modules.
	foreach ( $modules as $module ) {
		if ( is_callable( [ $module, 'init' ] ) ) {
			call_user_func( [ $module, 'init' ] );
		}
	}
}

add_action( 'plugins_loaded', 'CONNECTOOR_JOBS\init' );
