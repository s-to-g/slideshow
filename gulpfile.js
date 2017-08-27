// ///////////////////////////////
// Requires
// ///////////////////////////////
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var exorcist = require('exorcist');
var sassGlob = require('gulp-sass-glob');

// ///////////////////////////////
// Variables
// ///////////////////////////////
var filesToWatch = {
    'js': 'dev/js/**/*.js',
    'scss': 'dev/scss/**/*.scss'
}
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'ie >= 10', 'Firefox ESR']
}

function bundle (bundler) {
  return bundler
  .transform(babelify, {presets: ["es2015"]})
  .bundle()
  .on('error', function(e) {
      gutil.log(e)
  })
  .pipe(exorcist('./dist/js/main.js.map'))
  .pipe(source('script.js'))
  .pipe(gulp.dest('./dist/js'))
  .pipe(browserSync.stream())
}

gulp.task('js', function() {
    return bundle(browserify('./dev/js/script.js'));
});

gulp.task('watch', ['sass'], function() {
    watchify.args.debug = true;
    var watcher = watchify(browserify('./dev/js/script.js', watchify.args));

    bundle(watcher);

    watcher.on('update', function() {
        bundle(watcher);
    });

    watcher.on('log', gutil.log);

    browserSync.init({
        server: true,
        logFileChanges: false
    });

    gulp.watch(filesToWatch.scss, ['sass']);
    gulp.watch('*.html', browserSync.reload);

});

gulp.task('sass', function () {
    return gulp.src(filesToWatch.scss)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass( { outputStyle: 'compressed'} ).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: true
    })
});
