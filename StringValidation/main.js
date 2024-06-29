const str = '75V3ngad0r3s'

function ValidateString(str) {
    // Required variables
    let counter = 0
    // String Iteration 
    for (let i = 0; i < str.length; i++) {
        // Number Validation
        if (!isNaN(str[i])) {
            console.log(`Is a number ${str[i]}`);
            counter = counter + parseInt(str[i]);
        }
    }
    // Acumulator returned
    return counter
}

const result = ValidateString(str)
console.log(result)