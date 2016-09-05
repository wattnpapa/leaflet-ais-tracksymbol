/* global module */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
            src: ['src/*.js','src/label/*.js','node_modules/leaflet-tracksymbol/leaflet-tracklayer.js','node_modules/leaflet-tracksymbol/leaflet-tracksymbol.js'],
            dest: 'dist/<%= pkg.name %>.js'
          }
        },

        jshint: {
            all: ['src/*.js','src/label/*.js']
        },

        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/<%= pkg.name %>.css': ['src/*.css','src/label/*.css']
                }
            }
        },

        csslint: {
            strict: {
                src: ['src/*.css','src/label/*.css']
            },
        },

        
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Copyright by <%= pkg.author.name %> <%= pkg.author.email %> */\n'
          },
          build: {
            src: 'dist/<%= pkg.name %>.js',
            dest: 'dist/<%= pkg.name %>.min.js'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('check', ['jshint', 'csslint']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('jenkins', ['jshint', 'qunit']);
    grunt.registerTask('default', ['concat', 'csslint', 'jshint', 'uglify', 'cssmin']);
};
