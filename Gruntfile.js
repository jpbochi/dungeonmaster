/*global module*/
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    mochaTest: {
      test: {
        src: [ 'tests/all.js' ],
        options: {
          reporter: 'spec' //'mocha-unfunk-reporter'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['test']);
};