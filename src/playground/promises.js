const promise = new Promise ((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Tal',
            age: 49
        });
        //reject('Something went wrong');
    }, 5000);
});

console.log('before');

//promises can choose to chain calls. what will happen in the below chain:
//first up, the promise need to either resolve or reject, if it resolves the first 'then'
//call back is going to fire. that prints '1' to the screen with the data, and then it's going
//to run 'does this run?' console log.
//we can pass data from one call to it's chained call by 'return' the data.

promise.then((data) => {
    console.log('1',data);
    return new Promise ((resolve, reject) => {  //the return key word is important.
                                                //If I don't include it, the chain "then" call, will not be the success case for that promise.
        setTimeout(() => {
            resolve('This is my other promise');
            //reject('Something went wrong');
        }, 5000);
    });
}).then((str) => {  //this is going to be the success case, for the promise that gets returned up above
    console.log('does this run?', str);// this will only run when the above promise resolves.
}).catch((error) => {
    console.log('error: ', error);  
});

// promise.then((data) => {
//     console.log('1',data);
// }, (error) => {
//     console.log('error: ', error);  
// });

console.log('after');
