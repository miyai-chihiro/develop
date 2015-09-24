var gulp = require("gulp"),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    styledocco = require('gulp-styledocco'),
    autoprefixer = require('gulp-autoprefixer'),
    ejs = require("gulp-ejs"),
    browser = require("browser-sync"),
    webpack = require('gulp-webpack');

// タスク名はファイル名と同じにしておくと見通しが良い
gulp.task('webpack', function () {
    gulp.src('src/js/application.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./public/js'));
});

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
  .pipe(gulp.dest('public'))
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
    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch("src/ejs/**/*.ejs",['ejs']);
    gulp.watch("src/js/**/*.js",['webpack']);
    gulp.watch("public/**/*.html").on("change", browser.reload);
    gulp.watch("public/**/*.js").on("change", browser.reload);
});

gulp.task('default',['server','watch']);