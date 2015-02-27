/*
 * grunt-requirejs-config-generator
 * https://github.com/fustic/grunt-requirejs-config-generator
 *
 * Copyright (c) 2014 Vadim Ivanov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('requirejs_config_generator', 'concatenating into final requirejs config file', function() {
    var _extend = function (dest, source) {
      var
        objKey;
      for (objKey in source) {
        dest[objKey] = source[objKey];
      }
      return dest;
    };
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var requirejsConfig = {
        baseUrl: '',
        deps: [],
        paths: {},
        shim: {}
      };
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.readJSON(filepath);
      }).forEach(function(config) {
        if (config.baseUrl) {
          requirejsConfig.baseUrl = config.baseUrl;
        }
        if (config.deps) {
          requirejsConfig.deps = requirejsConfig.deps.concat(config.deps);
        }
        if (config.paths) {
          requirejsConfig.paths = _extend(requirejsConfig.paths, config.paths);
        }
        if (config.shim) {
          requirejsConfig.shim = _extend(requirejsConfig.shim, config.shim);
        }
      });

      var src = 'requirejs.config(' + JSON.stringify(requirejsConfig) + ');';
      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
