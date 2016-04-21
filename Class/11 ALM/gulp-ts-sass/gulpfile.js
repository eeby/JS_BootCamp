var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('ts:build', function () {
    return gulp.src('src/modules/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            output: 'output.js'
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('bower:copy', function() {
    console.log('copying bower components...');
    return gulp.src('bower_components/angular-ui-router/release/*min.js')
        .pipe(gulp.dest('lib/ui-router'));
});

gulp.task('watch:dev', function() { 
    gulp.watch('src/**/*.ts', ['ts:build']);
});

gulp.task('default', ['ts:build', 'watch:dev']);