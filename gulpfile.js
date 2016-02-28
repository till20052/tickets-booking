var path = require('path'),
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    gulpConcat = require('gulp-concat');

var paths = {
    src: 'app',
    dest: 'public'
};

var libs = {
    js: {
        name: 'libs.js',
        path: 'bower_components',
        dest: 'js',
        src: [
            'jquery/dist/jquery.js',
            'angular/angular.js',
            'angular-route/angular-route.min.js',
            'angular-ui-router/release/angular-ui-router.js'
        ]
    }
};

var app = {
    js: {
        name: 'app.js',
        path: 'sources',
        dest: 'js',
        mask: [
            '*.module.js',
            '**/*.module.js',
            '**/config.js',
            '**/*.*.js'
        ]
    },
    css: {
        name: 'style.css',
        path: 'styles',
        dest: 'css',
        mask: '**/*.less'
    }
};

gulp.task('libs:js', function () {
    builder(libs, {dest: paths.dest}).build('js');
});

gulp.task('app:js', function () {
    builder(app, paths).build('js');
});

gulp.task('app:css', function () {
    builder(app, paths).build('css');
});

gulp.task('default', function () {
    gulp.start('libs:js', 'app:js', 'app:css');
    gulp.watch('app/sources/**/*.js', ['app:js']);
    gulp.watch('app/styles/**/*.less', ['app:css']);
});

function builder(packet, basepaths) {
    var $paths = paths(basepaths);

    return {
        build: build
    };

    function build(type) {
        var pack = packet[type];
        console.log(src(pack));
        gulp.src(src(pack))
            .pipe(gulpIf(pack.hasOwnProperty('name'), gulpConcat(pack.name)))
            .pipe({
                js: minifyJs,
                css: minifyCss
            }[type]())
            .pipe(dest(pack))
    }

    function src(pack) {
        try {
            ['mask', 'src'].forEach(function (key) {
                if (!pack.hasOwnProperty(key))
                    return;

                if (!(pack[key] instanceof Array))
                    pack[key] = [pack[key]];

                throw pack[key].map(function (file) {
                    return path.join($paths.src, pack.path, file);
                });
            });
        }
        catch (stack) {
            return stack;
        }
    }

    function minifyJs() {
        return require('gulp-uglify')();
    }

    function minifyCss() {
        var less = require('gulp-less'),
            CleanCSS = require('less-plugin-clean-css');

        return less({
            plugins: [new CleanCSS({advanced: true})]
        });
    }

    function dest(pack) {
        return gulp.dest(path.join($paths.dest, pack.dest));
    }

    function paths(basepaths) {
        var $paths;
        return ['src', 'dest'].forEach(function (key) {
                this[key] = basepaths.hasOwnProperty(key) ? basepaths[key] : '';
            }, $paths = {}) || $paths;
    }

}