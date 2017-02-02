var pow = function(n, k) {

    var i, pow = 1;

    for(i = 0; i < k; i++) {
        pow *= n;
    }

    return pow;
};

var number = 12.34567;

var string = "It is a wonderfull world";

var truncate = function(string, maxlength) {

    var ans;

    if (+string.length > maxlength) {
        ans = string.substr(0, maxlength);
    }

    ans += ' ...';

    return ans;
};

// module.exports = {
    // pow : pow,
    // number : number.toFixed(0)
// };


var arr = [5, 2];

var map = arr.map(function(item, i, arr) {

    var temp = arr.filter(function(item, index, arr) {
        if (index <= i)
            return item;
    });

    return temp.reduce(function(sum, current, index) {
        return sum + current;
    });
});

var cloneObject = function(targetObject) {

    var newObject = {};

    for(var key in targetObject) {
        if (targetObject.hasOwnProperty(key))
            newObject[key] = null;
    }
    return newObject;
};

var student = {
    name : 'Murod',
    lastName : 'Khaydarov',
    course : '3',
    university : 'ITMO university'
};

var anotherStudent = cloneObject(student);

anotherStudent.name = "Olin";

function module(a) {

    return {
        sum : function sum(b) {
            return a + b;
        },
        minus : function minus(b) {
            return a - b;
        }
    };
}

var first = 0.1,
    second = 0.2;

if (+(first + second).toFixed(2) == 0.3) {
    console.log("YES");
}

function sum(a) {

    var currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function() {
        return currentSum;
    };

    return f;
}

var users = function() {

    return function() {
        return 1;
    };

};

users.toString = function() {
    return "HEY";
};

console.log(users()());


var Goods = function(name) {
    this.name = name;
};

var t = new Goods('Hey');

var user = {
    name : "Murod",
    lastname : "Khaydarov",
};

console.log(user);

Object.defineProperty(user, "name", {
    enumerable : false
});

/** Ex */

var User = function ( fullName ) {

    Object.defineProperties(this, {

        firstName : {

            enumerable      : false,
            configurable    : false,

            get : function() {
                var data = this.fullName.split(" ");
                this.value = data[1];
                return data[1];
            }
        },

        lastName : {

            enumerable      : false,
            configurable    : false,

            get : function() {
                var data = this.fullName.split(" ");
                this.value = data[0];
                return data[0];
            }

        }
    });

    this.fullName = fullName;
};

var me = new User("Khaydarov Murod");


// console.log(me);


/** Arguments */
function workWithArgs() {

    var join = [].slice.call(arguments).join(':');
    console.log(join);
}

workWithArgs(1, 2, 35);


/** Apply */
var newArray = [];
newArray.push(1);
newArray.push(10);
newArray.push(15);

console.log( Math.max.call(null, 1, 10, 15) );
console.log( Math.max.apply(null, newArray) );

/** This context */
var func1 = function() {
    console.log( this.name + ' ' + this.surname );

    console.log("Here is arguments, %o", arguments);
};

func1();

var person = {
    name : 'Murod',
    surname : 'Khaydarov'
};

func1.call(person);

/** Task #1 */
var sumt1 = function () {
    arguments.slice = [].slice;

    var sum = arguments.slice(0, arguments.length).reduce( function(previousResult, currentItem) {
        return previousResult + currentItem;
    });

    console.log(sum);
};

sumt1(1, 2, 3);


/** Task #2 */
var applyAll = function() {

    arguments.slice = [].slice;

    /** get method */
    var method = arguments[0];
    var args   = arguments.slice(1, arguments.length);

    console.log("Function executed from applyAll => ");
    method.apply(null, args);

};
applyAll(sumt1, 1, 2, 3);


/** Bind */
function func2(a, b) {
    'use strict';

    console.log( this );
    console.log( a + b );
}

var nums = {
    a: 3,
    b: 5
};

var t = func2.bind(nums, 1, 2);
t();

/** Factory Method */

var Person = function() {

};

Person.loginedUser = function() {
    var user = new Person();

    user.name = "Murod";
    user.surname = "Khaydarov";

    return user;
};

Person.guess = function() {
    var user = new Person();

    user.name = "Temporary user";

    Object.defineProperty(user, "name", {
        writable : false
    });

    return user;
};

var me = Person.loginedUser();
console.log(me);

var you = Person.guess();
you.name = "MMM";
console.log(you);

/** Decorator */

var _amount = function(a, b) {
    return a + b;
};

var checkAmountFunctionTypes = function (f) {

    return function() {

        arguments.slice = [].slice;

        var check = function(data) {

            return data.every(function(item) {
                return typeof item === 'number';
            });

        }(arguments.slice(0, arguments.length));

        if (!check) {
            console.log("Wrong datatypes");
            return;
        }

        return f.apply(this, arguments);

    };

};

var amount = checkAmountFunctionTypes(_amount);
console.log( amount(null, "2") );
console.log( amount(2, 3) );



/** More JS */
var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';

var json = JSON.parse(str, function(key, value) {

    if (key === 'date') {
        return new Date(value);
    }

    return value;

});


var serialize = {
    name : 'JSON',
    method : 'serialize',
};

var _serialize = {
    name : 'JSON',
    method : 'serialize',
    toJSON : function(data) {

        var result = [];

        for(var prop in this) {
            result.push(`"${prop}"` + ':' + this[prop]);
        }

        return result;
    }
};

Object.defineProperty(_serialize, "toJSON", {
    enumerable : false
});

console.log(JSON.stringify(serialize));

console.log(JSON.stringify(_serialize));


/** Inherit */
var Machine = function() {

    this.enabled = false;

    this.enable = function() {
        this.enabled = true;
    };

    this.disable = function() {
        this.enabled = false;
    };
};

var CoffeMachine = function(power) {

    Machine.apply(this, arguments);

    var ALLOWED_POWER = 450;

    this.power = power;

    this.enable = function() {

        if (this.power > ALLOWED_POWER) {
            console.log("Sorry, I cant");
            return;
        }

        console.log("Coffee will be ready in 10 minutes");
        this.enabled = true;
    };

};

var WashMachine = function(power) {

    Machine.call(this);

    this.power = power;

};

var coffemachine = new CoffeMachine(150, 200);
coffemachine.enable();


/** Prototype */
var testArr = {};

Object.prototype.showVersion = function() {
    console.log( 'v1.0.3' );
}

Function.prototype.defer = function(ms) {

    var self = this;
    return function() {
        return self.apply(null, arguments);
    };

};

var textFuncSum = function ( first ) {

    var current = first;

    function f(b) {
        current += b;
        return f;
    }

    f.toString = function() {
        return +current;
    };

    return f;

};

console.log( textFuncSum.defer(1000)(5)(2) );


/** Task #1 */



/******************* ES-2015 **************/

/** let */
let a = 10;
if (true) {
    a = 5;
    console.log( a );
}

console.log( a );

/** spread */
let [one, two, three, ...other] = [1, 2, 3, 5, 6, 7];

console.log(other);

/** Objects */
var options = {
    title : 'Title superb',
    width : 100,
    height : 200
};

let {title : wr, width, height} = options;

console.log("Title %o", wr);
console.log("Width %o", width);
console.log("Height %o", height);

/** Functions */
let incr = x => x + 1;
console.log( incr(3) );

let sum_es2015 = (a, b) => a + b;
console.log( sum_es2015( 2, 3) );

let cube_es2015 = (a, b) => {
    let c = a * b;
    c += 10;
    return c;
};

console.log( cube_es2015(2, 3) );

let arr_es = [2, 1, 15, 4];

/**
 * simple
 */
console.log(arr_es.sort(function(a, b) {
    return a > b;
}));

/**
 * via ES-2015
 */
let sorted_es2015 = arr_es.sort( (a, b) => {
    return a > b ;
});
console.log( sorted_es2015 );

/** objects */
let obj_es2015 = {
    name : "Murod",
    get surname () {
        console.log(" Khaydarov not Khadyarov ");
    }
};

// Object.defineProperty(obj_es2015, "surname" , {
    // get : function() {
        // console.log(" Khaydarov not Khadyarov ");
    // }
// })

obj_es2015.surname
