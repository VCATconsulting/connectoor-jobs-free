import './select2/index.js'
import { registerPlugin } from '@wordpress/plugins';


const { registerBlockType } = wp.blocks;

// Register Blocks
import jobs from './components/jobs/jobs';
import * as jobSearch from './blocks/job-search';
import * as metaField from './blocks/meta-field';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */

registerPlugin( 'connectoor-jobs-job-metadata', {
	render: jobs,
} );


/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( !block ) {
		return;
	}
	const { metadata, settings } = block;
	registerBlockType( metadata, {
		...settings,
	} );
};


/**
 * Function to register all blocks provided by Connectoor Jobs.
 */
const registerBlocks = () => {
	[
		jobSearch,
		metaField
	].forEach( registerBlock );
};

registerBlocks();
