var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('js', function() {
    gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(concat('st.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['js', 'browser-sync', 'watch']);
