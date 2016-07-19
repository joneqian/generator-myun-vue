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
        'Welcome to the myun ' + chalk.red('generator-myun-vue') + ' generator!'
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
    git: function() {
      this._copy('_gitignore', '.gitignore');
    },
    eslint: function() {
      this._copy('_eslintrc', '.eslintrc.js');
    },
    babel:function(){
      this._copy('_babelrc', '.babelrc');
    },
    editorconfig:function(){
      this._copy('_editorconfig', '.editorconfig');
    },
    webpack: function() {
      mkdirp(this.destinationPath('./build'));
      this._copy('build/build.js', './build/build.js');
      this._copy('build/dev-client.js', './build/dev-client.js');
      this._copy('build/dev-server.js', './build/dev-server.js');
      this._copy('build/utils.js', './build/utils.js');
      this._copyTpl('build/webpack.base.conf.js', './build/webpack.base.conf.js',{
        includeZepto: this.includeZepto
      });
      this._copy('build/webpack.dev.conf.js', './build/webpack.dev.conf.js');
      this._copy('build/webpack.prod.conf.js', './build/webpack.prod.conf.js');
      mkdirp(this.destinationPath('./config'));
      this._copy('config/dev.env.js', './config/dev.env.js');
      this._copy('config/index.js', './config/index.js');
      this._copy('config/prod.env.js', './config/prod.env.js');
    },
    vuefile: function() {
      this._copyTpl('_index-page.vue', './src/module/index/index-page.vue', {
        includeZepto: this.includeZepto
      });

      this._copyTpl('_index.js', './src/module/index/index.js', {
        includeZepto: this.includeZepto
      });
    },
    css: function() {
      this._copy('_index.css', './src/module/index/index.css');
    },
    html: function() {
      this._copy('_index.html', './src/module/index/index.html');
      this._copy('_error.html', './src/module/error/error.html');
    },
    route: function() {
      mkdirp(this.destinationPath('./routes'));
      this._copy('routes/index.js', './routes/index.js');
    },
    bin: function() {
      mkdirp(this.destinationPath('./bin'));
      this._copy('bin/www', './bin/www');
    },
    misc: function() {
      mkdirp(this.destinationPath('./src/css'));
      mkdirp(this.destinationPath('./src/components'));
      mkdirp(this.destinationPath('./src/images'));
      mkdirp(this.destinationPath('./static'));
      mkdirp(this.destinationPath('./test'));
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
