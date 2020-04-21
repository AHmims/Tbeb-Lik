var _ = require('lodash');
// 
var x = {
    a: "dd",
    b: "ss"
}
var y = [{
        a: "dd",
        b: "ss"
    },
    {
        a: "gg",
        b: "ff"
    }
]
// 
x = _.pick(y, ["a"]);
console.log(x);