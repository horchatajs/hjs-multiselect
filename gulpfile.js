var coffee, gulp, gutil, minify, packageName, pkg, rollup, runSequence, globals, scss, autoprefixer, postcss;

gulp = require("gulp");

gutil = require("gulp-util");

runSequence = require('run-sequence').use(gulp);

rollup = require("rollup");

scss = require("rollup-plugin-scss");

autoprefixer= require("autoprefixer");

postcss= require("postcss");

coffee = require("rollup-plugin-coffee-script");

scss = require("rollup-plugin-scss");

minify = require('rollup-plugin-minify');

pkg = require("./package.json");

packageName = pkg.name.split("/")[1];

globals = {
  'vue': "Vue"
};

gulp.task("dist", function() {
  console.log("Dist");
  return rollup.rollup({
    entry: "./src/" + packageName + ".coffee",
    plugins: [
      coffee(), scss({
        outputStyle: "compressed",
        indentedSyntax: true,
        processor: css => postcss([autoprefixer({browsers: ["last 2 versions"]})])
          .process(css)
          .then(result => result.css),
        output: "dist/" + packageName + ".min.css",
      }), minify({
        umd: "dist/" + packageName + ".min.js"
      })
    ],
    external: ['vue']
  }).then(function(bundle) {
    var options;
    options = {
      sourceMap: true,
      moduleName: "HjsMultiselect",
      format: "umd",
      exports: "default",
      dest: "dist/" + packageName + ".js",
      globals: globals
    };
    return bundle.write(options);
  });
});


gulp.task("watchfiles", function() {
  console.log("Watchfiles");
  return gulp.watch("./src/**/**/**/*.coffee", function(callback) {
    return runSequence("dist");
  });
});

gulp.task("default", function(callback) {
  if (callback == null) {
    callback = function() {};
  }
  runSequence('dist');
  return runSequence("watchfiles");
});
