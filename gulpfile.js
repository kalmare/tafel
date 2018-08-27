const gulp = require('gulp');
const babel = require('gulp-babel');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const cleancss = require('gulp-clean-css');
const minify = composer(uglifyes, console);
const pump = require('pump');

const electron = require('electron-connect').server.create();

gulp.task('move-html', () => {
    return gulp.src('view/*.html').pipe(gulp.dest('build/'));
});

gulp.task('babel', () => {
    return gulp.src('view/*.js').pipe(babel()).pipe(gulp.dest('build/'));
});

gulp.task('minify-js', ['babel'], cb => {
    pump([
        gulp.src('build/*.js'),
        minify(),
        gulp.dest('build/')
    ], cb);
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
