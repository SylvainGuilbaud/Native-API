const irisnative = require('intersystems-iris-native')

// Modify connection info based on environment
let connectionInfo = {
    host: '127.0.0.1', 
    port: 51773,
    ns: 'USER', 
    user: '_SYSTEM',
    pwd: 'SYS' 
};
// create database connection
const connection = irisnative.createConnection(connectionInfo);

//create IRIS instance
const dbnative = connection.createIris();

console.log('[1] Setting and getting a global');
// setting and getting a global
// ObjectScript equivalent: set ^nodejs("1") = 8888
dbnative.set(8888, 'nodejs', '1');

// ObjectScript equivalent: set globalValue = $get(^nodejs("1"))
let globalValue = dbnative.get('nodejs','1');
console.log('The value of nodejs is ' + globalValue);
console.log();

console.log('[2] Iterating over a global');
// modify global to iterate over
dbnative.set(7777, 'nodejs', '1');
dbnative.set(8888, 'nodejs', '2');
dbnative.set(9999, 'nodejs', '3');

let subscriptIter = dbnative.iterator('nodejs');  
console.log('walk forwards');
for ([key,value] of subscriptIter) {
    console.log('subscript='+ key +', value=' + value);
};
console.log();

console.log('Iterate backwards a different way');
let revIter = dbnative.iterator('nodejs').reversed();
let node = revIter.next();
while (!node.done) {
    console.log('subscript='+ node.value[0] +', value='+ node.value[1]);
    node = revIter.next();
}
console.log();

console.log('[3] Calling a class method');
// calling a class  method
// ObjectScript equivalent: set returnValue = ##class(%Library.Utility).Date(5)
let returnValue = dbnative.classMethodValue("%Library.Utility", "Date", 5);
console.log(returnValue);

// close connection
connection.close();
