/*
 * grunt-css-selectors
 * https://github.com/ericf/grunt-css-selectors
 *
 * Copyright 2013 Yahoo! Inc.
 * Licensed under the Yahoo! Inc. BSD license.
 */

'use strict';

var rework    = require('rework'),
    selectors = require('rework-mutate-selectors'),
    EOL       = require('os').EOL;

module.exports = function (grunt) {

    grunt.registerMultiTask('css_selectors', 'Mutate CSS selectors.', function () {
        var options  = this.options({
            mutations: [],
            indent   : '    '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (fileGroup) {
            var cssString = fileGroup.src.map(function (file) {
                var css = rework(grunt.file.read(file));

                options.mutations.forEach(function (m) {
                    if (m.prefix) {
                        return css.use(selectors.prefix(m.prefix));
                    }

                    if (m.replace) {
                        return css.use(selectors.replace(m.search, m.replace));
                    }
                });
                return css.toString(options); 
            });
            grunt.file.write(fileGroup.dest, cssString.join(EOL));
            grunt.log.writeln('File "' + fileGroup.dest + '" created.');
        });
    });

};
