/**
 * Created by hufei on 2017/8/2.
 */
require('shelljs/global');
const addCheckMark = require('./helpers/checkmark.js');
if (!which('git')) {
    echo('对不起,此脚本需要git');
    exit(1);
}
process.stdout.write('开始清理...');
// 清理src和dist/
rm('-rf', 'src/*');
rm('-rf', 'dist');
cp('-rf', 'internals/templates/*', 'src');
addCheckMark();
echo('\n清理完毕，祝您开心使用!!!');