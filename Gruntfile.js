/*global module*/
module.exports = function (grunt) {
  'use strict';

  var jshintConfig = require('fs').readFileSync('./.jshintrc', { encoding: 'utf8' });
  jshintConfig = JSON.parse(jshintConfig);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        src: [ 'tests/all.js' ],
        options: {
          reporter: 'spec'
        }
      }
    },
    jshint: {
      all: [
        'lib/**/*.js',
        'tests/**/*.js',
        '*.js'
      ],
      options: jshintConfig
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  var exec = require('child_process').exec;
  grunt.registerTask('check_tests', 'Search for temporary filters on tets.', function () {
    var done = this.async();
    var child = exec(
      "git grep '\\.only(' ./tests/ || :",
      { timeout: 9000 },
      function (error, stdout, stderr) {
        if (stdout) {
          console.log('Found filtered tests.\n' + stdout);
          return done(false);
        }
        if (stderr) {
          console.log('Failed to run `git grep`.\n' + stderr);
          done(false);
        }
        if (error) {
          console.log('Command exited with "' + error.code + '", signal "' + error.signal + '".');
          console.log(error);
          done(false);
        }
        done(true);
      }
    );
  });

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('ci', ['jshint', 'test', 'check_tests']);
  grunt.registerTask('default', ['ci']);
};
