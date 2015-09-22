module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'dist/st.min.js',
      'test/unit/**/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS2'],
    plugins: [
      'karma-phantomjs2-launcher',
      'karma-jasmine'
    ],
    singleRun: false
  });
};
