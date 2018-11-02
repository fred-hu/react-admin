const fs = require('fs');
const path = require('path');
function reducerExists(comp) {
    try {
        fs.accessSync(path.join(__dirname, `../../../src/reducers/${comp}.js`), fs.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}
module.exports = {
  description: '添加reducer',
  prompts: [{
    type: 'list',
    name: 'type',
    message: '请选择reducer',
    default: 'reducer',
    choices: () => ['reducer']
  }, {
    type: 'input',
    name: 'name',
    message: 'reducer名称?',
    default: 'test',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return reducerExists(value) ? 'reducer已经存在！' : true;
      }

      return '请输入reducer名称';
    }
  }
  ],
  actions: (data) => {
    // 生产reducer
    let componentTemplate = '';

    switch (data.type) {
        case 'reducer': {
            componentTemplate = './reducers/reducer.js.hbs';
            break;
        }
      default: {
        componentTemplate = './reducers/reducer.js.hbs';
      }
    }

    const actions = [{
      type: 'add',
      path: '../../src/reducers/{{name}}.js',
      templateFile: componentTemplate,
      abortOnFail: true
    }];

    return actions;
  }
};
