var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var onError = function(err) {
    console.log(err);
}

var path = {
    HTML: 'public/index.html',
    STYLES: './public/css/*.css',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_STYLES: './dist/css',
    DEST_SRC: 'dist/js',
    ENTRY_POINT: './public/js/app.js'
};

gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
    gulp.src(path.STYLES)
        .pipe(gulp.dest(path.DEST_STYLES));
});

gulp.task('replaceHTMLsrc', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'js/' + path.OUT
        }))
        .pipe(gulp.dest(path.DEST));
});
//
//gulp.task('browserify', function(){
//    var b = browserify();
//    b.transform(reactify); // use the reactify transform
//    b.add(path.ENTRY_POINT);
//    return b.bundle()
//        .pipe(source('app.js'))
//        .pipe(gulp.dest('./dist'));
//});

gulp.task('watch', ['replaceHTMLsrc'], function() {
    // gulp.watch(path.HTML, ['copy']);
    gulp.watch(path.HTML, ['replaceHTMLsrc']);

    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC));
        console.log('Updated');
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});


gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['copy', 'watch']);
