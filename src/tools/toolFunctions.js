const ArrayConcat = (arr, ...args) => [].concat(arr, ...args);
// ArrayConcat([1], [1, 2, 3, [4]]) -> [1, 2, 3, [4]]

const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); };
// difference([1,2,3], [1,2]) -> [3]

const includes = (collection, val, fromIndex = 0) => collection.slice(fromIndex).indexOf(val) !== -1;
// includes("30-seconds-of-code", "code") -> true
// includes([1, 2, 3, 4], [1, 2], 1) -> false

const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); };
// intersection([1,2,3], [4,3,2]) -> [2,3]

const remove = (arr, func) => (Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
  arr.splice(arr.indexOf(val), 1); return acc.concat(val);
}, [])
  : []);
// remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// sample([3, 7, 9, 11]) -> 9

const union = (a, b) => Array.from(new Set([...a, ...b]));
// union([1,2,3], [4,3,2]) -> [1,2,3,4]

const without = (arr, ...args) => arr.filter(v => args.indexOf(v) === -1);
// without([2, 1, 2, 3], 1, 2) -> [3]
// without([2, 1, 2, 3, 4, 5, 5, 5, 3, 2, 7, 7], 3, 1, 5, 2) -> [ 4, 7, 7 ]

const zip = (...arrays) => {
  const maxLength = Math.max.apply(null, arrays.map(a => a.length));
  return Array.from({ length: maxLength }).map((_, i) => Array.from({ length: arrays.length }, (_, k) => arrays[k][i]));
};
// zip(['a', 'b'], [1, 2], [true, false]); -> [['a', 1, true], ['b', 2, false]]
// zip(['a'], [1, 2], [true, false]); -> [['a', 1, true], [undefined, 2, false]]

const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2

const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]]

const compact = arr => arr.filter(v => v);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]

const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3

const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]

const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr.shift();
  return arr;
};
// dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]

const fillArray = (arr, value, start = 0, end = arr.length) => arr.map((v, i) => (i >= start && i < end ? value : v));
// fillArray([1,2,3,4],'8',1,3) -> [1,'8','8',4]

const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]

const flattenDepth = (arr, depth = 1) => (depth !== 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), [])
  : arr.reduce((a, v) => a.concat(v), []));
// flattenDepth([1,[2],[[[3],4],5]], 2) -> [1,2,[3],4,5]

const flatten = arr => arr.reduce((a, v) => a.concat(v), []);
// flatten([1,[2],3,4]) -> [1,2,3,4]

const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10

const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1

const groupBy = (arr, func) => arr.map(typeof func === 'function' ? func : val => val[func])
  .reduce((acc, val, i) => { acc[val] = (acc[val] || []).concat(arr[i]); return acc; }, {});
// groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}

const head = arr => arr[0];
// head([1,2,3]) -> 1

const initial = arr => arr.slice(0, -1);
// initial([1,2,3]) -> [1,2]

const initializeArrayRange = (end, start = 0) => Array.apply(null, Array(end - start)).map((v, i) => i + start);
// initializeArrayRange(5) -> [0,1,2,3,4]

const initializeArray = (n, value = 0) => Array(n).fill(value);
// initializeArray(5, 2) -> [2,2,2,2,2]

const last = arr => arr.slice(-1)[0];
// last([1,2,3]) -> 3


// Median of array of numbers (获取数字数组的中值)
const median = (arr) => {
  const mid = Math.floor(arr.length / 2); const
    nums = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
// median([5,6,50,1,-5]) -> 5
// median([0,10,-2,7]) -> 3.5

const nth = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];
// nth(['a','b','c'],1) -> 'b'
// nth(['a','b','b']-2) -> 'a'

const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
// pick(object, ['a', 'c'])['a'] -> 1

// Shuffle array (随机排列数组)
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
// shuffle([1,2,3]) -> [2,3,1]

const similarity = (arr, values) => arr.filter(v => values.includes(v));
// similarity([1,2,3], [1,2,4]) -> [1,2]

const sum = arr => arr.reduce((acc, val) => acc + val, 0);
// sum([1,2,3,4]) -> 10

const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
// tail([1,2,3]) -> [2,3]
// tail([1]) -> [1]

const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
// takeRight([1, 2, 3], 2) -> [ 2, 3 ]
// takeRight([1, 2, 3]) -> [3]

const take = (arr, n = 1) => arr.slice(0, n);
// take([1, 2, 3], 5) -> [1, 2, 3]
// take([1, 2, 3], 0) -> []

const unique = arr => [...new Set(arr)];
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]

// Bottom visible (页面的底部是否可见)
const bottomVisible = _ => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight;
// bottomVisible() -> true

const currentUrl = _ => window.location.href;
// currentUrl() -> 'https://google.com'

// Element is visible in viewport (判断元素是否在可视窗口可见)
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const {
    top, left, bottom, right
  } = el.getBoundingClientRect();
  return partiallyVisible
    ? ((top > 0 && top < window.innerHeight) || (bottom > 0 && bottom < window.innerHeight))
    && ((left > 0 && left < window.innerWidth) || (right > 0 && right < window.innerWidth))
    : top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth;
};
// 举个例子，有一个 100x100 可视窗口， 和一个 10x10px 元素定位在 {top: -1, left: 0, bottom: 9, right: 10}
// elementIsVisibleInViewport(el) -> false (not fully visible)
// elementIsVisibleInViewport(el, true) -> true (partially visible)

// Get scroll position (获取滚动条位置)
const getScrollPos = (el = window) => ({
  x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
  y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
});
// getScrollPos() -> {x: 0, y: 200}

// Redirect to URL (重定向到URL)
const redirect = (url, asLink = true) => {
  const result = (asLink ? window.location.href = url : window.location.replace(url));
  return result;
};
// redirect('https://google.com')

// Scroll to top (回到顶部)
const scrollToTop = (_) => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// scrollToTop()

// Get days difference between dates (获取两个日期之间相差的天数)
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9

// Chain asynchronous functions (链式调用异步函数)
const chainAsync = (fns) => { let curr = 0; const next = () => fns[curr++](next); next(); };
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/

// Curry (函数式编程术语：柯里化)
const curry = (fn, arity = fn.length, ...args) => (arity <= args.length
  ? fn(...args)
  : curry.bind(null, fn, arity, ...args));
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2

// Pipe (函数式编程术语：管道或导流)
const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
/*
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = pipe(multiply, add5)
multiplyAndAdd5(5, 2) -> 15
*/

// Promisify (柯里化一个 Promise 函数)
const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => (err ? reject(err) : resolve(result))));
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s

// Run promises in series (运行连续的 promises)
const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete


// 延迟执行 async 函数的一部分，通过把它放到 sleep 状态，返回一个 Promise 。
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/

// Collatz algorithm(考拉兹算法)
const collatz = n => ((n % 2 === 0) ? (n / 2) : (3 * n + 1));
// collatz(8) --> 4
// collatz(5) --> 16

// Distance between two points (两点之间的欧氏距离)
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
// distance(1,1, 2,3) -> 2.23606797749979

// Divisible by number (可以被某个数整除)
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
// isDivisible(6,3) -> true

const isEven = num => num % 2 === 0;
// isEven(3) -> false

const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
// factorial(6) -> 720

// Fibonacci array generator (斐波纳契数组发生器)
const fibonacci = n => Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]

// Greatest common divisor (GCD) (最大公约数)
const gcd = (x, y) => (!y ? x : gcd(y, x % y));
// gcd (8, 36) -> 4

// Hamming distance (汉明距离)
const hammingDistance = (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || '').length;
// hammingDistance(2,3) -> 1

// Percentile (百分比)
const percentile = (arr, val) => 100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length;
// percentile([1,2,3,4,5,6,7,8,9,10], 6) -> 55

// Powerset (幂集)
const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
// powerset([1,2]) -> [[], [1], [2], [2,1]]

// Round number to n digits (精确的几位小数)
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
// round(1.005, 2) -> 1.01

// Standard deviation (标准偏差)
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
      .reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1))
  );
};
// standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample)
// standardDeviation([10,2,38,23,38,23,21], true) -> 12.29899614287479 (population)

// Speech synthesis (语音合成，实验阶段)
const speak = (message) => {
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(msg);
};
// speak('Hello, World') -> plays the message

// Write JSON to file (将 JSON 写到文件)
// const fs = require('fs');
// const jsonToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2));
// jsonToFile({test: "is passed"}, 'testJsonFile') -> writes the object to 'testJsonFile.json'

// Object from key-value pairs (根据键值对创建对象)
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}

// Object to key-value pairs (对象转化为键值对 )
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);
// objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])

// Shallow clone object (浅克隆对象)
const shallowClone = obj => Object.assign({}, obj);
/*
const a = { x: true, y: 1 };
const b = shallowClone(a);
a === b -> false
*/

// Anagrams of string (with duplicates) (字符串的排列组合，带有重复项)
const anagrams = (str) => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']

// Capitalize first letter of every word (大写每个单词的首字母)
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
// capitalize('myName') -> 'MyName'
// capitalize('myName', true) -> 'Myname'

// Check for palindrome (检查回文)
const palindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === s.split('').reverse().join('');
};
// palindrome('taco cat') -> true

const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'

// Sort characters in string (alphabetical) (按字母顺序排列字符串)
const sortCharactersInString = str => str.split('').sort((a, b) => a.localeCompare(b)).join('');
// sortCharactersInString('cabbage') -> 'aabbceg'

// Truncate a String (截断一个字符串)
const truncate = (str, num) => (str.length > num ? `${str.slice(0, num > 3 ? num - 3 : num)}...` : str);
// truncate('boomerang', 7) -> 'boom...'

// Escape regular expression (转义正则表达式)
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)

// Get native type of value (获取原生类型的值)
const getType = v => (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase());
// getType(new Set([1,2,3])) -> "set"

// Hexcode to RGB (Hex转RGB)
const hexToRgb = hex => `rgb(${hex.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join()})`;
// hexToRgb('#27ae60') -> 'rgb(39,174,96)'

const isArray = val => !!val && Array.isArray(val);
// isArray(null) -> false
// isArray([1]) -> true

const isBoolean = val => typeof val === 'boolean';
// isBoolean(null) -> false
// isBoolean(false) -> true

const isFunction = val => val && typeof val === 'function';
// isFunction('x') -> false
// isFunction(x => x) -> true

const isNumber = val => typeof val === 'number';
// isNumber('1') -> false
// isNumber(1) -> true

const isString = val => typeof val === 'string';
// isString(10) -> false
// isString('10') -> true

const isSymbol = val => typeof val === 'symbol';
// isSymbol('x') -> false
// isSymbol(Symbol('x')) -> true

// Measure time taken by function (计算函数执行所花费的时间)
const timeTaken = (callback) => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};
// timeTaken(() => Math.pow(2, 10)) -> 1024
// (logged): timeTaken: 0.02099609375ms

const digitize = n => (`${n}`).split('').map(i => parseInt(i));
// digitize(2334) -> [2, 3, 3, 4]

const toOrdinalSuffix = (num) => {
  const int = parseInt(num); const digits = [(int % 10), (int % 100)];
  const ordinals = ['st', 'nd', 'rd', 'th']; const oPattern = [1, 2, 3, 4];
  const tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
};
// toOrdinalSuffix("123") -> "123rd"

// Random integer in range (在指定的范围内生成一个随机整数)
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2

const randomInRange = (min, max) => Math.random() * (max - min) + min;
// randomInRange(2,10) -> 6.0211363285087005

// RGB to hexadecimal(RGB转hex)
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// rgbToHex(255, 165, 1) -> 'ffa501'

// URL parameters(网址参数)
const getUrlParameters = url => url.match(/([^?=&]+)(=([^&]*))/g).reduce(
  (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
);
// getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}

// UUID generator (UUID生成器)
const uuid = _ => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
// uuid() -> '7982fcfe-5721-4632-bede-6000885be57d'

// Validate email(邮箱验证)
const validateEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
// validateEmail(mymail@gmail.com) -> true

const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
// validateNumber('10') -> true

const valueOrDefault = (value, d) => value || d;
// valueOrDefault(NaN, 30) -> 30

const deepCopy = object => Object.defineProperties({}, Object.getOwnPropertyDescriptors(object));
export {
  ArrayConcat, // Array concatenation (数组拼接)
  difference, // Array difference (数组比较)
  includes, // Array includes (数组包含)
  intersection, // Array intersection (数组交集)
  remove, // Array remove (移除数组中的元素)
  sample, // Array sample (数组取样随，机获取数组中的1个元素)
  union, // Array union (数组合集)
  without, // Array without (从数组中排除给定值)
  zip, // Array zip (创建一个分组元素数组)
  average, // Average of array of numbers (求数字数组的平均数)
  chunk, // Chunk array (数组分块)
  compact, // Compact (过滤掉数组中所有假值元素)
  countOccurrences, // Count occurrences of a value in array (计数数组中某个值的出现次数)
  deepFlatten, // Deep flatten array (深度平铺数组)
  dropElements, // Drop elements in array (删除数组中的元素)
  fillArray, // Fill array (填充数组)
  filterNonUnique, // Filter out non-unique values in an array (过滤出数组中的非唯一值)
  flattenDepth, // Flatten array up to depth (根据指定的 depth 平铺数组)
  flatten, // Flatten array (平铺数组)
  arrayMax, // Get max value from array (获取数组中的最大值)
  arrayMin, // Get min value from array (获取数组中的最小值)
  groupBy, // Group by (数组分组)
  head, // Head of list (获取数组的第一个元素)
  initial, // Initial of list (排除数组中最后一个元素)
  initializeArrayRange, // Initialize array with range (初始化特定范围的数组)
  initializeArray, // Initialize array with values (初始化特定范围和值的数组)
  last, // Last of list (获取数组的最后一个元素)
  median, // Median of array of numbers (获取数字数组的中值)
  nth, // Nth element of array (获取数组的第N个元素)
  pick, // Pick(提取)
  shuffle, // Shuffle array (随机排列数组)
  similarity, // Similarity between arrays (获取数组交集)
  sum, // Sum of array of numbers (数字数组求和)
  tail, // Tail of list (返回剔除第一个元素后的数组)
  takeRight, // Take right(从一个给定的数组中创建一个后N个元素的数组)
  take, // Take(从一个给定的数组中创建一个前N个元素的数组)
  unique, // Unique values of array (数组去重)
  bottomVisible, // Bottom visible (页面的底部是否可见)
  currentUrl, // Current URL (获取当前页面URL)
  elementIsVisibleInViewport, // Element is visible in viewport (判断元素是否在可视窗口可见)
  getScrollPos, // Get scroll position (获取滚动条位置)
  redirect, // Redirect to URL (重定向到URL)
  scrollToTop, // Scroll to top (回到顶部)
  getDaysDiffBetweenDates, // Get days difference between dates (获取两个日期之间相差的天数)
  chainAsync, // Chain asynchronous functions (链式调用异步函数)
  curry, // Curry (函数式编程术语：柯里化)
  pipe, // Pipe (函数式编程术语：管道或导流)
  promisify, // Promisify (柯里化一个 Promise 函数)
  series, // Run promises in series (运行连续的 promises)
  sleep, // Sleep (休眠)
  collatz, // Collatz algorithm(考拉兹算法)
  distance, // Distance between two points (两点之间的欧氏距离)
  isDivisible, // Divisible by number (可以被某个数整除)
  isEven, // Even or odd number (判断奇偶数)
  factorial, // Factorial (阶乘)
  fibonacci, // Greatest common divisor (GCD) (最大公约数)
  hammingDistance, // Hamming distance (汉明距离)
  percentile, // Percentile (百分比)
  powerset, // Powerset (幂集)
  round, // Round number to n digits (精确的几位小数)
  standardDeviation, // Standard deviation (标准偏差)
  speak, // Speech synthesis (语音合成，实验阶段)
  objectFromPairs, // Object from key-value pairs (根据键值对创建对象)
  objectToPairs, // Object to key-value pairs (对象转化为键值对 )
  shallowClone, // Shallow clone object (浅克隆对象)
  anagrams, // Anagrams of string (with duplicates) (字符串的排列组合，带有重复项)
  capitalizeEveryWord, // Capitalize first letter of every word (大写每个单词的首字母)
  capitalize, // Capitalize first letter (首字母大写)
  palindrome, // Check for palindrome (检查回文)
  reverseString, // Reverse a string (反转一个字符串)
  sortCharactersInString, // Sort characters in string (alphabetical) (按字母顺序排列字符串)
  truncate, // Truncate a String (截断一个字符串)
  escapeRegExp, // Escape regular expression (转义正则表达式)
  getType, // Get native type of value (获取原生类型的值)
  hexToRgb, // Hexcode to RGB (Hex转RGB)
  isArray, // Is array(是否为数组)
  isBoolean, // Is boolean(是否为布尔值)
  isFunction, // Is function(是否为函数)
  isNumber, // Is number(是否为数字)
  isString, // Is string(是否为字符串)
  isSymbol, // Is symbol(是否为symbol)
  timeTaken, // Measure time taken by function (计算函数执行所花费的时间)
  digitize, // Number to array of digits (将数字转化为整数数组)
  toOrdinalSuffix, // Ordinal suffix of number (数字序号的后缀)
  randomIntegerInRange, // Random integer in range (在指定的范围内生成一个随机整数)
  randomInRange, // Random number in range (在指定的范围内生成一个随机数)
  rgbToHex, // RGB to hexadecimal(RGB转hex)
  getUrlParameters, // URL parameters(网址参数)
  uuid, // UUID generator (UUID生成器)
  validateEmail, // Validate email(邮箱验证)
  validateNumber, // Validate number (数字验证)
  valueOrDefault, // Value or default (值或者默认值)
  deepCopy// 对象深拷贝
};
