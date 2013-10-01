/*global module*/
module.exports = function (grunt) {
  'use strict';

  var _ = require('lodash');
  var globals = _.reduce([
    'Kinetic',
    '$',
    'console', 'process',
    'require', 'define',
    'describe', 'it', 'beforeEach', 'afterEach',
    'expect'
  ], function (acc, name) {
    acc[name] = true;
    return acc;
  }, {});

  grunt.initConfig({
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
      options: {
        indent: 2,
        expr: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        immed: true,
        noarg: true,
        nonew: true,
        plusplus: true,
        quotmark: 'single',
        trailing: true,
        maxparams: 4,
        maxlen: 150,
        browser: true,
        nomen: false,
        jquery: true,
        white: true,
        undef: true,
        globals: globals
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('ci', ['jshint', 'test']);
  grunt.registerTask('default', ['ci']);
};