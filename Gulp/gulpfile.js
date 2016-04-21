/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');


// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});

gulp.task('bower:copy', function() {
    console.log('copying bower components...');
    return gulp.src('bower_components/angular-ui-router/release/*min.js')
        .pipe(gulp.dest('lib/ui-router'));
});