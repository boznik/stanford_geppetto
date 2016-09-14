/**
 * Drush tasks.
 */
module.exports = {
  deploy: {
    args: [
      'make',
      "stanford-jumpstart-deployer/<%= build.type %>/product/<%= build.product %>/<%= build.product %>.make",
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
  "deploy-legacy": {
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
  upgrade: {
    args: [
      'make',
      "stanford-jumpstart-deployer/<%= build.type %>/product/<%= build.product %>/<%= build.product %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--overwrite",
      "--concurrency=4"
    ]
  },
  "upgrade-legacy": {
    args: [
      'make',
      "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--overwrite",
      "--concurrency=4"
    ]
  },
  "upgrade-sites": {
    args: [
      'make',
      "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--overwrite",
      "--contrib-destination=sites/default",
      "--concurrency=4"
    ]
  },
  "upgrade-legacy-sites": {
    args: [
      'make',
      "stanford-jumpstart-deployer/make/<%= build.type %>/<%= build.product %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--overwrite",
      "--contrib-destination=sites/default",
      "--concurrency=4"
    ]
  },
  environment: {
    args: [
      'make',
      "stanford-jumpstart-deployer/<%= build.type %>/environment/<%= build.environment %>.make",
      "<%= build.webserver_root %><%= build.dest %>",
      "--working-copy",
      "-y",
      "-v",
      "--no-cache",
      "--ignore-checksums",
      "--no-core",
      "--concurrency=4"
    ]
  },
  updb: {
    args: [
      'updb',
      "-y",
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  },
  ipdb: {
    args: [
      'ipdb',
      "-y",
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  },
  "features-revert-all": {
    args: [
      'fra',
      "-y",
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  },
  rr: {
    args: [
      'rr',
      "-y",
      "--root=<%= build.webserver_root %><%= build.dest %>"
    ]
  },
  install: {
    args: [
      'si',
      "<%= build.product_name %>",
      "--root=<%= build.webserver_root %><%= build.dest %>",
      "--db-url=<%= build.dbtype %>://<%= build.dbuser %>:<%= build.dbpass %>@<%= build.dbwhere %>/<%= build.dbname %>",
      "install_configure_form.itasks_extra_tasks=<%= build.environment %>",
      "install_configure_form.stanford_sites_requester_sunetid=sheamck",
      "install_configure_form.stanford_sites_requester_name='Shea McKinney'",
      "install_configure_form.stanford_sites_requester_email='sheamck@stanford.edu'",
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
  },
  sitesard: {
    args: [
      '<%= sites.drush_alias %>',
      "ard",
      "--destination=/afs/ir/group/webservices/backups/" + process.env.USER + "-copy.tar.gz",
      "--overwrite"
    ]
  },
  localard: {
    args: [
      '<%= local.local_drush_alias %>',
      "ard",
      "--destination=" + process.env.TMPDIR + "sites-deploy.tar.gz",
      "--overwrite"
    ]
  },
  "site-alias-st": {
    args: [
      '<%= sites.drush_alias %>',
      "st",
    ]
  }
};
