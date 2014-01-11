module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded'
        },
        files: {
          'css/build/application.css': 'css/application.scss'
        }
      }
    },

    browserify: {
      application: {
        src: ['js/application.js'],
        dest: 'js/build/application.js'
      }
    },

    bower_concat: {
      all: {
        dest: 'js/build/lib.js',
        dependencies: {
          'backbone': ['jquery', 'underscore']
        },
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      js: {
        files: ['js/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass', 'browserify', 'bower_concat']);

  grunt.registerTask('dev', ['watch']);
};