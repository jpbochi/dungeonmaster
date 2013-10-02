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

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('ci', ['jshint', 'test']);
  grunt.registerTask('default', ['ci']);
};