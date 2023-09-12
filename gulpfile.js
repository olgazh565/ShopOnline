import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssimport from 'gulp-cssimport';
import {deleteSync} from 'del';

// задачи

export const html = () => gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

export const css = () => gulp
        .src('src/assets/css/index.css')
        .pipe(gulpCssimport({
            extensions: ['css'],
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());

export const js = () => gulp
        .src('src/assets/script/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());

// функция копирования изображений
export const images = () => gulp
        .src('src/assets/imgs/*')
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream({
            once: true,
        }));

// функция копирования шрифтов
export const fonts = () => gulp
        .src('src/assets/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream({
            once: true,
        }));

export const server = () => {
    browserSync.init({
        ui: false,
        notify: false,
        // tunnel: true,
        server: {
            baseDir: 'dist',
        },
    });

    gulp.watch('./src/**/*.html', html);
    gulp.watch('./src/assets/css/*.css', css);
    gulp.watch('./src/assets/script/**/*.js ', js);
    gulp.watch('./src/assets/imgs/*', images);
    gulp.watch('./src/assets/fonts/* ', fonts);
};

export const clear = (done) => {
    deleteSync(['dist/**/*'], {
        force: true,
    });
    done();
};

// запуск

export const base = gulp.parallel(html, css, js, images, fonts);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);
