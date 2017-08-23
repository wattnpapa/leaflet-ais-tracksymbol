/* global module */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
            src: ['bower_components/leaflet.contextmenu/dist/leaflet.contextmenu.js',
                'bower_components/leaflet-tracksymbol/leaflet-tracklayer.js',
                'bower_components/leaflet-tracksymbol/leaflet-tracksymbol.js',
                'bower_components/moment/min/moment.min.js',
                'bower_components/moment/locale/de.js',
                'bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
                'src/*.js'],
            dest: 'dist/<%= pkg.name %>.js'
          }
        },

        jshint: {
            all: ['src/*.js']
        },

        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/<%= pkg.name %>.css': ['src/*.css','bower_components/leaflet.contextmenu/dist/leaflet.contextmenu.css']
                }
            }
        },

        csslint: {
            strict: {
                src: ['src/*.css']
            }
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
    grunt.registerTask('develop', ['concat', 'csslint', 'jshint']);
    grunt.registerTask('default', ['concat', 'csslint', 'jshint', 'uglify', 'cssmin']);
};
