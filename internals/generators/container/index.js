/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: '添加容器组件',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '容器名称？',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? '组件或者容器已经存在！' : true;
      }

      return '请输入容器名称';
    }
  }, {
      type: 'list',
      name: 'component',
      message: '选择容器组件类型:',
      default: 'Component',
      choices: () => ['Component','Component With Typescript']
  }, {
    type: 'confirm',
    name: 'wantHeaders',
    default: false,
    message: '你想要titile吗?'
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
      let componentTemplate = '';
      let componentPath = ['../../src/containers/{{properCase name}}.js','../../src/containers/{{properCase name}}.tsx'];
      switch (data.component) {
          case 'Component': {
              componentTemplate = './container/index.js.hbs';
              componentPath = componentPath[0];
              break;
          }
          case 'Component With Typescript': {
              componentTemplate = './container/index.ts.hbs';
              componentPath = componentPath[1];
              break;
          }
          default: {
              componentTemplate = './container/index.js.hbs';
              componentPath = componentPath[0];
          }
      }
    const actions = [{
      type: 'add',
      path: componentPath,
      templateFile: componentTemplate,
      abortOnFail: true
    }, {
      type: 'add',
      path: '../../src/styles/{{properCase name}}.less',
      templateFile: './container/less.hbs',
      abortOnFail: true
    }];
      return actions;
  }
};
