/*
 * grunt-migrate
 *
 * Copyright (c) 2013 Travis McHattie, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    'use strict';

    // Make an empty dir for testing as git doesn't track empty folders.
    grunt.file.mkdir('test/fixtures/empty_folder');

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            test: ['migrations']
        },


        // Configuration to be run (and then tested).
        migrate : {
            up : "",
            create: "",
            down: "",
            options: {
                binaryPath: process.env.PWD + "/node_modules/.bin/migrate"
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-internal');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt.registerTask('test', ['clean', 'migrate', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean', 'migrate']);
};