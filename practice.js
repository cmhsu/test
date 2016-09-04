function forEach(collection, iteratee, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            iteratee.call(context, collection[i], i, collection);
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            iteratee.call(context, collection[currentKey], currentKey, collection);
        }
    }
    return collection;
}

var obj = {a: 1, b: 2, c: 3};
var arr = [1,2,3,4];
forEach(obj, alert); //alerts each number value in turn...
forEach(arr, alert, this); //alerts each number in turn...

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function map(collection, iteratee, context) {
    var result = [];
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            result[i] = iteratee.call(context, collection[i], i, collection);
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            result[i] = iteratee.call(context, collection[currentKey], currentKey, collection);
        }
    }
    return result;
}

//map using forEach.///////////////////////////////////////////////////////////////////////////////////

function map(collection, iteratee, context) {
    var result = [];
    forEach(collection, function(value, key, collection) {
        result.push(iteratee.call(context, value, key, collection));
    }, context);
    return result;
}

var arr = [1,2,3,4];
var obj = {one: 1, two: 2, three: 3};

console.log(map(arr, function(num) {return num * 3}));
//[3, 6, 9, 12]
console.log(map(obj, function(num, key) {return num + key}));
//["1one", "2two", "3three"]

/////////////////////////////////////////////////////////////////////////////////////////////////////

//If collection is an object and memo == undefined, memo = first property value.
function reduce(collection, iteratee, memo, context) {
    var i = 0;
    if (Array.isArray(collection)) {
        if (memo == undefined) {
            var memo = collection[i];
            i += 1;
        }
        for (; i < collection.length; i++) {
            memo = iteratee.call(context, memo, collection[i], i, collection);
        }
    }
    else {
        var keys = Object.keys(collection);
        if (memo == undefined) {
            var memo = collection[keys[i]];
            i += 1;
        }
        for (; i < keys.length; i++) {
            var currentKey = keys[i];
            memo = iteratee.call(context, memo, collection[currentKey], currentKey, collection);
        }
    }
    return memo;
}

console.log(reduce([1, 2, 3], function(memo, num){ return memo + num; })); //6

var list = [[0, 1], [2, 3], [4, 5]];
console.log(reduce(list, function(a, b) { return a.concat(b); }, []));
//[0, 1, 2, 3, 4, 5]
function add(a,b) {
    return a+b;
}
function multiply(a,b) {
    return a*b;
}
console.log(reduce([1,2,3,4], add)); //10
console.log(reduce([1,2,3,4], multiply, 2)); //48

var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
console.log(reduce(obj, function(memo, value, key) {
    return memo + value + key;
}));
// '3b3c4d5e'

/////////////////////////////////////////////////////////////////////////////////////////////////////

function reduce(collection, iteratee, memo, context) { //more concise but more complicated
    var keys = false,
        i = 0,
        currentKey;
    if (collection.length !== +collection.length) {
        keys = Object.keys(collection);
    }
    var length = (keys || collection).length;
    if (arguments.length < 3) {
        memo = collection[keys ? keys[i] : i ];
        i += 1;
    }
    for (; i < length; i++) {
        currentKey = keys ? keys[i] : i;
        memo = iteratee.call(context, memo, collection[currentKey], currentKey, collection);
    }
    return memo;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//If collection is an object and memo == undefined, memo = last property value.
function reduceRight(collection, iteratee, memo, context) {
    if (Array.isArray(collection)) {
        var i = collection.length - 1;
        if (memo == undefined) {
            var memo = collection[i];
            i -= 1;
        }
        for (; i >= 0; i--) {
            memo = iteratee.call(context, memo, collection[i], i, collection);
        }
    }
    else {
        var keys = Object.keys(collection);
        var i = keys.length - 1;
        if (memo == undefined) {
            var memo = collection[keys[i]];
            i -= 1;
        }
        for (; i >= 0; i--) {
            var currentKey = keys[i];
            memo = iteratee.call(context, memo, collection[currentKey], currentKey, collection);
        }
    }
    return memo;
}

var list = [[0, 1], [2, 3], [4, 5]];
console.log(reduceRight(list, function(a, b) { return a.concat(b); }, []));
//[4, 5, 2, 3, 0, 1]
var obj = {a: 1, b: 2, c: 'ting'};
console.log(reduceRight(obj, function(prev, curr, currKey) {
    return prev + curr + currKey;
}));
//ting2b1a;

var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
console.log(reduceRight(obj, function(memo, value, key) {
    return memo + value + key;
}));
// 9d3c2b1a

/////////////////////////////////////////////////////////////////////////////////////////////////////

function find(collection, predicate, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (predicate.call(context, collection[i], i, collection)) {
                return collection[i];
            }
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (predicate.call(context, collection[currentKey], currentKey, collection)) {
                return collection[currentKey];
            }
        }
    }
    return undefined;
}
var even = find([1,2,3,4,5,6], function(num){return num % 2 == 0;});
console.log(even); //2
var obj = {a: 1, b: 2, c: 3, d: 4};
console.log(find(obj, function(value, key, obj) {
    return key === 'b';
})); //2
console.log(find(obj, function(value, key, obj) {
    return (value % 3 === 0);
})); //3

/////////////////////////////////////////////////////////////////////////////////////////////////////

function filter(collection, predicate, context) {
    var result = [];
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (predicate.call(context, collection[i], i, collection)) {
                result.push(collection[i]);
            }
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (predicate.call(context, collection[currentKey], currentKey, collection)) {
                result.push(collection[currentKey]);
            }
        }
    }
    return result;
}
var evens = filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(evens); //[2, 4, 6]
var odds = filter({a: 1, b: 2, c: 3, d: 4, e: 5}, function(num, key) {
    return num % 2 !== 0;
});
console.log(odds); //[1, 3, 5]

var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
console.log(filter(obj, function(value, key, collection) {
    return key === 'b' || key === 'c';
}));
//[2, 3]

console.log(filter(obj, function(value, key, collection) {
    return collection;
}));
//[1, 2, 3, 4, 5]

/////////////////////////////////////////////////////////////////////////////////////////////////////

//filter using forEach //since forEach takes an obj or array, code is shorter.
function filter(collection, predicate, context) {
    var result = [];
    forEach(collection, function(value, key, collection) {
        if (predicate.call(context, value, key, collection)) {
            result.push(value);
        }
    }, context);
    return result;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function where(collection, properties) {
    function matches(properties) {
        var keys = Object.keys(properties);
        var pairs = [];
        for (var i = 0; i < keys.length; i++) {
            pairs[i] = [keys[i], properties[keys[i]]];
        }
        return function(obj) {
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i],
                    key = pair[0];
                if (pair[1] !== obj[key] || !(key in obj)) {
                    return false;
                }
            }
            return true;
        }
    }
    return collection.filter(matches(properties));
}

var listOfPlays = [{title: "Cymbeline", author: "Shakespeare", year: 1611},
    {title: "The Tempest", author: "Shakespeare", year: 1611},
    {title: "Ting", author: "Mickey", year: 2000}];

console.log(where(listOfPlays, {author: "Shakespeare", year: 1611}));
//[{author: "Shakespeare", title: "Cymbeline", year: 1611},
// {author: "Shakespeare", title: "The Tempest", year: 1611}]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function reject(collection, predicate, context) {
    var result = [];
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (!(predicate.call(context, collection[i], i, collection))) {
                result.push(collection[i]);
            }
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (!(predicate.call(context, collection[currentKey], currentKey, collection))) {
                result.push(collection[currentKey]);
            }
        }
    }
    return result;
}
var evens = reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 !== 0; });
console.log(evens); //[2, 4, 6]
var odds = reject({a: 1, b: 2, c: 3, d: 4, e: 5}, function(num, key) {
    return num % 2 == 0;
});
console.log(odds); //[1, 3, 5]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function every(collection, predicate, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (!(predicate.call(context, collection[i], i, collection))) {
                return false;
            }
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (!(predicate.call(context, collection[currentKey], currentKey, collection))) {
                return false;
            }
        }
    }
    return true;
}

console.log(every([true, 1, 3, 'yes'], function(value) {
    return value;})) // true
console.log(every({a: 1, b: 2, c: 0}, function(value) {
    return value;})) //false
console.log(every({a: 1, b: 2, c: 1}, function(value) {
    return value;})) //true

/////////////////////////////////////////////////////////////////////////////////////////////////////

function some(collection, predicate, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (predicate.call(context, collection[i], i, collection)) {
                return true;
            }
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (predicate.call(context, collection[currentKey], currentKey, collection)) {
                return true;
            }
        }
    }
    return false;
}
console.log(some([true, 0, 3, 'yes'], function(item) {
    return item == false})); //true
console.log(some([true, 3, 'yes'], function(item) {
    return item == false})); //false

/////////////////////////////////////////////////////////////////////////////////////////////////////

function contains(collection, value) {
    if (!(Array.isArray(collection))) {
        var arr = [],
            keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            arr[i] = collection[currentKey];
        }
        collection = arr;
    }
    return collection.indexOf(value) >= 0;
}
console.log(contains([1,2,3], 3)); //true
console.log(contains({a: 1, b: 2, c: 3}, 3)); //true

/////////////////////////////////////////////////////////////////////////////////////////////////////

function invoke(collection, method) {
    var slice = [].slice;
    var args = slice.call(arguments, 2);
    if (!(Array.isArray(collection))) {
        var result = [],
            keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            result.push(collection[currentKey]);
        }
        collection = result;
    }
    return collection.map(function(value) {
        if (typeof method === 'function') {
            return method.apply(value, args);
        }
        else {
            return value[method].apply(value, args);
        }
    });
}
invoke([[5, 1, 7], [3, 2, 1]], 'sort');
// [[1, 5, 7], [1, 2, 3]]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function pluck(collection, propertyName) {
    result = [];
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            result.push(collection[i][propertyName]);
        }
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            result.push(collection[currentKey][propertyName]);
        }
    }
    return result;
}
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(pluck(stooges, 'name')); //["moe", "larry", "curly"]
var people = {one: {a: 2, c: 3}, two: {c: 4, d: 5}, three: {c: 6, f: 7}};
console.log(pluck(people, 'c')); //[3, 4, 6]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function max(collection, iteratee, context) {
    var result = -Infinity,
        lastComputed = -Infinity,
        value,
        computed;
    if (!(Array.isArray(collection))) { //if collection isn't an array, collection = values.
        var values = [],
            keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        collection = values;
    }
    if (iteratee == null) {
        for (var i = 0; i < collection.length; i++) { //collection is an array no matter what
            value = collection[i];
            if (value > result) {
                result = value;
            }
        }
    }
    else {
        collection.forEach(function(value, index, collection) {
            computed = iteratee.call(context, value, index, collection);
            if (computed > lastComputed) {
                result = value;
                lastComputed = computed;
            }
        });
    }
    return result;
}

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(max(stooges, function(stooge){ return stooge.age; }));
//{age: 60, name: "curly"}
console.log(max([1,2,3,6,3])); //6
console.log(max({a: 1, b: 2, c: 4, d: 3})); //4

/////////////////////////////////////////////////////////////////////////////////////////////////////

function min(collection, iteratee, context) {
    var result = Infinity,
        lastComputed = Infinity,
        value,
        computed;
    if (!(Array.isArray(collection))) {
        var values = [],
            keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        collection = values;
    }
    if (iteratee == undefined) {
        for (var i = 0; i < collection.length; i++) {
            value = collection[i];
            if (value < result) {
                result = value;
            }
        }
    }
    else {
        collection.forEach(function(value, index, collection) {
            computed = iteratee.call(context, value, index, collection);
            if (computed < lastComputed) {
                lastComputed = computed;
                result = value;
            }
        })
    }
    return result;
}
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(min(stooges, function(stooge){ return stooge.age; })); //{age: 40, name: "moe"}
console.log(min([1,2,3,6, -1, 3])); //-1
console.log(min({a: 1, b: 2, c: -1, d: 3})); //-1

/////////////////////////////////////////////////////////////////////////////////////////////////////

function sortBy(obj, iteratee, context) { //iteratee must be a function
    var temp = obj.map(function(value, index, list) { //obj must be an array.
        return {
            value: value,
            index: index,
            criteria: iteratee.call(context, value, index, list)
        }
    }).sort(function(left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
        }
        return left.index - right.index;
    });
    return temp.map(function(item) {return item.value});
}
sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
// [5, 4, 6, 3, 1, 2]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function groupBy(collection, iteratee, context) {
    var result = {};
    _.each(collection, function(value, index) { //using _.each
        if (typeof iteratee === 'string') {
            var key = value[iteratee];
        }
        else if (typeof iteratee === 'function') {
            var key = iteratee.call(context, value, index, collection);
        }
        if (result.hasOwnProperty(key)) {
            result[key].push(value);
        }
        else {
            result[key] = [value];
        }
    });
    return result;
}

groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });
// {1: [1.3], 2: [2.1, 2.4]}

groupBy(['one', 'two', 'three'], 'length');
// {3: ["one", "two"], 5: ["three"]}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function indexBy(collection, iteratee, context) {
    var result = {};
    _.each(collection, function(value, index) { //uses _.each
        if (typeof iteratee === 'string') {
            var key = value[iteratee];
        }
        else if (typeof iteratee === 'function') {
            var key = iteratee.call(context, value, index, collection);
        }
        result[key] = value;
    });
    return result;
}

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

console.log(indexBy(stooges, 'age'));
//{ "40": {name: 'moe', age: 40},
//  "50": {name: 'larry', age: 50},
//  "60": {name: 'curly', age: 60}}

console.log(indexBy(stooges, function(value) {return value.name}));
//{"moe": {name: 'moe', age: 40},
//  "larry": {name: 'larry', age: 50},
//  "curly": {name: 'curly', age: 60}}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function countBy(collection, iteratee, context) {
    var result = {};
    _.each(collection, function(value, index) {
        if (typeof iteratee === 'string') {
            var key = value[iteratee];
        }
        else if (typeof iteratee === 'function') {
            var key = iteratee.call(context, value, index, collection);
        }
        if (result.hasOwnProperty(key)) {
            result[key] += 1;
        }
        else {
            result[key] = 1;
        }
    });
    return result;
}

console.log(countBy([1, 2, 3, 4, 5], function(num) {
    return num % 2 == 0 ? 'even': 'odd';
})); //{even: 2, odd: 3}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function shuffle(collection) {
    var shuffled = [];
    if (!(Array.isArray(collection))) {
        var values = [];
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        collection = values;
    }
    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    for (var i = 0; i < collection.length; i++) {
        var rand = random(0, i);
        if (rand !== i) {
            shuffled[i] = shuffled[rand];
        }
        shuffled[rand] = collection[i];
    }
    return shuffled;
}

console.log(shuffle([1,2,3,4,5,6])); //[3, 1, 6, 2, 5, 4] (Shuffle the list)
console.log(shuffle({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}));
//shuffle the property values. (aka [4, 2, 3, 5, 1, 6]).

/////////////////////////////////////////////////////////////////////////////////////////////////////

function sample(collection, n) {
    if (n == undefined) {
        n = 1;
    }
    return shuffle(collection).slice(0, n);
}
console.log(sample([1, 2, 3, 4, 5, 6])); //[5] (pick a random item);
console.log(sample([1, 2, 3, 4, 5, 6], 3)); //[5, 6, 1]. (pick 3 random items)
console.log(sample({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, 3)); // i.e. [1, 6, 4]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function toArray(collection) {
    if (!collection) {
        return [];
    }
    if (Array.isArray(collection)) {
        var slice = [].slice;
        return slice.call(collection);
    }
    if (collection.length === +collection.length) {
        var arr = [];
        for (var i = 0; i < collection.length; i++) {
            arr.push(collection[i]);
        }
        return arr;
    }
    else {   //else, if collection is an Object return the values
        var values = [];
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        return values;
    }
}

(function(){ return toArray(arguments).slice(1); })(1, 2, 3, 4); // [2, 3, 4]
console.log(toArray({a: 1, b: 2, c: 3})); //[1, 2, 3]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function size(collection) {
    if (collection == null) {
        return 0;
    }
    return collection.length === +collection.length ?
        collection.length : Object.keys(collection).length;
}

size({one: 1, two: 2, three: 3}); // 3
size([1, 2, 3]); // 3

/////////////////////////////////////////////////////////////////////////////////////////////////////

function partition(arr, predicate, context) {
    var pass = [], fail = [];
    for (var i = 0; i < arr.length; i++) {
        (predicate.call(context, arr[i], i, arr) ? pass : fail).push(arr[i]);
    }
    return [pass, fail];
}

partition([0,1,2,3,4,5], function(value, key, obj) {
    return (value % 2 == 0);
}); //[[0,2,4], [1,3,5]]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function first(array, n) {
    if (n == null) {
        return array[0];
    }
    if (n < 0) {
        return [];
    }
    var slice = [].slice;
    return slice.call(array, 0, n);
}

first([5, 4, 3, 2, 1], 2); // [5, 4]
first([5, 4, 3, 2, 1]); // 5

/////////////////////////////////////////////////////////////////////////////////////////////////////

function initial(array, n) {
    var slice = [].slice;
    return slice.call(array, 0, Math.max(0, array.length - (n == null ? 1 : n)));
}

console.log(initial([5,4,3,2,1], 3)); //[5, 4]
console.log(initial([5,4,3,2,1])); //[5, 4, 3, 2]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function last(array, n) {
    var slice = [].slice;
    if (n == null) {
        return array[array.length - 1];
    }
    return slice.call(array, Math.max(array.length - n, 0));
}

console.log(last([5, 4, 3, 2, 1], 2)); // [2, 1]
console.log(last([5, 4, 3, 2, 1])); // 1

/////////////////////////////////////////////////////////////////////////////////////////////////////

function rest(array, n) {
    var slice = [].slice;
    return slice.call(array, n == null ? 1 : n);
}

console.log(rest([5, 4, 3, 2, 1], 2)); // [3, 2, 1]
console.log(rest([5, 4, 3, 2, 1])); // [4, 3, 2, 1]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function compact(array) {
    return array.filter(function(item) {
        return item;
    });
}

compact([0, 1, false, 2, '', 3]); // [1, 2, 3]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function flatten(nestedArray, result) {
  var result = [];
  function flatten(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!(Array.isArray(arr[i]))) {
        result.push(arr[i]);
      } else {
        flatten(arr[i]);
      }
    }
  }
  flatten(nestedArray);
  return result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function without(array) {
    var values = [].slice.call(arguments, 1);
    for (var i = 0; i < array.length; i++) {
        if (values.indexOf(array[i]) >= 0) {
            array[i] = 'marked';
        }
    }
    return array.filter(function(item) {
        return item !== 'marked';
    });
}

console.log(without([1, 2, 1, 0, 3, 1, 4], 0, 1)); // [2, 3, 4]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function union() {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        var currArg = arguments[i];
        for (var j = 0; j < currArg.length; j++) {
            if (result.indexOf(currArg[j]) == -1) {
                result.push(currArg[j]);
            }
        }
    }
    return result;
}

union([1, 2, 3], [101, 2, 1, 10], [2, 1]); // [1, 2, 3, 101, 10]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function intersection(firstArray) {
    var result = [],
        argsLength = arguments.length;
    for (var i = 0; i < firstArray.length; i++) { //loop through the first array.
        for (var j = 1; j < argsLength; j++) {    //loop through remaining arrays.
            if (arguments[j].indexOf(firstArray[i]) === -1) {
                break;
            }
        }
        if (j === argsLength) {
            result.push(firstArray[i]);
        }
    }
    return result;
}

intersection([1, 3, 2, 101], [10, 1, 2], [2, 1, 101]); // [1, 2]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function difference(array) {
    var combOtherArrays = [], result = [];
    for (var i = 1; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            combOtherArrays.push(arguments[i][j]);
        }
    }
    for (var i = 0; i < array.length; i++) {
        if (combOtherArrays.indexOf(array[i]) == -1) {
            result.push(array[i]);
        }
    }
    return result;
}
console.log(difference([1, 2, 3, 4, 5], [5, 2, 10], [2, 3, 4])); // [1]
console.log(difference([1, 2, 3, 4, 5], [5, 2, 10])); //[1, 3, 4]

/////////////////////////////////////////////////////////////////////////////////////////////////////

// I didn't code the IsSorted functionality
function uniq(array, iteratee) {
    var result = [], seen = [];
    for (var i = 0; i < array.length; i++) {
        if (iteratee) {
            var computed = iteratee(array[i], i, array);
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                result.push(array[i]);
            }
        }
        else {
            if (result.indexOf(array[i]) === -1) {
                result.push(array[i]);
            }
        }
    }
    return result;
}

console.log(uniq([1, 2, 1, 3, 1, 4])); // [1, 2, 3, 4]
console.log(uniq([2, 3, 0, 1, 4], function(value, i) {
        return value*1 == 1})
); // [2, 1]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function zip(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push([array[i]]);
    }
    for (var i = 0; i < result.length; i++) {
        for (var j = 1; j < arguments.length; j++) { //loop through the remaining arrays
            result[i].push(arguments[j][i]);
        }
    }
    return result;
}

zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
// [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function object(list, values) {
    var result = {};
    for (var i = 0; i < list.length; i++) {
        if (values) {
            result[list[i]] = values[i];
        }
        else {
            result[list[i][0]] = list[i][1];
        }
    }
    return result;
}

console.log(object(['moe', 'larry', 'curly'], [30, 40, 50]));
// {curly: 50, larry: 40, moe: 30}

console.log(object([['moe', 30], ['larry', 40], ['curly', 50]]));
// {curly: 50, larry: 40, moe: 30}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// I didn't code the isSorted functionality
function indexOf(array, item, isSorted) {
    var i = 0;
    if (typeof isSorted === 'number') {
        i = isSorted;
    }
    for ( ; i < array.length; i++) {
        if (array[i] === item) {
            return i;
        }
    }
    return -1;
}

console.log(indexOf([1, 2, 3, 2, 4], 2)); // 1
console.log(indexOf([1, 2, 2, 2, 4], 2, 2)); // 2

/////////////////////////////////////////////////////////////////////////////////////////////////////

function lastIndexOf(array, item, from) {
    var i = array.length - 1;
    if (from != undefined) {
        i = from;
    }
    for ( ; i >= 0; i--) {
        if (array[i] === item) {
            return i;
        }
    }
    return -1;
}

console.log(lastIndexOf([1, 2, 3, 1, 2, 3], 2)); //4
console.log(lastIndexOf([1, 2, 3, 1, 2, 3], 2, 2)); //1

/////////////////////////////////////////////////////////////////////////////////////////////////////

function sortedIndex(array, obj, iteratee) {
    if (iteratee == null) {
        for (var i = 0; i < array.length; i++) {
            if (obj > array[i] && obj < array[i+1]) {
                return i + 1;
            }
        }
    }
    else if (typeof(iteratee) === 'string') {
        var val = obj[iteratee];
        if (val < array[0][iteratee]) {
            return 0;
        }
        if (val > array[array.length - 1][iteratee]) {
            return array.length;
        }
        for (var i = 0; i < array.length; i++) {
            if (val > array[i][iteratee] && val < array[i+1][iteratee]) {
                return i + 1;
            }
        }
    }
}
console.log(sortedIndex([10, 20, 30, 40, 50], 35)); //3
var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
console.log(sortedIndex(stooges, {name: 'larry', age: 50}, 'age')); //1

/////////////////////////////////////////////////////////////////////////////////////////////////////

function range(start, stop, step) {
    var range = [];
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    for (var i = 0; i < length; i++) {
        range[i] = start;
        start += step;
    }
    return range;
}
console.log(range(10)); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(range(1, 11)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(0, 30, 5)); //[0, 5, 10, 15, 20, 25]
console.log(range(0, -10, -1)); //[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
console.log(range(0)); //[]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function bindAll(obj) {
    var length = arguments.length,
        key;
    if (length <= 1) {
        throw new Error('bindAll must be passed function names');
    }
    for (var i = 1; i < length; i++) {
        key = arguments[i];
        obj[key] = obj[key].bind(obj);
    }
    return obj;
}
var buttonView = {
    label  : 'underscore',
    onClick: function(){ alert('clicked: ' + this.label); },
    onHover: function(){ console.log('hovering: ' + this.label); }
};
bindAll(buttonView, 'onClick', 'onHover');
// When the button is clicked, this.label will have the correct value.
jQuery('#underscore_button').bind('click', buttonView.onClick);

/////////////////////////////////////////////////////////////////////////////////////////////////////

function delay(func, wait) {
    var slice = [].slice;
    var args = slice.call(arguments, 2);
    return setTimeout(function() {
        return func.apply(null, args);
    }, wait);
}

delay(alert, 2000, 'logged later'); //alerts two seconds later.

/////////////////////////////////////////////////////////////////////////////////////////////////////

function once(func) {
    var memo,
        times = 2;
    return function() { //closure references private "times" variable above.
        if (--times > 0) {
            memo = func.apply(this, arguments);
        }
        else {
            func = null;
        }
        return memo;
    }
}

var executeOnce = once(alert);
executeOnce('hi'); //alerts 'hi'.
executeOnce('hello'); //never runs

var result = 0;
function add() {
    result += 1;
}
var addOnce = once(add);
addOnce();
addOnce();
console.log(result); //1

/////////////////////////////////////////////////////////////////////////////////////////////////////

function after(times, func) {
    return function() {
        if (--times < 1) {
            return func.apply(this, arguments);
        }
    };
}

var hi = 'hi'
function sayHi() {
    alert(arguments[0]);
}

sayHiWait = after(3, sayHi);
sayHiWait(hi);
sayHiWait(hi);
sayHiWait(hi); //will only execute this one and the one below!
sayHiWait(hi);

/////////////////////////////////////////////////////////////////////////////////////////////////////

function before(times, func) {
    var memo;
    return function() {
        if (--times > 0) {
            memo = func.apply(this, arguments);
        }
        else {
            func = null;
        }
        return memo;
    };
}


function sayHi() {
    console.log('hi');
}

var sayHiLimit = before(3, sayHi);

sayHiLimit(); //hi
sayHiLimit(); //hi
sayHiLimit(); //this one won't execute;

/////////////////////////////////////////////////////////////////////////////////////////////////////

function wrap(func, wrapper) {
    return wrapper.bind(null, func);
}

var hello = function(name) { return "hello: " + name; };
hello = wrap(hello, function(func) {
    return "before, " + func("moe") + ", after";
});
hello(); //"before, hello: moe, after"

/////////////////////////////////////////////////////////////////////////////////////////////////////

function negate(predicate) {
    return function() {
        return !predicate.apply(this, arguments);
    }
}

var isFalsy = negate(Boolean);

console.log(isFalsy(0)); //true
console.log(isFalsy(-1)); //false
console.log(isFalsy(5)); //false

/////////////////////////////////////////////////////////////////////////////////////////////////////

function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) {
            result = args[i].call(this,result);
        }
        return result;
    }
}

var greet = function(name){ return "hi: " + name; };
var exclaim = function(statement){ return statement.toUpperCase() + "!"; };

var welcome = compose(greet, exclaim);

welcome('moe');

//  'hi: MOE!'

/////////////////////////////////////////////////////////////////////////////////////////////////////

function keys(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key)
        }
    }
    return keys;
}

console.log(keys({a: 1, 2: 'b', c: 3}));
// ["2", "a", "c"]
console.log(Object.keys({a: 1, 2: 'b', c: 3})); //same as line above. Just use Object.keys
// ["2", "a", "c"]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function values(obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    var values = [];
    for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
    }
    return values;
}

values({one: 1, two: 2, three: 3});
// [1, 2, 3]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function pairs(obj) {
    var keys = Object.keys(obj);
    var pairs = [];
    for (var i = 0; i < keys.length; i++) {
        pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
}

pairs({one: 1, two: 2, three: 3});
// [["one", 1], ["two", 2], ["three", 3]]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function invert(obj) {
    var result = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        result[obj[keys[i]]] = keys[i];
    }
    return result;
}

invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"});
// {Moses: "Moe", Louis: "Larry", Jerome: "Curly"};

/////////////////////////////////////////////////////////////////////////////////////////////////////

function functions(obj) {
    var names = [];
    for (var key in obj) {
        if (typeof obj[key] === 'function') {
            names.push(key);
        }
    }
    return names.sort();
}

alert(functions(_));
// ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
// (This will work if underscore is loaded.)

/////////////////////////////////////////////////////////////////////////////////////////////////////

function extend(obj) {
    var source,
        prop;
    for (var i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
}

extend({name: 'moe'}, {age: 50});
// {name: 'moe', age: 50}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function pick(obj, iteratee) {
    var result = {},
        key;
    if (typeof iteratee === 'function') {
        for (key in obj) {
            var value = obj[key];
            if (iteratee(value, key, obj)) {
                result[key] = value;
            }
        }
    }
    else {
        var slice = [].slice;
        var keys = [].concat(slice.call(arguments, 1));
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (key in obj) {
                result[key] = obj[key];
            }
        }
    }
    return result
}

console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));
// {name: 'moe', age: 50}
console.log(pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
    return typeof value == 'number';
})); // {age: 50}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function omit(obj, iteratee, context) {
    var result = {},
        key;
    if (typeof iteratee === 'function') {
        for (key in obj) {
            var value = obj[key];
            if (!(iteratee(value, key, obj))) {
                result[key] = value;
            }
        }
        return result
    }
    else {
        var slice = [].slice;
        var keys = [].concat(slice.call(arguments, 1));
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (key in obj) {
                delete obj[key];
            }
        }
        return obj;
    }
}

console.log(omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid'));
// {age: 50, name: "moe"}
console.log(omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
    return typeof value === 'number';
})); // {name: "moe", userid: "moe1"}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function defaults(object) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (!(prop in object)) {
                object[prop] = source[prop];
            }
        }
    }
    return object;
}

var iceCream = {flavor: "chocolate"};
defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
// {flavor: "chocolate", sprinkles: "lots"}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function clone(object) {
    if (Array.isArray(object)) {
        return object.slice();
    }
    else {
        var result = {};
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                result[prop] = object[prop];
            }
        }
        return result;
    }
}

console.log(clone({name: 'moe'})); //{name: "moe"}
console.log(clone([1, 2, 3])); //[1, 2, 3]

/////////////////////////////////////////////////////////////////////////////////////////////////////

function has(obj, key) {
    return obj.hasOwnProperty(key);
}

has({a: 1, b: 2, c: 3}, "b");
// true

/////////////////////////////////////////////////////////////////////////////////////////////////////

function property(key) {
    return function(obj) {
        return obj[key];
    }
}

var moe = {name: 'moe'};
property('name')(moe); // 'moe'

/////////////////////////////////////////////////////////////////////////////////////////////////////

function matches(attrs) {
    var pairs = pairs(attrs); // pairs = [[selected, true], [visible, true]]
    return function(obj) {
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i],
                key = pair[0];
            if (pair[1] !== obj[key] || !(key in obj)) {
                return false;
            }
        }
        return true;
    }
}

function pairs(obj) {  //matches() uses this pairs() function.
    var keys = Object.keys(obj);
    var pairs = [];
    for (var i = 0; i < keys.length; i++) {
        pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function isEmpty(obj) {
    if (Array.isArray(obj) || typeof obj == 'string') {
        return obj.length === 0;
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
console.log(isEmpty([1, 2, 3])); // false
console.log(isEmpty({})); // true

/////////////////////////////////////////////////////////////////////////////////////////////////////

function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
};
alert(isElement($('body')[0])) //true

/////////////////////////////////////////////////////////////////////////////////////////////////////

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

console.log(isObject({})); //true
console.log(isObject(1)); //false

/////////////////////////////////////////////////////////////////////////////////////////////////////

function times(n, iteratee, context) {
    var accum = [];
    for (var i = 0; i < n; i++) {
        accum[i] = iteratee.call(this, i);
    }
    return accum;
}

var sum = 0;
function add(x) {
    sum += x;
    return x;
}
console.log(times(4, add)); //[0, 1, 2, 3]
console.log(sum); //6

/////////////////////////////////////////////////////////////////////////////////////////////////////

function result(object, property) {
    var value = object[property];
    if (typeof value == 'function') {
        return value.call(object);
    }
    else {
        return value;
    }
}

var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
console.log(result(object, 'cheese'));
// 'crumpets'
console.log(result(object, 'stuff'));
// 'nonsense'

////////////////////////////////////////////////////////////////////////



































