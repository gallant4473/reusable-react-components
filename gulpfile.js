const rename = require('gulp-rename')
const merge = require('merge-stream')
const prefix = require('gulp-autoprefixer')
const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const glob = require('glob')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

const scssIndexSrc = glob.sync('src/components/**/index.scss')
const scssMainSrc = glob.sync('src/components/**/styles/_main.scss')
const scssVariablesSrc = glob.sync('src/components/**/styles/_variables.scss')
const CONFIG = {
  scripts: {
    src: ['src/**/*.js', '!src/__mocks__/**/*', '!src/**/__tests__/**/*'],
    dest: 'build',
  },
  css: {
    src: scssIndexSrc,
    dest: scssIndexSrc.map(i =>
      i.replace('src', 'build').replace('/index.scss', '')
    ),
  },
  scss: {
    src: scssMainSrc,
    dest: scssMainSrc.map(i =>
      i.replace('src', 'build').replace('styles/_main.scss', '')
    ),
  },
  scssVariables: {
    src: scssVariablesSrc,
    dest: scssVariablesSrc.map(i =>
      i.replace('src', 'build').replace('styles/_variables.scss', '')
    ),
  },
}

function clean() {
  return del(['build'])
}

function compileScripts() {
  const { src, dest } = CONFIG.scripts
  return gulp
    .src(src)
    .pipe(babel())
    .pipe(gulp.dest(dest))
}

function compileSCSSFile(src, dest) {
  return gulp
    .src(src)
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      prefix({
        browsers: ['last 2 versions'],
      })
    )
    .pipe(rename('index.css'))
    .pipe(gulp.dest(dest))
}

function compileSCSS() {
  const { src, dest } = CONFIG.css
  return merge(...src.map((i, j) => compileSCSSFile(src[j], dest[j])))
}

function copyFile(src, dest, name) {
  return gulp
    .src(src)
    .pipe(rename(name))
    .pipe(gulp.dest(dest))
}

function copySCSS() {
  const { src, dest } = CONFIG.scss
  return merge(...src.map((i, j) => copyFile(src[j], dest[j], 'index.scss')))
}

function copySCSSVariables() {
  const { src, dest } = CONFIG.scssVariables
  return merge(
    ...src.map((i, j) => copyFile(src[j], dest[j], 'variables.scss'))
  )
}

const compile = gulp.parallel(
  compileScripts,
  compileSCSS,
  copySCSS,
  copySCSSVariables
)

exports.default = gulp.series(clean, compile)
