# プラグインの読み込み
gulp         = require "gulp"
sass         = require "gulp-ruby-sass"    # Sassのコンパイル
autoprefixer = require "gulp-autoprefixer" # ベンダープレフィックスを自動で追加
ejs          = require "gulp-ejs"          # EJSのコンパイル
rename       = require "gulp-rename"       # ファイルパスの変更
plumber      = require "gulp-plumber"      # エラー制御
notify       = require "gulp-notify"       # デスクトップ通知
browserSync  = require "browser-sync"      # リアルタイムプレビュー
cache        = require "gulp-cached"       # 変更したファイルのみコンパイル
runSequence  = require "run-sequence"      # 同期処理
ignore       = require "gulp-ignore"       # 取得ファイルから無視するパターンを追加

# エラー処理
onError = (err) ->
  notify.onError(
    title: "Error"
    subtitle: "Failure!"
    message: "Error: <%= error.message %>"
    sound: "Pop"
  )(err)

  this.emit "end"


###
 EJSのコンパイル [gulp ejs]
###
gulp.task "ejs", ->
  gulp.src ["*.ejs"]
    .pipe cache 'ejs'
    .pipe plumber errorHandler: onError
    .pipe rename extname: ".html"
    .pipe gulp.dest "./"

###
 Sass [gulp sass]
###
gulp.task "sass", ->
  sass ["*.scss"], style: 'expanded'
    .pipe cache 'sass'
    .pipe plumber errorHandler: onError
    .pipe autoprefixer 'last 2 version'
    .pipe gulp.dest "./"

###
 watchタスク
###
gulp.task "watch", (callback) ->
  runSequence ['ejs', 'sass'],
    ['browserSync'],
    callback

  gulp.watch "./*.ejs", ["ejs"]
  gulp.watch "./*.scss", ["sass"]

gulp.task "default", ["watch"]


###
 リアルタイムプレビュー [gulp browserSync]
###
gulp.task "browserSync", ->
  browserSync.init
    server:
      baseDir: "./"
      middleware: (req, res, next) ->
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()

  gulp.watch "*.{html,css}", ->
    browserSync.reload()


###
 watchタスク
 coffee,scssのコンパイル
###
gulp.task "watch", ["ejs","sass"], ->
  gulp.watch "*.ejs", ["ejs"]
  gulp.watch "*.scss", ["sass"]

gulp.task "default", ["watch","browserSync"]
