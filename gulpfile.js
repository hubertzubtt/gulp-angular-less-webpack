var gulp = require("gulp");
var gulpWatch = require("gulp-watch");
var gutil = require("gulp-util");
var webpack = require("webpack");
var browserSync = require("browser-sync");
var webpackConfig = require("./webpack.config.js");
var runSequence = require('run-sequence');

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
    /*
    var watchConfig = Object.create(webpackConfig);
    watchConfig.watch = true;
    webpack(watchConfig, function(cos) {
        console.log("HA", cos);
    });*/
    gulp.start('browser-sync');
    gulp.watch(['src/**/*.js', 'src/**/*.html', 'src/**/*.less'], ['webpack:build-dev']);
    gulp.watch(['dist/**/*.js', 'dist/**/*.html', 'dist/**/*.css'], ['browser-sync-refresh']);
});
