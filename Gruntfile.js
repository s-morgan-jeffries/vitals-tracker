// Generated on 2014-10-07 using generator-static-site 0.0.1
// jshint node: true
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // This one has to be specified explicitly (doesn't have 'grunt' in the name)
  grunt.loadNpmTasks('assemble');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      src: 'src',
      temp: '.tmp',
      dist: 'dist'
    },

//    assemble: {
//      options: {
//        // Don't use this. We're using the base_layout.hbs file for usemin, so we
////        assets: 'assets',
//        // No plugins for now
////        plugins: ['permalinks'],
//        partials: ['<%= yeoman.src %>/views/partials/**/*.hbs'],
//        layoutdir: '<%= yeoman.src %>/views/layouts',
//        data: '<%= yeoman.src %>/data/**/*.{json,yml}',
//        flatten: true
//      },
//      static: {
//        options: {
//          layout: 'standard_layout.hbs'
//        },
//        src: ['<%= yeoman.src %>/views/static/**/*.hbs'],
//        dest: '<%= yeoman.temp %>/'
//      }
//    },
    assemble: {
      options: {
        // Don't use this. We're using the base_layout.hbs file for usemin, so we
//        assets: 'assets',
        // No plugins for now
//        plugins: ['assemble-middleware-lunr'],
        helpers: [],
        partials: ['<%= yeoman.src %>/views/partials/**/*.hbs'],
        layoutdir: '<%= yeoman.src %>/views/layouts',
        data: '<%= yeoman.src %>/data/**/*.{json,yml}',
        flatten: true
      },
      static: {
        expand: true,
        cwd: '<%= yeoman.src %>/views/pages',
        src: [
          './**/*.hbs'
        ],
        dest: '<%= yeoman.temp %>/'
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      build: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    bump: {
      options: {
        files: ['bower.json', 'package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['bower.json', 'package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        // NEVER change this.
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },

    // Replace Google CDN references
    cdnify: {
      build: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Empties folders to start fresh
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/CNAME'
          ]
        }]
      },
      server: '.tmp'
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'stylus:server'
      ],
      test: [
        'stylus:build'
      ],
      build: [
        'stylus:build',
        'imagemin',
        'svgmin'
      ]
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      develop: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.src %>'
          ],
          livereload: 35729
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.src %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      build1: {
        expand: true,
        cwd: '<%= yeoman.src %>/views/layouts/',
        src: 'base_layout.hbs',
        dest: '<%= yeoman.temp %>'
      },
      build2: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.src %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/{,*/}*.html',
              'images/{,*/}*.{webp}',
              'fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: '.tmp',
            dest: '<%= yeoman.dist %>',
            src: ['**/*.html']
          },
          // You have to have this to copy fonts
          {
            expand: true,
            cwd: '<%= yeoman.src %>',
            dest: '<%= yeoman.dist %>',
//            src: ['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'],

            src: [
              'bower_components/**/*.eot',
              'bower_components/**/*.svg',
              'bower_components/**/*.ttf',
              'bower_components/**/*.woff'
            ]
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        root: '<%= yeoman.src %>'
      }
    },

    htmlmin: {
      build: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      scripts: {
        src: [
          '<%= yeoman.src %>/scripts/**/*.js'
        ]
      },
//      e2eTests: {
//        options: {
//          jshintrc: 'test/e2e/.jshintrc'
//        },
//        src: ['test/e2e/spec/{,*/}*.js']
//      },
      integrationTests: {
        options: {
          jshintrc: 'test/integration/.jshintrc'
        },
        src: ['test/integration/spec/**/*.js']
      },
      unitTests: {
        options: {
          jshintrc: 'test/unit/.jshintrc'
        },
        src: ['test/unit/spec/**/*.js']
      }
    },

    // Test settings
    karma: (function () {

      var config = {},
        sharedConfig = config.options = {},
        commonTestFiles = [
          // The files up top
          // Add polyfill for bind, which is missing from PhantomJS
          './test/bindPolyfill.js',
          // Add jasmine-matchers
          './node_modules/jasmine-expect/dist/jasmine-matchers.js',
          // Add sinon
          './src/bower_components/sinonjs/sinon.js',
          './src/bower_components/jasmine-sinon/lib/jasmine-sinon.js',
          './test/karmaMain.js',
          // Anything defined as an AMD module goes below. You have to use the file object notation so you can
          // explicitly set included to false.
          {pattern: './node_modules/squirejs/src/Squire.js', included: false},
          // Utilities (if any)
          {pattern: './src/bower_components/backbone/backbone.js', included: false},
          {pattern: './src/bower_components/moment/moment.js', included: false},
          {pattern: './src/bower_components/underscore/underscore.js', included: false},
          // The source files for the scripts under test
          {pattern: './src/scripts/**/*.js', included: false},
          // These are all the tests.
//          {pattern: './test/unit/spec/**/*.js', included: false},
          // And the helpers (NB: All of the files in here need to be defined as AMD modules)
          {pattern: './test/helpers/**/*.js', included: false}
        ],
        unitTestFiles = commonTestFiles.concat([{pattern: './test/unit/spec/**/*.js', included: false}]),
        integrationTestFiles = commonTestFiles.concat([{pattern: './test/integration/spec/**/*.js', included: false}]);

      sharedConfig.basePath = '../../';
      sharedConfig.exclude = ['./src/scripts/main.js'];
      sharedConfig.singleRun = true;

      config.unitCI = {
        configFile: 'test/unit/karma.unit.ci.conf.js',
        options: {
          files: unitTestFiles
        }
      };
      config.unitBuild = {
        configFile: 'test/unit/karma.unit.build.conf.js',
        options: {
          files: unitTestFiles
        }
      };
      config.unitTravis = {
        configFile: 'test/unit/karma.unit.travis.conf.js',
        options: {
          files: unitTestFiles
        }
      };
      config.integrationCI = {
        configFile: 'test/integration/karma.integration.ci.conf.js',
        options: {
          files: integrationTestFiles
        }
      };
      config.integrationBuild = {
        configFile: 'test/integration/karma.integration.build.conf.js',
        options: {
          files: integrationTestFiles
        }
      };
      config.integrationTravis = {
        configFile: 'test/integration/karma.integration.travis.conf.js',
        options: {
          files: integrationTestFiles
        }
      };

      return config;

    }()),

    react: {
      develop: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.src %>/react_components',
            src: ['**/*.jsx'],
            dest: '<%= yeoman.src %>/scripts/react_components',
            ext: '.js'
          }
        ]
      }
    },

    replace: {
      develop: {
        options: {
          patterns: [
            {
              match: '../../bower_components',
              replacement: 'bower_components'
            }
          ],
          usePrefix: false
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= yeoman.src %>/views/layouts/base_layout.hbs'],
            dest: '<%= yeoman.src %>/views/layouts/'
          }
        ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      build: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    'sprite': {
      'all': {
        // Sprite files to read in
        'src': ['<%= yeoman.src %>/images/sprites/**/*.png'],

        // Location to output spritesheet
        'destImg': '<%= yeoman.src %>/images/sprite.png',

        // Stylus with variables under sprite names
        'destCSS': '<%= yeoman.src %>/styles/components/sprite_map.styl',

        // OPTIONAL: Manual override for imgPath specified in CSS
//        'imgPath': '../sprite.png',

        // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
        // alt-diagonal [/ format], binary-tree [best packing])
        // Visual representations can be found below
//        'algorithm': 'alt-diagonal',

        // OPTIONAL: Specify padding between images
//        'padding': 2,

        // OPTIONAL: Specify engine (auto, phantomjs, canvas, gm, pngsmith)
//        'engine': 'canvas',

        // OPTIONAL: Specify CSS format (inferred from destCSS' extension by default)
        // (stylus, scss, scss_maps, sass, less, json, json_array, css)
        //        'cssFormat': 'json',

        // OPTIONAL: Specify a function or Mustache template to use for rendering destCSS
        // Mutually exclusive to cssFormat
        // More information can be found below
        'cssTemplate': 'node_modules/spritesmith-stylus/sprite_positions.styl.mustache'

        // OPTIONAL: Map variable of each sprite
//        'cssVarMap': function (sprite) {
//          // `sprite` has `name`, `image` (full path), `x`, `y`
//          //   `width`, `height`, `total_width`, `total_height`
//          // EXAMPLE: Prefix all sprite names with 'sprite-'
//          sprite.name = 'sprite-' + sprite.name;
//        },

        // OPTIONAL: Specify settings for algorithm
//        'algorithmOpts': {
//          // Skip sorting of images for algorithm (useful for sprite animations)
//          'sort': false
//        },

        // OPTIONAL: Specify settings for engine
//        'engineOpts': {
//          'imagemagick': true
//        },

        // OPTIONAL: Specify img options
//        'imgOpts': {
//          // Format of the image (inferred from destImg' extension by default) (jpg, png)
        //          'format': 'png',
//
//          // gm only: Quality of image
//          'quality': 90,
//
//          // phantomjs only: Milliseconds to wait before terminating PhantomJS script
//          'timeout': 10000
//        },

        // OPTIONAL: Specify css options
//        'cssOpts': {
//          // Some templates allow for skipping of function declarations
//          'functions': false,
//
//          // CSS template allows for overriding of CSS selectors
//          'cssClass': function (item) {
//            return '.sprite-' + item.name;
//          }
//        }
      }
    },

    stylus: {
      options: {
        paths: [
          '<%= yeoman.src %>/styles',
          '<%= yeoman.src %>/bower_components',
          'node_modules'
        ]
//          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
//          use: [
//            function () {
//              return testPlugin('yep'); // plugin with options
//            },
//            require('fluidity') // use stylus plugin at compile time
//          ]
//          ,
//          import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
//            'foo',       //  that is compiled. These might be findable based on values you gave
//            'bar/moo'    //  to `paths`, or a plugin you added under `use`
//          ]
      },
      server: {
        options: {
          compress: false,
          linenos: true
        },
        files: {
          '<%= yeoman.src %>/styles/style.css': ['<%= yeoman.src %>/styles/style.styl']
        }
      },
      build: {
        options: {
          compress: false,
          linenos: false
        },
        files: {
          '<%= yeoman.src %>/styles/style.css': ['<%= yeoman.src %>/styles/style.styl']
        }
      }
    },


    svgmin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.temp %>/base_layout.hbs',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.src %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:gruntfile']
      },
//      bower: {
//        files: ['bower.json'],
//        tasks: ['wiredep', 'replace:develop']
//      },
      handlebars: {
        files: ['<%= yeoman.src %>/views/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          livereload: true
        }
      },
      react: {
        files: ['<%= yeoman.src %>/react_components/**/*.jsx'],
        tasks: ['react']
      },
      stylus: {
        files: ['<%= yeoman.src %>/styles/**/*.styl'],
        tasks: ['stylus:server', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['<%= yeoman.src %>/scripts/**/*.js'],
        tasks: ['jshint:scripts'],
        options: {
          livereload: true
        }
      },
      integrationTests: {
        files: ['test/integration/spec/**/*.js'],
        tasks: ['jshint:integrationTests', 'karma:integrationCI']
      },
      unitTests: {
        files: ['test/unit/spec/**/*.js'],
        tasks: ['jshint:unitTests', 'karma:unitCI']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.src %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }

//    // Automatically inject Bower components into the html
//    wiredep: {
//      src: {
//        src: ['<%= yeoman.src %>/views/layouts/base_layout.hbs'],
//        exclude: [
//          '<%= yeoman.src %>/bower_components/json3/lib/json3.min.js',
//          '<%= yeoman.src %>/bower_components/es5-shim/es5-shim.js'
//        ],
//        bowerJson: require('./bower.json'),
//        directory: '<%= yeoman.src %>/bower_components',
//        cwd: '<%= yeoman.src %>/views/layouts'
//      }
//    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
//      'wiredep',
      'replace:develop',
      'sprite',
      'assemble',
      'react',
      'concurrent:server',
      'autoprefixer',
      'connect:develop',
      'watch'
    ]);
  });

//  grunt.registerTask('serve', function (target) {
//    if (target === 'dist') {
//      return grunt.task.run(['build', 'connect:dist:keepalive']);
//    }
//
//    grunt.task.run([
//      'clean:server',
//      'wiredep',
//      'replace:develop',
//      'assemble',
//      'concurrent:server',
//      'autoprefixer',
//      'connect:develop',
//      'watch'
//    ]);
//  });

//  grunt.registerTask('test', [
//    'clean:server',
//    'concurrent:test',
//    'autoprefixer',
//    'connect:test',
//    'karma:unitBuild'
//  ]);



  grunt.registerTask('test', function (target) {
    var setUpTasks = [
        'clean:server',
        'connect:test'
      ],
      unitTasks = [
        'karma:unitBuild'
      ],
      integrationTasks = [
        'karma:integrationBuild'
      ],
      e2eTasks = [
        'protractor:build'
      ],
      travisTasks = [
        'karma:unitTravis',
        'karma:integrationTravis'
      ],
      tasks;
    if (target === 'unit') {
      tasks = setUpTasks.concat(unitTasks);
    } else if (target === 'integration') {
      tasks = setUpTasks.concat(integrationTasks);
    } else if (target === 'e2e') {
      tasks = setUpTasks.concat(e2eTasks);
    } else if (target === 'travis') {
      tasks = setUpTasks.concat(travisTasks);
    } else {
//      tasks = setUpTasks.concat(unitTasks).concat(integrationTasks).concat(e2eTasks);
      tasks = setUpTasks.concat(unitTasks).concat(integrationTasks);
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('travis', [
    'test:travis'
  ]);

//  grunt.registerTask('build', [
//    'clean:build',
//    'wiredep',
//    'replace',
//    'assemble',
//    'copy:build1',
//    'useminPrepare',
//    'concurrent:build',
//    'autoprefixer',
//    'concat',
//    'copy:build2',
//    'cdnify',
//    'cssmin',
//    'uglify',
//    'rev',
//    'usemin',
//    'htmlmin'
//  ]);


  grunt.registerTask('build', function (target) {
    var buildTasks = [
      'clean:build',
//      'wiredep',
      'replace',
      'assemble',
      'copy:build1',
      'useminPrepare',
      'concurrent:build',
      'autoprefixer',
      'concat',
      'copy:build2',
      'cdnify',
      'cssmin',
      'uglify',
      'rev',
      'usemin',
      'htmlmin'
    ];

    if (target === 'serve') {
      return grunt.task.run(buildTasks.concat(['serve:dist']));
    }

    grunt.task.run(buildTasks);
  });

  grunt.registerTask('default', [
    'jshint',
//    'test',
    'build'
  ]);

  grunt.registerTask('opts', function () {
    console.log(grunt.config('karma').unitCI.files);
  });
};
