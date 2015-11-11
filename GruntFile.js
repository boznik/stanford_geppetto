module.exports = function(grunt) {

  // Declare vars.
  var masterConfig = {};
  masterConfig = {
    availabletasks: {
      tasks: {}
    },
    // ------------------------------------------------------------------------.
    prompt: {
      product: {
        options: {
          questions: [
            {
              config: 'build.product',
              type: 'list', // list, checkbox, confirm, input, password
              message: "Which product would you like to install?",
              default: getProductTypesDefault(grunt),
              choices: getProductTypes()
            }
          ]
        }
      },
      type: {
        options: {
          questions: [
            {
              config: 'build.type',
              type: 'list',
              message: "What type of build do you want?",
              default: getBuildTypesDefault(grunt),
              choices: getBuildTypes()
            }
          ]
        }
      },
      environment: {
        options: {
          questions: [
            {
              config: 'build.environment',
              type: 'list',
              message: "What environment are you building on?",
              default: getEnvironmentTypesDefault(grunt),
              choices: getEnvironmentTypes()
            }
          ]
        }
      },
      dest: {
        options: {
          questions: [
            {
              config: 'build.dest',
              type: 'input',
              message: "What is the site directory name?",
              default: grunt.config("build.dest")
            }
          ]
        }
      },
      branch: {
        options: {
          questions: [
            {
              config: 'build.branch',
              type: 'input',
              message: "What branch do you want to build with?",
              default: "7.x-4.x"
            }
          ]
        }
      },
      webserver_root: {
        options: {
          questions: [
            {
              config: 'build.webserver_root',
              type: 'input',
              message: "What is your webserver root directory?",
              default: "/var/www/"
            }
          ]
        }
      },
      dbuser: {
        options: {
          questions: [
            {
              config: 'build.dbuser',
              type: 'input',
              message: "What is the database user name?",
              default: "root"
            }
          ]
        }
      },
      dbpass: {
        options: {
          questions: [
            {
              config: 'build.dbpass',
              type: 'input',
              message: "What is the database user password?",
              default: "root"
            }
          ]
        }
      },
      dbname: {
        options: {
          questions: [
            {
              config: 'build.dbname',
              type: 'input',
              message: "What is the name of the database you are installing to?",
              default: "jumpstart"
            }
          ]
        }
      }
    },
    // ------------------------------------------------------------------------.
    notify: {
      alldone: {
        options: {
          title: 'Build complete',
          message: 'Your build of <%= build.product %> at <%= build.dest %> has finished.'
        }
      }
    },
    // ------------------------------------------------------------------------.
    gitclone: {
      deployer: {
        options: {
          repository: "git@github.com:SU-SWS/stanford-jumpstart-deployer.git",
          branch: "7.x-4.x",
          directory: "stanford-jumpstart-deployer"
        }
      }
    },
    // ------------------------------------------------------------------------.
    shell: {
      options: {
        stderr: false,
        execOptions: { "maxBuffer": NaN }
      },
      sayhello: {
        command: "echo 'hello'"
      },
      deployercheckout: {
        command: "sh scripts/deployercheckout.sh <%= build.branch %>"
      },
      drushmake: {
        command: "sh scripts/drush-make.sh stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make <%= build.webserver_root %><%= build.dest %>"
      }
    },
    // ------------------------------------------------------------------------.
    chmod: {
      options: {
        mode: '775'
      },
      cleanbuild: {
        // Target-specific file/dir lists and/or options go here.
        src: [
          '<%= build.webserver_root %><%= build.dest %>/**/*settings.php',
          "<%= build.webserver_root %><%= build.dest %>/**/files",
          "<%= build.webserver_root %><%= build.dest %>/**/private",
          "<%= build.webserver_root %><%= build.dest %>/**/default"
        ]
      }
    },
    // ------------------------------------------------------------------------.
    clean: {
      options: {
        force: true
      },
      build: {
        src: ["<%= build.webserver_root %><%= build.dest %>"]
      }
    },
    // ------------------------------------------------------------------------.
    drush: {
      builditdanno: {
        args: [
          'make',
          "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make",
          "<%= build.webserver_root %><%= build.dest %>",
          "--working-copy",
          "-y",
          "-v",
          "--no-cache",
          "--ignore-checksums",
          "--prepare-install",
          "--concurrency=4"
        ]
      },
      makeitlive: {
        args: [
          'si',
          "<%= build.product_name %>",
          "--root=<%= build.webserver_root %><%= build.dest %>",
          "--db-url=<%= build.dbtype %>://<%= build.dbuser %>:<%= build.dbpass %>@<%= build.dbwhere %>/<%= build.dbname %>",
          "-y"
        ]
      },
      adminadmin: {
        args: [
          'upwd',
          'admin',
          '--password=admin',
          "--root=<%= build.webserver_root %><%= build.dest %>"
        ]
      },
      loginuli: {
        args: [
          'uli',
          "--root=<%= build.webserver_root %><%= build.dest %>"
        ]
      }
    }
  };

  // Custom Dependencies.
  require('load-grunt-tasks')(grunt);

  // NPM Dependencies.
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-chmod');

  // Task Registry.
  // ---------------------------------------------------------------------------

  // Default task list
  grunt.registerTask('default', ['availabletasks']);

  // Custom Tasks.
  grunt.task.loadTasks('./tasks');

  // Some supporting tasks.
  grunt.registerTask('clone-deployer', ["gitclone:deployer"]);
  grunt.registerTask('pull-deployer', ["shell:deployercheckout"]);


  // Init the Config.
  grunt.initConfig(masterConfig);

};


// FUNCTIONS
// ----------------------------------------------------------------------------.
// ----------------------------------------------------------------------------.


/**
 * They types of products that are available.
 * @param  {[type]} answers [description]
 * @return {[type]}         [description]
 */
function getProductTypes() {
  return [
    { name:'JSV', value: "jumpstart" },
    { name:'JSPlus', value: "jumpstart-plus" },
    { name:'JSA', value: "jumpstart-academic" },
    { name:'JSVPSA', value: "jumpstart-vpsa" },
    { name:'JSE', value: "jumpstart-engineering" },
  ];
}

/**
 * [getProductTypesDefault description]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
function getProductTypesDefault(grunt) {
  var opt = grunt.option('buildProduct');
  if (typeof opt !== undefined || opt.length >= 1) {
    return opt;
  }
  return "jumpstart";
}

/**
 * The type of build to build.
 * @param  {[type]} answers [description]
 * @return {[type]}         [description]
 */
function getBuildTypes() {
  return [
    'development',
    'production'
  ];
}

/**
 * [getBuildTypesDefault description]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
function getBuildTypesDefault(grunt) {
  var opt = grunt.option('buildType');
  if (typeof opt !== undefined || opt.length < 1) {
    return opt;
  }
  return "development";
}

/**
 * The environment that is being built on so we can make decisions later.
 * @param  {[type]} answers [description]
 * @return {[type]}         [description]
 */
function getEnvironmentTypes() {
  return [
    'local',
    'sites',
    'anchorage',
    'mamp',
  ];
}

/**
 * [getEnvironmentTypeDefault description]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
function getEnvironmentTypesDefault(grunt) {
  var opt = grunt.option('buildEnvironment');
  if (typeof opt !== undefined || opt.length >= 1) {
    return opt;
  }
  return "local";
}

/**
 * [getDBNameFromDestination description]
 * @param  {[type]} dest [description]
 * @return {[type]}      [description]
 */
function getDBNameFromDestination(dest) {
  var parts = dest.split("/");
  var last = parts.pop();
  var clean = last.replace(/([^a-z0-9]+)/gi, '_');
  return clean;
}

