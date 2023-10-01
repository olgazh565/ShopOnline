import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import {deleteSync} from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';
import {stream as critical} from 'critical';
import gulpIf from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

const sass = gulpSass(sassPkg);

let dev = true;

// задачи

// обработка html файлов
export const html = () => gulp
        .src('src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

// обработка scss файлов
export const style = () => gulp
        .src('src/assets/scss/**/*.scss')
        .pipe(gulpIf(dev, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            2: {
                specialComments: 0,
            },
        }))
        .pipe(gulpIf(dev, sourcemaps.write('../maps')))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());

const webpackConf = {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'eval-source-map' : false,
    optimization: {
        minimize: false,
    },
    output: {
        filename: 'index.js',
    },
    module: {
        rules: [],
    },
};

if (!dev) {
    webpackConf.module.rules.push({
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
    });
}

// обработка js файлов
export const js = () => gulp
        .src('src/assets/script/**/*.js')
        .pipe(plumber())
        .pipe(webpackStream(webpackConf, webpack))
        .pipe(gulpIf(!dev, gulp.dest('dist/js')))
        .pipe(gulpIf(!dev, terser()))
        .pipe(rename({
            suffix: '.min',
        }),
        )
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());

// функция копирования изображений
export const images = () => gulp
        .src('src/assets/imgs/*')
        .pipe(gulpIf(!dev, gulpImg({
            optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
            pngquant: ['--speed=1', '--force', 256],
            zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
            jpegRecompress:
                ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
            mozjpeg: ['-optimize', '-progressive'],
            gifsicle: ['--optimize'],
            svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
        })))
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream({
            once: true,
        }));

// конвертирование изображений в webp
export const webp = () => gulp
        .src('src/assets/imgs/**/*.{jpg,jpeg,png}')
        .pipe(gulpWebp({
            quality: 60,
        }))
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream({
            once: true,
        }));

// конвертирование изображений в avif
export const avif = () => gulp
        .src('src/assets/imgs/**/*.{jpg,jpeg,png}')
        .pipe(gulpAvif({
            quality: 50,
        }))
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream({
            once: true,
        }));

// критические стили
export const critCSS = () => gulp
        .src('dist/index.html')
        .pipe(critical({
            base: 'dist/',
            inline: true,
            css: ['dist/css/index.css'],
        }))
        .on('error', err => {
            console.error(err.message);
        })
        .pipe(gulp.dest('dist'));

// функция копирования шрифтов
export const fonts = () => gulp
        .src('src/assets/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream({
            once: true,
        }));

// gulp server
export const server = () => {
    browserSync.init({
        ui: false,
        notify: false,
        tunnel: true,
        server: {
            baseDir: 'dist',
        },
    });

    gulp.watch('./src/**/*.html', html);
    gulp.watch('./src/assets/scss/**/*.scss', style);
    gulp.watch('./src/assets/script/**/*.js', js);
    gulp.watch('./src/assets/imgs/*', images);
    gulp.watch('./src/assets/fonts/* ', fonts);
};

// очистка папки dist
export const clear = (done) => {
    deleteSync(['dist/**/*'], {
        force: true,
    });
    done();
};

// запуск

export const develop = async () => {
    dev = true;
};

export const base = gulp.parallel(html, style, js, images, avif, webp, fonts);

export const build = gulp.series(clear, base, critCSS);

export default gulp.series(develop, base, server);
