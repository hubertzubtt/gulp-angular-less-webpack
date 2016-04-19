var gulp = require("gulp");
var gulpWatch = require("gulp-watch");
var gutil = require("gulp-util");
var clean = require("gulp-clean");
var webpack = require("webpack");
var browserSync = require("browser-sync");
var webpackConfig = require("./webpack.config.js");
var runSequence = require('run-sequence');
var webpackDevServer = require('webpack-dev-server');

// The development server (the recommended option for development)
gulp.task("default", ["watch"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
    gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {

    // clean dir
    gulp.src('dist/*.*', { read: false })
        .pipe(clean());

    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('browser-sync', function() {
    browserSync.init(['dist/index.html'], {
        notify: true,
        ghostMode: false,
        open: true,
        server: {
            baseDir: './dist/',
            middleware: [
                    //modRewrite(['!\.html|\.woff|\.js|\.ttf|\.svg|\.css|\.png$ /index.html [L]'])
                ]
                // middleware: [modRewrite ['!\.html|\.js|\.css|\.png$ /index.html [L]']]
        }
    });
});

gulp.task('js-build', function() {
    webpack(myDevConfig);
});

gulp.task('browser-sync-refresh', function() {
    browserSync.reload();
});

gulp.task("watch", function(callback) {

    var watchConfig = require("./webpack.config.js");
    watchConfig.devtool = "sourcemap";
    watchConfig.debug = true;
    watchConfig.entry.index.unshift("webpack-dev-server/client?http://localhost:9000/", "webpack/hot/dev-server");

    var server = new webpackDevServer(webpack(watchConfig), {
        hot: false,
        colors: true,
        noInfo: true
    });


    server.listen(9000, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[GTMS]", "Listening on http://localhost:9000/");
    });

});
