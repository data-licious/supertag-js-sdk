var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    doxx = require('gulp-doxx'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(plumber())
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src(['src/st.js', 'src/**/*.js'])
        .pipe(plumber())
        .pipe(concat('st.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('docs', function() {
    gulp.src(['src/st.js', 'src/**/*.js'])
        .pipe(plumber())
        .pipe(doxx({
            title: 'SuperTag JavaScript SDK'
        }))
        .pipe(gulp.dest('docs/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('*.html', ['html']);
    gulp.watch('src/**/*.js', ['js', 'docs']);
});

gulp.task('default', ['html', 'js', 'docs', 'browser-sync', 'watch']);
