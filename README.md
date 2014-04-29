# grunt-requirejs-config-generator

> concatenating config specified into json files into final requirejs config file

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-config-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-config-generator');
```

## The "requirejs_config_generator" task

### Overview
In your project's Gruntfile, add a section named `requirejs_config_generator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs_config_generator: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content
```json
{
 "baseUrl": "",
 "deps": [],
 "paths": {},
 "shim": {}
}
```
and the `123` file had the content
```json
{
  "deps": ["deps0"],
  "paths": {
    "util": "util",
    "common": "common"
  },
  "shim": {
    "jquery": {
      "exports": "jQuery"
    }
  }
}
```
, the generated result would be
```js
requirejs.config({"baseUrl":"","deps":["deps0"],"paths":{"util":"util","common":"common"},"shim":{"jquery":{"exports":"jQuery"}}});
```

```js
grunt.initConfig({
  requirejs_config_generator: {
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
ver 0.1.0 base functionality