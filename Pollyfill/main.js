// Polyfill WITH CUSTOM FUNCTION
// [1, 2, 3].map(item => item * 2)
const arr = [5, 8, 9, 12, 2, 0];

Array.prototype.customMap = function (callback) {
    // VARIABLES
    const result = []
    // ITERATIONS
    for (let index = 0; index < this.length; index++) {
        const element = this[index]
        const processed = callback(element, index)
        result.push(processed)   
    }
    return result
};

const result = arr.customMap(item => item * 2)
console.log(result);