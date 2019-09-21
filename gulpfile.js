const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const uglify = require('gulp-uglify');

gulp.task('html', function(){
  return gulp.src('src/templates/**/*.html')
  .pipe(gulp.dest('development'));
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('development/js'));
})

gulp.task('sass', function(){
  return gulp.src('src/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
        browsers: ['last 8 versions'],
        cascade: false
    }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('development/css'));
})

gulp.task('img', function(){
  return gulp.src('src/images/content/**/*.*')
  .pipe(imagemin())
  .pipe(gulp.dest('development/images'));
})

gulp.task('sprite', function(){
  var spriteData = 
    gulp.src('src/images/sprite/*.*')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        imgPath: '../images/sprite.png',

      }));
      spriteData.img.pipe(gulp.dest('development/images'));
      spriteData.css.pipe(gulp.dest('src/sass'));
      return spriteData;
});

gulp.task('watch', function(){
  gulp.watch('src/templates/**/*.html', gulp.series('html'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/images/content/**/*.*', gulp.series('img'));
})

gulp.task('serve', function(){
  browserSync.init({
    server: 'development'
  });
  browserSync.watch('development/**/*.*').on('change', browserSync.reload);
});


gulp.task('default',
  gulp.series('html', 'js', 'sass','img', 'sprite')
);

gulp.task('dev',
  gulp.series('default', gulp.parallel('watch', 'serve'))
);





gulp.task('sassProduction', function(){
  return gulp.src('src/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
        browsers: ['last 8 versions'],
        cascade: false
    }))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('development/css'));
})

gulp.task('jsProduction', function(){
  return gulp.src('src/js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('development/js'));
})

gulp.task('production',
  gulp.series('html', 'jsProduction', 'sassProduction')
);