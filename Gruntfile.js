module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
        dev:{
            options: {
              port: 5555,
              base: './dist/',
              livereload: true
            }
      }
    },

    /* assemble templating */
    assemble: {
      options: {
        collections: [
          {
            name: 'experience',
            sortby: 'startdate',
            sortorder: 'descending'
          },
          {
            name: 'portfolio',
            sortby: 'order',
            sortorder: 'ascending'
          }
        ],
        helpers: './src/bonnet/helpers/**/*.js',
        layout: 'resume.hbs',
        layoutdir: './src/bonnet/layouts/',
        partials: './src/bonnet/partials/**/*',
        data: './src/data/*.yaml',
        assets: 'src/assets'
      },
      posts: {
        files: [{
          cwd: './src/content/',
          dest: './dist/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          cwd: './src/content/_pages/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['**'], dest: 'dist/assets', cwd: 'src/assets'},
        ],
      },
    },

    watch: {
      files: [ 'src/**/*', '!src/assets/css' ],
      tasks: [ 'build' ]
  },


    less: {
        build: {
            options:{
                paths: ["src/css"]
            },
            files:{
                    "src/assets/css/app.css": "src/css/app.less",
                    "src/assets/css/print.css": "src/css/print.less"
            }
        }
    },

    cssmin:{
        combine: {
            files: {
                'src/assets/css/app.min.css': ['src/assets/css/app.css'],
                'src/assets/css/print.min.css': ['src/assets/css/print.css']
            }
        }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  /* grunt tasks */
  grunt.registerTask('default', ['server']);
  grunt.registerTask('build', ['assemble', 'less', 'cssmin', 'copy']);
  grunt.registerTask('server', ['build', 'connect:dev', 'watch']);

};
