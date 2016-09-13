'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');
  },
  initializing: function() {
    this.pkg = require('../../package.json');
  },
  prompting: {
    dirname: function () {
      this.log(yosay(
        'Welcome to the myun ' + chalk.red('generator-myun-vue ') + chalk.blue(this.pkg.version) + ' generator!'
      ));

      var done = this.async();
      var prompts = [
        {
          type: 'input',
          name: 'project',
          message: 'What is the project\'s name?',
          default: this.appname
        },
        {
          type: 'input',
          name: 'description',
          message: 'Enter project description'
        },
        {
          type: 'input',
          name: 'author',
          message: 'Enter project author name'
        },
        {
          type: 'input',
          name: 'version',
          message: 'Enter project version'
        }
      ];

      this.prompt(prompts).then(function (answers) {
        this.projectName = answers.project;
        this.projectDes = answers.description;
        this.projectAuthor = answers.author;
        this.projectVersion = answers.version;

        done();
      }.bind(this));
    }
  },

  writing: {
    packageJson: function () {
      this._copyTpl('_package.json', 'package.json', {
        projectName: this.projectName,
        projectDes: this.projectDes,
        projectAuthor: this.projectAuthor,
        projectVersion: this.projectVersion
      });
    },
    babel:function(){
      this._copy('_babelrc', '.babelrc');
    },
    config:function(){
      this._copy('_config.js', 'config.js');
    },
    editorconfig:function(){
      this._copy('_editorconfig', '.editorconfig');
    },
    eslint: function() {
      this._copy('_eslintrc.js', '.eslintrc.js');
    },
    gitattributes:function(){
      this._copy('_gitattributes', '.gitattributes');
    },
    gitignore: function() {
      this._copy('_gitignore', '.gitignore');
    },
    webpack: function() {
      mkdirp(this.destinationPath('./build'));
      this._copy('build/build.js', './build/build.js');
      this._copy('build/dev-client.js', './build/dev-client.js');
      this._copy('build/dev-server.js', './build/dev-server.js');
      this._copy('build/css-loaders.js', './build/css-loaders.js');
      this._copy('build/webpack.base.conf.js', './build/webpack.base.conf.js');
      this._copy('build/webpack.dev.conf.js', './build/webpack.dev.conf.js');
      this._copy('build/webpack.prod.conf.js', './build/webpack.prod.conf.js');
      mkdirp(this.destinationPath('./config'));
      this._copy('config/dev.env.js', './config/dev.env.js');
      this._copy('config/index.js', './config/index.js');
      this._copy('config/prod.env.js', './config/prod.env.js');
    },
    assets: function() {
      mkdirp(this.destinationPath('./src/assets'));
      this._copy('src/assets/common.js', './src/assets/common.js');
      this._copy('src/assets/config.js', './src/assets/config.js');
      this._copy('src/assets/function.js', './src/assets/function.js');
      this._copy('src/assets/lib.js', './src/assets/lib.js');
      this._copy('src/assets/myun.css', './src/assets/myun.css');
      mkdirp(this.destinationPath('./src/assets/font'));
      this._copy('src/assets/font/_gitkeep', './src/assets/font/.gitkeep');
      mkdirp(this.destinationPath('./src/assets/images'));
      this._copy('src/assets/images/_gitkeep', './src/assets/images/.gitkeep');
    },
    components: function() {
      mkdirp(this.destinationPath('./src/components'));
      this._copy('src/components/_gitkeep', './src/components/.gitkeep');
    },
    module: function() {
      mkdirp(this.destinationPath('./src/module/index'));
      this._copy('src/module/index/app.vue', './src/module/index/app.vue');
      this._copy('src/module/index/index.html', './src/module/index/index.html');
      this._copy('src/module/index/index.js', './src/module/index/index.js');
      mkdirp(this.destinationPath('./src/module/error'));
      this._copy('src/module/error/error.html', './src/module/error/error.html');
    },
    static: function() {
      mkdirp(this.destinationPath('./static'));
      this._copy('static/_gitkeep', './static/.gitkeep');
    },
    route: function() {
      mkdirp(this.destinationPath('./routes'));
      this._copy('routes/index.js', './routes/index.js');
    },
    bin: function() {
      mkdirp(this.destinationPath('./bin'));
      this._copy('bin/www', './bin/www');
    },
    app: function () {
      this._copy('_app.js', './app.js');
    }
  },
  _copy: function(from, to) {
    this.fs.copy(this.templatePath(from), this.destinationPath(to))
  },

  _copyTpl: function(from, to, params) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), params)
  },
  install: function () {
    if (!this.options['skip-install']) this.installDependencies();
  }
});
