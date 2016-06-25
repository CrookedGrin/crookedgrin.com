var gulp = require('gulp'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat')

var bases = {
	src: 'src/',
	css: 'src/css/',
	dist: 'dist/'
}

var paths = {
	js: ['js/**/*.js'],
	css: ['css/*.css'],
	sass: ['sass/**/*.scss'],
	srcAll: ['**/*', '!sass', '!sass/**', '!**/config.rb', '!**/*.psd'],
	watchPath: ['src/**/*', '!src/css/main.css**']
};

gulp.task('clean', function() {
	return gulp.src(bases.dist)
	.pipe(clean());
});

gulp.task('sass', ['clean'], function() {
	return gulp.src(paths.sass, {cwd: bases.src})
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(bases.css));
})

gulp.task('scripts', ['clean'], function() {
	return gulp.src(paths.js, {cwd: bases.src})
	.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest(bases.dist + 'scripts/'));
})

gulp.task('copy', ['clean', 'sass'], function() {
	return gulp.src(paths.srcAll, {cwd: bases.src})
	.pipe(gulp.dest(bases.dist));
});

gulp.task('watch', function() {
	gulp.watch(paths.watchPath, ['default']);
})

gulp.task('default', ['clean', 'scripts', 'sass', 'copy']);
