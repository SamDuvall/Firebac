module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          paths: ["app/css"]
        },
        files: {
          "build/css/application.css": "app/css/application.less"
        }
      }
    },

    jst: {
      compile: {
        options: {
          prettify: true,
          processName: function(filename) {
            var regEx = /app\/js\/view\/(.+).(?:html)/;
            var match = regEx.exec(filename);
            return match[1];
          }
        },
        files: {
          "build/js/templates.js": ["app/js/view/**/*.html"]
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
        files: ['app/css/**/*.less'],
        tasks: ['less'],
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
      },
      jst: {
        files: ['app/js/**/*.html'],
        tasks: ['jst'],
        options: {
          spawn: false,
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['less', 'jst', 'browserify', 'bower_concat']);

  grunt.registerTask('dev', ['default', 'watch']);
};