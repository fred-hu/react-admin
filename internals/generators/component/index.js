const componentExists = require('../utils/componentExists');

module.exports = {
  description: '添加组件',
  prompts: [{
    type: 'list',
    name: 'type',
    message: '请选择组件类型',
    default: 'ES6 Class',
    choices: () => ['ES5 Class', 'Stateless Function', 'ES6 Class', 'ES7 Class', 'ES6 With TypeScript']
  }, {
    type: 'input',
    name: 'name',
    message: '组件名称?',
    default: 'Test',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? '组件或者容器已经存在！' : true;
      }

      return '请输入组件名称';
    }
  }
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate = '';

    let componentPath = ['../../src/components/{{properCase name}}.js', '../../src/components/{{properCase name}}.tsx'];
    switch (data.type) {
    case 'ES7 Class': {
      componentTemplate = './component/es7.js.hbs';
      componentPath = componentPath[0];
      break;
    }
    case 'ES5 Class': {
      componentTemplate = './component/es5.js.hbs';
      componentPath = componentPath[0];
      break;
    }
    case 'ES6 Class': {
      componentTemplate = './component/es6.js.hbs';
      componentPath = componentPath[0];
      break;
    }
    case 'Stateless Function': {
      componentTemplate = './component/stateless.js.hbs';
      componentPath = componentPath[0];
      break;
    }
    case 'ES6 With TypeScript': {
      componentTemplate = './component/es6.ts.hbs';
      componentPath = componentPath[1];
      break;
    }
    default: {
      componentTemplate = './component/es6.js.hbs';
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
      templateFile: './component/less.hbs',
      abortOnFail: true
    }];
    return actions;
  }
};
