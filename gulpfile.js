const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');

const electron = require('electron-connect').server.create();

gulp.task('move-html', () => {
    return gulp.src('view/*.html').pipe(gulp.dest('build/'));
});

gulp.task('babel', () => {
    return gulp.src('view/*.js').pipe(babel()).pipe(gulp.dest('build/'));
});

gulp.task('minify-js', ['babel'], () => {
    return gulp.src('build/*.js').pipe(uglify()).pipe(gulp.dest('build/'));
});

gulp.task('minify-css', () => {
    return gulp.src('view/**/*.css').pipe(cleancss()).pipe(gulp.dest('build/'));
});

gulp.task('start', ['move-html', 'minify-js', 'minify-css'], () => {
    electron.start();

    gulp.watch(['app/app.js'], electron.restart);

    gulp.watch(['view/*.html'], ['move-html']);
    gulp.watch(['view/*.js'], ['minify-js']);
    gulp.watch(['view/*.css', 'view/schema/*.css'], ['minify-css']);

    gulp.watch(['build/*.{js,css,html}'], electron.reload);
});
