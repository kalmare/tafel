const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('compile', () => {
    gulp.src('view/index.html').pipe(gulp.dest('build/'));

    return gulp.src('app/**/*.js').pipe(babel()).pipe(gulp.dest('build/'));
});