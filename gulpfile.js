// 引入gulp
var gulp = require('gulp');
// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var fs = require('fs');
var replace = require('gulp-replace');
 var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin'); //图片压缩
var pngcrush = require('imagemin-pngcrush');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

//公共头部、底部
//建议不要这么用。这样运行时重写文件对版本控制很不利。用别的方式完成公共部分的重用
// gulp.task('nav', function() {
//     var htmlDir = 'public/home/';
//     var replaceDir = 'public/home/';
//     fs.readdir(htmlDir, function(err, files) {
//         if (err) {
//             console.log(err);
//         } else {
//             files.forEach(function(f) {
//                 if (f !== 'head.html' && f !== 'footer.html') {
//                     gulp.src(htmlDir + f)
//                         .pipe(replace(/<!--nav-->[\s\S]*<!--navend-->/, '<!--nav-->\n' + fs.readFileSync(replaceDir + 'head.html', 'utf-8') + '\n<!--navend-->'))
//                          .pipe(replace(/<!--footer-->[\s\S]*<!--footerend-->/, '<!--footer-->\n' + fs.readFileSync(replaceDir + 'footer.html', 'utf-8') + '\n<!--footerend-->'))
//                         .pipe(gulp.dest(htmlDir))
//
//                 }
//             });
//         }
//     });
// });
// 合并、压缩js
gulp.task('js', function() {
    var jsSrc = 'src/js/*.js',
        jsDist = 'public/js/';
    gulp.src(jsSrc).pipe(gulp.dest(jsDist));
});
// 编译sass
gulp.task('sass', function() {
    var cssSrc = 'src/sass/*.scss',
        cssDist = 'public/css/';
    gulp.src(cssSrc).pipe(sass()).pipe(gulp.dest(cssDist));
});
gulp.task('connect', function() {
    connect.server({
        livereload: true,
        root: 'public',
        port: 8585,
	
	//下面的代理其实在这个项目里没有用处	
            middleware: function(connect, opt) {
                return [
		    proxy(['/Card','/DataPlanOrder','/DataPlanOrderView','/DataPlanView','/OrderPayRecorder'],{target: 'http://54.255.145.79:80/'}),
                ]
            }
    });
});
gulp.task('index', function(){
	gulp.src('./public/home/index.html').pipe(connect.reload());
});
gulp.task('watch', function() {
     gulp.watch('public/css/*.css');//监控css文件
    gulp.watch('src/js/*.js',['js']); //监控js文件
    gulp.watch(['public/home/*.html']); //监控html文件
}); //执行gulp server开
// 启动服务
gulp.task('default', function() {
    gulp.run(['connect','watch']);
});
