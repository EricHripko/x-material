var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");

gulp.task("build-css", function() {
    return gulp.src("styles/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("x-material.min.css"))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("build-js", function() {
    return gulp.src(["js/m-core.js", "js/m-*.js"])
        .pipe(concat("x-material.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("build", function() {
});