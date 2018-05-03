var flarum = require('flarum-gulp');

flarum({
  modules: {
    'sidharthmenon/flarum-screenshot': [
      'src/**/*.js'
    ]
  }
});