var _ = {};

_.forEach = function(obj, iteratee, context) {
    var length = obj.length;
    if (length === +length) {
        for (var i = 0; i < length; i++) {
            iteratee.call(context, obj[i], i, obj);
        }
    }
    else {
        for (var prop in obj) {
            iteratee.call(context, obj[prop], prop, obj);
        }
    }
    return obj;
}

var obj = {a: 1, b: 2, c: 3};
var arr = [1,2,3,4];

forEach(obj, alert); //alerts each number value in turn...
forEach(arr, alert, this);

/////////////////////////////////////////////////////////////////////////////////

var ifElse = function(condition, isTrue, isFalse) {
    var args = [].slice.call(arguments, 3);
    return args.concat(['d']);

}

console.log(ifElse(true, null, null, 'hi', 2, [1]));

/////////////////////////////////////////////////////////////////////////////////

_.map = function(list, iterator) {
    var result = [];
    _.forEach(list, function(item, index, list) {
        result.push(iterator(item, index, list))
    });
    return result;
};

////////////////////////////////////////////////////////////////////////////////

//reduce right with arrays (not objects).
function reduceRight(obj, iteratee, memo, context) {
    var i = obj.length - 1;
    if (memo == undefined) {
        memo = obj[obj.length - 1];
        i -= 1;
    }
    for (; i >= 0; i--) {
        memo = iteratee.call(context, memo, obj[i], i, obj);
    }
    return memo;
}
var list = [[0, 1], [2, 3], [4, 5]];
console.log(reduceRight(list, function(a, b) { return a.concat(b); }, []));
//[4, 5, 2, 3, 0, 1];

////////////////////////////////////////////////////////////////////////////////
function forEach(obj, iteratee, context) {
    var length = obj.length;
    if (length === +length) {
        for (var i = 0; i < length; i++) {
            iteratee.call(context, obj[i], i, obj);
        }
    }
    else {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            iteratee.call(context, obj[key], key, obj);
        }
    }
    return obj;
}

//filter using forEach;
function filter(list, predicate, context) {
    var result = [];
    forEach(list, function(value, index, list) {
        if (predicate.call(context, value, index, list)) {
            result.push(value);
        }
    });
    return result;
}

/////////////////////////////////////////////////////////////////////////////

function reduce(collection, iteratee, memo, context) {
    if (Array.isArray(collection)) {
        var i = 0;
        if (memo == undefined) {
            memo = collection[0];
            i += 1;
        }
        for (; i < collection.length; i++) {
            memo = iteratee.call(context, memo, collection[i], i, collection);
        }
        return memo;
    }
    else {
        var i = 0,
            keys = Object.keys(collection);
        if (memo == undefined) {
            memo = collection[keys[0]];
            i += 1;
        }
        for (; i < keys.length; i++) {
            var currentKey = keys[i];
            memo = iteratee.call(context, memo, collection[currentKey], currentKey, collection);
        }
        return memo;
    }
}

/////////////////////////////////////////////////////////////////////////////////////

//shouldn't use with objects. since memo will initially be an object value, not an object key.
function reduceRight(collection, iteratee, memo, context) {
    if (Array.isArray(collection)) {
        var i = collection.length - 1;
        if (memo == undefined) {
            memo = collection[i];
            i -= 1;
        }
        for (; i >= 0; i--) {
            memo = iteratee.call(context, memo, collection[i], i, collection);
        }
        return memo;
    }
    else {
        var keys = Object.keys(collection),
            i = keys.length - 1;
        if (memo == undefined) {
            memo = collection[keys[i]];
            i -= 1;
        }
        for (; i >= 0; i--) {
            var currentKey = keys[i];
            memo = iteratee.call(context, memo, collection[currentKey], currentKey, collection);
        }
        return memo;
    }
}
var list = [[0, 1], [2, 3], [4, 5]];
console.log(reduceRight(list, function(a, b) { return a.concat(b); }, []));

var obj = {a: 1, b: 2, c: 'ting'};
console.log(reduceRight(obj, function(prev, curr, currKey) {
    return prev + curr + currKey;
}));
//ting2b1a;

/////////////////////////////////////////////////////////////////////////////////////////

function find(collection, predicate, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (predicate.call(context, collection[i], i, collection)) {
                return collection[i];
            }
        }
        return undefined;
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (predicate.call(context, collection[currentKey], currentKey, collection)) {
                return collection[currentKey];
            }
        }
        return undefined;
    }
}

var obj = {a: 1, b: 2, c: 3, d: 4};
console.log(find(obj, function(value, key, obj) {
    return key === 'b';
})); //2
console.log(find(obj, function(value, key, obj) {
    return (value % 3 === 0);
})); //3

//////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////

function every(collection, predicate, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (!(predicate.call(context, collection[i], i, collection))) {
                return false;
            }
        }
        return true;
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (!(predicate.call(context, collection[currentKey], currentKey, collection))) {
                return false;
            }
        }
        return true;
    }
}

console.log(every([true, 1, 3, 'yes'], function(value) {
    return value;})) // true
console.log(every({a: 1, b: 2, c: 0}, function(value) {
    return value;})) //false
console.log(every({a: 1, b: 2, c: 1}, function(value) {
    return value;})) //true

//////////////////////////////////////////////////////////////////////////////////////////

function some(collection, predicate, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            if (predicate.call(context, collection[i], i, collection)) {
                return true;
            }
        }
        return false;
    }
    else {
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            if (predicate.call(context, collection[currentKey], currentKey, collection)) {
                return true;
            }
        }
        return false;
    }
}
console.log(some([true, 0, 3, 'yes'], function(item) {
    return item == false})); //true
console.log(some([true, 3, 'yes'], function(item) {
    return item == false})); //false

////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////

_.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
};
_.property = function(key) {
    return function(obj) {
        return obj[key];
    };
};

function pluck(list, propertyName) {
    for (var i = 0; i < list.length; i++) {
        list[i] = list[i][propertyName];
    }
    return list;
}
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
pluck(stooges, 'name');
//["moe", "larry", "curly"]

function pluck(collection, propertyName) {
    var result = [];
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            result.push(collection[i][propertyName]);
        }
        return result;
    }
    else {
        for (var prop in collection) {
            if (collection.hasOwnProperty(prop)) {
                result.push(collection[prop][propertyName]);
            }
        }
        return result;
    }
}

var people = {one: {a: 2, c: 3}, two: {c: 4, d: 5}, three: {c: 6, f: 7}};
console.log(pluck(people, 'c')); //[3, 4, 6]

////////////////////////////////////////////////////////////////////////////////////////

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
        for (var i = 0; i < collection.length; i++) { //obj is an array no matter what
            value = collection[i];
            if (value > result) {
                result = value;
            }
        }
    }
    else {
        collection.forEach(function(value, index, list) {
            computed = iteratee(value, index, list);
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

///////////////////////////////////////////////////////////////////////////////////////

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
            computed = iteratee(value, index, collection);
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

///////////////////////////////////////////////////////////////////////////////////////////

function sortBy(obj, iteratee, context) {
    var temp = obj.map(function(value, index, list) {
        return {
            value: value,
            index: index,
            criteria: iteratee(value, index, list)
        };
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

///////////////////////////////////////////////////////////////////////////////////////////

function shuffle(collection) {
    if (!(Array.isArray(collection))) {
        var values = [];
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        collection = values;
    }
    var shuffled = [];
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

////////////////////////////////////////////////////////////////////////////////////

function sample(collection, n) {
    if (!(Array.isArray(collection))) { //if collection isn't an array.
        var values = [];
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        collection = values;
    }
    if (n == undefined) {
        n = 1;
    }
    return shuffle(collection).slice(0, n);
}
console.log(sample([1, 2, 3, 4, 5, 6])); //[5] (pick a random item);
console.log(sample([1, 2, 3, 4, 5, 6], 3)); //[5, 6, 1]. (pick 3 random items)
console.log(sample({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}, 3));

///////////////////////////////////////////////////////////////////////////////////////

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
    else {   //else, if collection is an Object
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

////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////PRACTICE 2/8/2015 ////////////////////////////////////

function forEach(collection, iteratee, context) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            iteratee.call(context, collection[i], i, collection);
        }
    }
    else {
        for (var key in collection) {
            if (collection.hasOwnProperty(key)) {
                iteratee.call(context, collection[key], key, collection)
            }
        }
    }
    return collection;
}

///////////////////////////////////////////////////////////////////////////////////////

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

//using for in loop.//////////////////////////////////////////////////////////////////////////

function map(collection, iteratee, context) {
    var result = [];
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            result[i] = iteratee.call(context, collection[i], i, collection);
        }
    }
    else {
        for (var key in collection) {
            if (collection.hasOwnProperty(key)) {
                result.push(iteratee.call(context, collection[key], key, collection))
            }
        }
    }
    return result;
}

var arr = [1,2,3,4];
var obj = {one: 1, two: 2, three: 3};

console.log(map(arr, function(num) {return num * 3}));
//[3, 6, 9, 12]
console.log(map(obj, function(num, key) {return num + key}));
//["1one", "2two", "3three"]

// Using forEach to write Map ////////////////////////////////////////////////////////////////

function map(collection, iteratee, context) {
    var result = [];
    forEach(collection, function(value, key, collection) {
        result.push(iteratee.call(context, value, key, collection));
    });
    return result;
}

var arr = [1,2,3,4];
var obj = {one: 1, two: 2, three: 3};

console.log(map(arr, function(num) {return num * 3}));
//[3, 6, 9, 12]
console.log(map(obj, function(num, key) {return num + key}));
//["1one", "2two", "3three"]

//////////////////////////////////////////////////////////////////////////////////////////////////

function reduce(collection, iteratee, memo, context) {
    var i = 0;
    if (Array.isArray(collection)) {
        if (memo == undefined) {
            memo = collection[0];
            i += 1;
        }
        for (; i < collection.length; i++) {
            memo = iteratee.call(context, memo, collection[i], i, collection);
        }
    }
    else {
        var keys = Object.keys(collection);
        if (memo == undefined) {
            memo = collection[keys[0]];
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

///////////////////////////////////////////////////////////////////////////////////////////////

function reduceRight(collection, iteratee, memo, context) {
    if (Array.isArray(collection)) {
        var i = collection.length - 1;
        if (memo == undefined) {
            memo = collection[i];
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
            memo = collection[keys[i]];
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

/////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////

//filter using forEach
function filter(collection, predicate, context) {
    var result = [];
    forEach(collection, function(value, key, collection) {
        if (predicate.call(context, value, key, collection)) {
            result.push(value);
        };
    }, context);
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

/////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////

function shuffle(collection) {
    var shuffle = [];
    if (!(Array.isArray(collection))) {
        var values = [],
            keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var currentKey = keys[i];
            values[i] = collection[currentKey];
        }
        collection = values;
    }
    function random(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    }
    for (var i = 0; i < collection.length; i++) {
        var rand = random(0, i);
        if (rand !== i) {
            shuffle[i] = shuffle[rand];
        }
        shuffle[rand] = collection[i];
    }
    return shuffle;
}
console.log(shuffle([1,2,3,4,5,6])); //[3, 1, 6, 2, 5, 4] (Shuffle the list)
console.log(shuffle({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}));
//shuffle the property values. (aka [4, 2, 3, 5, 1, 6]).

//////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////
var _ = {};

_.forEach = function(collection, iteratee, context) {
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

_.map = function(collection, iteratee, context) {
    var result =  [];
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












































