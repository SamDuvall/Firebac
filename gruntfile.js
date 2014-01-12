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
          'build/css/application.css': 'app/css/application.scss'
        }
      }
    },

    browserify: {
      application: {
        src: ['app/js/application.js'],
        dest: 'build/js/application.js',
        options: {
          debug: true
        }
      }
    },

    bower_concat: {
      all: {
        dest: 'build/js/lib.js',
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
        files: ['app/css/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      js: {
        files: ['app/js/**/*.js'],
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