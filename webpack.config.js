const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );
const path = require( 'path' );

module.exports = {
    ...defaultConfig,
    entry: {
        ...getWebpackEntryPoints(),
        'view': path.resolve( process.cwd(), 'src', 'view.js' ),
        'index': path.resolve( process.cwd(), 'src', 'index.js' ),
    },
};
