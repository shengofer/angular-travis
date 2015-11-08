/*eslint-disable */
var node_env = process.env.NODE_ENV;
var isProduction = node_env === 'production';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        rename: {
            'gulp-less-sourcemap': 'less',
            'gulp-rimraf': 'rimraf',
            'gulp-angular-filesort': 'angularFilesort'
        }
    }),
    fs = require('fs'),
    karma = require('karma').Server,
    e2e = $.protractor,
    mainBowerFiles = require('main-bower-files'),
    bowerJson = require('./bower.json'),
    plato = require('plato'),
    server;
// Environment config
//

// Configurable paths for the application
var appConfig = {
    app: bowerJson.appPath,
    build: 'build',
    dist: 'dist',
    templates: [bowerJson.appPath + '/**/*.html', '!' + bowerJson.appPath + '/**/index.html'],
    baseUrl: 'http://127.0.0.1:8000/',
    seleniumDir: './node_modules/gulp-protractor/node_modules/protractor/selenium/'
};

var getModules = function (dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(dir + '/' + file).isDirectory();
        });
};

gulp.task('babel', function () {
    return gulp.src('app/**/*.js')
        .pipe($.babel())
        .pipe(gulp.dest('build/metrics/transpiled'));
});

gulp.task('plato', ['babel'], function () {
    plato.inspect('build/metrics/transpiled/**/*.js', 'build/metrics/report', {}, function () {});
});

gulp.task("clean", function () {
    "use strict";
    return gulp.src(appConfig.build, {read: false}).pipe($.rimraf({force: true}));
});

gulp.task('webserver:dev', function () {
    server = $.liveServer(['--harmony', 'app.js'], {env: {NODE_ENV: 'development'}});
    server.start();
});

// clean up if an error goes unhandled.
process.on('exit', function () {
    if (server) server.stop()
});

gulp.task("tests:eslint", function () {
    return gulp.src(['test/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task("server:eslint", function () {
    return gulp.src(['server/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('tests:unit', function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tests:e2e', function (done) {
    e2e.webdriver_update(function () {
        var seleniumJar = fs.readdirSync(appConfig.seleniumDir).find(function (fileName) {
            return fileName.indexOf('selenium-server-standalone') !== -1;
        });

        if (!seleniumJar) {
            console.log(new Error('Selenium jar not found.'));
        }

        return gulp.src(['test/e2e/**/*.js'], {read: false})
            .pipe(e2e.protractor({
                configFile: __dirname + '/karma-e2e.conf.js',
                args: [
                    '--baseUrl', appConfig.baseUrl,
                    '--seleniumServerJar', appConfig.seleniumDir + '/' + seleniumJar
                ]
            })).on('error', function (e) {
                console.log(e)
            }).on('end', done);
    });
});

gulp.task('test', ['tests:unit', 'tests:e2e']);
gulp.task('build:config', function () {
    "use strict";
    return gulp.src([appConfig.app + '/**/*Config.js'])
        .pipe($.concat(bowerJson.moduleName + '-' + bowerJson.version + '.js'))
        .pipe(gulp.dest(appConfig.build));
});

gulp.task('build:js', ['build:config'], function () {
    return gulp.src([appConfig.build + '/' + bowerJson.moduleName + '-' + bowerJson.version + '.js', appConfig.app + '/**/*Routes.js', '!' + appConfig.app + '/**/*Config.js', appConfig.app + '/**/*.js', appConfig.build + '/*.tpls.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat(bowerJson.moduleName + '-' + bowerJson.version + '.js'))
        .pipe($.ngAnnotate())
        .pipe(isProduction ? $.uglify() : $.util.noop())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(appConfig.build));
});

gulp.task("build:concatenated", ['build:templates', 'build:js'], function () {
    return gulp.src([appConfig.build + '/' + bowerJson.moduleName + '-' + bowerJson.version + '.js', appConfig.build + '/templates/*.js'])
        .pipe($.concat(bowerJson.moduleName + '-' + bowerJson.version + '.js'))
        .pipe(gulp.dest(appConfig.build));
});

gulp.task('build:vendors-js', function () {
    return gulp.src(mainBowerFiles({
        filter: "**/*.js",
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: './bower.json'
        }
    })).pipe($.sourcemaps.init())
        .pipe($.concat('vendors.js'))
        .pipe(isProduction ? $.uglify() : $.util.noop())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(appConfig.build));
});

gulp.task("build:templates", function () {
    var componentsDir = 'components/';
    var dir = './' + appConfig.app + '/' + componentsDir;
    var modules = getModules(dir);
    var moduleTasks = modules.map(function (folder) {
        return gulp.src(dir + folder + '/**/*.html', {basedir: '.'})
            .pipe($.htmlmin({collapseWhitespace: true}))
            .pipe($.ngTemplates({
                path: function (path, base) {
                    return componentsDir + path.replace(base, folder + '/');
                },
                module: bowerJson.moduleName + '.' + folder + '.tpls',
                filename: bowerJson.moduleName + '.' + folder + '.tpls.js'
            }))
            .pipe(isProduction ? $.uglify() : $.util.noop())
            .pipe(gulp.dest(appConfig.build + '/templates'));
    });
    return moduleTasks;
});

gulp.task('build:less', function () {
    gulp.src(appConfig.app + '/**/*.less')
        .pipe($.less())
        .pipe($.sourcemaps.init())
        .pipe($.concat(bowerJson.moduleName + '-' + bowerJson.version + '.css'))
        .pipe(isProduction ? $.minifyCss() : $.util.noop())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(appConfig.build));
});

gulp.task('build:vendors-css', function () {
    return gulp.src(mainBowerFiles({
        filter: "**/*.css",
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: './bower.json'
        },
        overrides: {
            angular: {main: ['./*.css']}
        }
    })).pipe($.sourcemaps.init())
        .pipe($.concat('vendors.css'))
        .pipe(isProduction ? $.minifyCss() : $.util.noop())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(appConfig.build));
});

gulp.task('build', ['tests:eslint', 'build:vendors-js', 'build:concatenated', 'build:vendors-css', 'build:less'], function () {
    return gulp.start('watch:app-js', 'watch:vendors', 'watch:app-less', 'webserver:dev');
});

gulp.task('watch:app-js', function () {
    var watcher = gulp.watch([appConfig.app + '/**/*.js', appConfig.app + '/**/*.html'], ['build:templates', 'build:js', 'build:concatenated']);
    var esLint = gulp.watch(['test/**/*.js'], ['tests:eslint']);
    watcher.on('change', onWatcherChange);
    esLint.on('change', onWatcherChange);
});

gulp.task('watch:app-less', function () {
    var watcher = gulp.watch([appConfig.app + '/**/*.less'], ['build:less']);
    watcher.on('change', onWatcherChange);
});

gulp.task('watch:vendors', function () {
    var watcher = gulp.watch(['.bower.json'], ['build:vendors-js', 'build:vendors-css']);
    watcher.on('change', onWatcherChange);
});

function onWatcherChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('dev', ['clean'], function () {
    return gulp.start('build');
});

gulp.task('tdd', function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('default', ['build']);
