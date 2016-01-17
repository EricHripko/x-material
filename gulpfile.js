var gulp = require("gulp");
var concat = require("gulp-concat");
var minifyCSS = require("gulp-minify-css");
var uglify = require("gulp-uglify");

gulp.task("default", function() {
    gulp.src("styles/*.css")
        .pipe(minifyCSS())
        .pipe(concat("x-material.min.css"))
        .pipe(gulp.dest("dist/styles"));
    gulp.src(["js/m-core.js", "js/m-*.js"])
        .pipe(concat("x-material.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});