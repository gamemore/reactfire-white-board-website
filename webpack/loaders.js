const pkg = require( '../package.json' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const StringReplacePlugin = require( 'string-replace-webpack-plugin' );

const DEV = process.env.NODE_ENV === 'dev';

const jsLoader = [
    'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=babel-plugin-transform-decorators-legacy,plugins[]=babel-plugin-react-intl'
];

const htmlLoader = [
    'file-loader?name=[path][name].[ext]',
    'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version=' + pkg.version,
        'title=' + pkg.title || pkg.name,
        'name=' + pkg.name,
        'description=' + pkg.description,
        'dev=' + DEV
    ].join( '&' )
].join( '!' );

var sassLoader, cssLoader, depSassLoader, depCssLoader;
const sassParams = [
    'outputStyle=expanded'
];

if( DEV ) {
    sassParams.push( 'sourceMap', 'sourceMapContents=true' );
    sassLoader = [
        'style-loader',
        'css-loader?modules=truel&localIdentName=[path][name]---[local]---[hash:base64:5]',
        'postcss-loader',
        'sass-loader?' + sassParams.join( '&' )
    ].join( '!' );
    cssLoader = [
        'style-loader',
        'css-loader?modules=true&localIdentName=[path][name]---[local]---[hash:base64:5]',
        'postcss-loader'
    ].join( '!' );
    depSassLoader = [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader?' + sassParams.join( '&' )
    ].join( '!' );
    depCssLoader = [
        'style-loader',
        'css-loader',
        'postcss-loader'
    ].join( '!' );
} else {
    sassLoader = ExtractTextPlugin.extract( 'style-loader', [
        'css-loader?modules=true&localIdentName=[hash:base64]',
        'postcss-loader',
        'sass-loader?' + sassParams.join( '&' )
    ].join( '!' ) );
    cssLoader = ExtractTextPlugin.extract( 'style-loader', [
        'css-loader?modules=true&localIdentName=[hash:base64]',
        'postcss-loader'
    ].join( '!' ) );
    depSassLoader = ExtractTextPlugin.extract( 'style-loader', [
        'css-loader',
        'postcss-loader',
        'sass-loader?' + sassParams.join( '&' )
    ].join( '!' ) );
    depCssLoader = ExtractTextPlugin.extract( 'style-loader', [
        'css-loader',
        'postcss-loader'
    ].join( '!' ) );
}


module.exports = [
    {
        test:    /\.jsx?$/,
        exclude: /node_modules(?!(\\|\/)(reactfire-white-board|react-forms-validation))/,
        loaders: jsLoader
    },
    {
        test:   /\.json$/,
        loader: 'json-loader'
    },
    {
        test:   /\.html$/,
        loader: htmlLoader
    },
    {
        test:    /\.css$/,
        exclude: /node_modules(?!(\\|\/)reactfire-white-board)/,
        loader:  cssLoader
    },
    {
        test:    /node_modules(?!(\\|\/)reactfire-white-board).*\.css$/,
        loader:  depCssLoader
    },
    {
        test:    /\.scss$/,
        exclude: /node_modules(?!(\\|\/)reactfire-white-board)/,
        loader:  sassLoader
    },
    {
        test:    /node_modules(?!(\\|\/)reactfire-white-board).*\.scss$/,
        loader:  depSassLoader
    },
    {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?name=images/[name].[ext]?[hash]'
    },
    {
        test:   /\.woff(2)?(\?.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
        test:   /\.(eot|svg|ttf|otf)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
    },{
        test: /AppConfig.js$/,
        loader: StringReplacePlugin.replace( {
            replacements: [
                {
                    pattern: /<!-- @firebase (\w*?) -->/ig,
                    replacement: function ( match, p1, offset, string ) {
                        return pkg.config.firebase[p1];
                    }
                },{
                    pattern: /<!-- @gmaps (\w*?) -->/ig,
                    replacement: function ( match, p1, offset, string ) {
                        return pkg.config.google.maps[p1];
                    }
                },{
                    pattern: /<!-- @clientId (\w*?) -->/ig,
                    replacement: function ( match, p1, offset, string ) {
                        return pkg.config.google.clientId[p1];
                    }
                },{
                    pattern: /<!-- @authProxy (\w*?) -->/ig,
                    replacement: function ( match, p1, offset, string ) {
                        return pkg.config.authProxy[p1];
                    }
                }
            ]
        } )
    }
];
