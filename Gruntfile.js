module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
        dev:{
            options: {
              port: 8000,
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
      files: [ 'src/**/*' ],
      tasks: [ 'build' ]
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* grunt tasks */
  grunt.registerTask('default', ['server']);
  grunt.registerTask('build', ['assemble', 'copy']);
  grunt.registerTask('server', ['build', 'connect:dev', 'watch']);

};
