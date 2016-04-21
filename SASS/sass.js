var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('default', function() {
   // place code for your default task here
});

gulp.task('sass', function () {
   return gulp.src('./sass/**/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
   gulp.watch('./sass/**/*.scss', ['sass']);
});

[1:21] 
{
 "name": "phone-book-ui",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "author": "",
 "license": "ISC",
 "devDependencies": {
   "gulp": "^3.9.1",
   "gulp-sass": "^2.2.0"
 }
}

[1:21] 