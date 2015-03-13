var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var locations = {
	src: {
		scripts: ["client/**/*.js", "client/*.js", "!client/tests/*.js"],
		styles: "client/css/index.less",
		css: "client/css/*.less"
	},
	dest: {
		scripts: "build/scripts",
		styles: "build/styles"
	}
};

gulp.task("scripts", function () {

	return gulp.src(locations.src.scripts)
		.pipe($.jshint())
		.pipe($.jshint.reporter(stylish))
		.pipe($.concat("index.js"))
		.pipe(gulp.dest(locations.dest.scripts));

});

gulp.task("styles", function () {

	return gulp.src(locations.src.styles)
		.pipe($.less())
		.pipe(gulp.dest(locations.dest.styles));

});

gulp.task("clean", function () {

	return gulp.src("build/**/*.{js, css}", {
			read: false
		})
		.pipe($.rimraf());

});

gulp.task("watch", function () {
	gulp.watch([locations.src.scripts, locations.src.css], {
		maxListeners: 99
	}, ["clean-build"]);
});

gulp.task("build", ["scripts", "styles"], function () {

});

gulp.task("clean-build", ["clean"], function () {
	gulp.start("build");
});

gulp.task("default", ["clean-build", "watch"]);