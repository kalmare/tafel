const gulp = require('gulp');
const babel = require('gulp-babel');
const electron = require('electron-connect').server.create();

gulp.task('compile', () => {
    gulp.src('view/*.{html,css}').pipe(gulp.dest('build/'));

    return gulp.src('view/*.js').pipe(babel()).pipe(gulp.dest('build/'));
});

gulp.task('start', ['compile'], () => {
    electron.start();

    gulp.watch(['app/main.js'], electron.restart);

    gulp.watch(['view/*.{js,css,html}'], ['compile']);
    gulp.watch(['build/*.{js,css,html}'], electron.reload);
});
