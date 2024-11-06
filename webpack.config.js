/**
 * External dependencies
 */
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Webpack config (Development mode)
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-scripts/#provide-your-own-webpack-config
 */
module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve( process.cwd(), 'src', 'index.js' ),
		frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
		admin: path.resolve( process.cwd(), 'src', 'admin.js' ),
	}
};
