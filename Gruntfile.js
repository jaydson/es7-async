module.exports = function(grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);
    var babelify = require('babelify');

    grunt.initConfig({

        'babel': {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/main.js': 'src/main.js'
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'dist/main.js': ['src/**/*.js'],
                },
                options: {
                    //"transform": [["babelify", { "optional": ["es7.asyncFunctions"], sourceMap: true }]]
                    transform: [
                        babelify.configure({
                            stage: 0,
                            sourceMaps: 'inline'
                        })
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', ['browserify']);

};