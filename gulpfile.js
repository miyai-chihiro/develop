var gulp = require("gulp"),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    styledocco = require('gulp-styledocco'),
    autoprefixer = require('gulp-autoprefixer'),
    ejs = require("gulp-ejs"),
    browser = require("browser-sync"),
    webpack = require('webpack');

//server
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./",
            open: false
        }
    });
});

//sass
gulp.task('style', function() {
    return sass('src/scss/',{
      style: 'expanded',
      compass: true,
      sourcemap: true
    })
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(browser.reload({stream:true}));
});

//ejs
gulp.task('ejs',function(){
  gulp.src(
    ['src/ejs/**/*.ejs','!' + 'src/ejs/**/_*.ejs']
  )
  .pipe(ejs())
  .pipe(gulp.dest('src/public'))
});

//styledocco
gulp.task('styledocco',function(){
  gulp.src('styleguide/',function(){
    return sass('src/scss/',{
      style: 'expanded',
      compass: true,
      sourcemap: true
    })
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(styledocco({
      out: './',
      name: 'GuideLine'
    }))
  });
});

// watch
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['style']);
    gulp.watch('styleguide/scss/**/*.scss', ['styledocco']);
    gulp.watch("./**/*.html").on("change", browser.reload);
});

gulp.task('default',['server','watch']);