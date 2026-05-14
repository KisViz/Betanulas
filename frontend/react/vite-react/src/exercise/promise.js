
// Promise = An Object that manages asynchronous operations.
//                    Wrap a Promise Object around {asynchronous code}
//                    "I promise to return a value"
//                    PENDING -> RESORLVE or REJECTED
//                    new Promise((resolve,rejected) => {asynchronous code})
// olyanokra hasznaljuk, ami async (nem tudjuk mikor lesz kész) pl. adatb olvasás

// DO THESE CHORES IN ORDER

// 1. WALK THE DOG
// 2. CLEAN THE KITCHEN
// 3. TAKE OUT THE TRASH

function walkDog(callback) {
    setTimeout(() =>{
        console.log("You walk the dog");
        callback();
    }, 1500);
}

function cleanKitchen(callback) {
    setTimeout(() => {
        console.log("You clean the kitchen");
        callback();
    }, 2500);
}

function takeOutTrash(callback) {
    setTimeout(() => {
        console.log("You take out the trash");
        callback();
    }, 500);
}

//callback hell
walkDog(() => {
    cleanKitchen(() => {
        takeOutTrash(() => console.log("You finished all the chores!"));
    });
});

// ------------------------------------------------------------------------------------------------------------------------

function walkDogPromise() {

    return new Promise((resolve, reject) => {
        setTimeout(() =>{

            const dogWalked = true;

            if (dogWalked) {
                resolve("You walk the dog"); //a resolve egy function, az uzenet a parameter amit adunk neki
            } else {
                reject("You didn't walk the dog");
            }
        }, 1500);
    });
}

function cleanKitchenPromise() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const kitchenCleaned = false;

            if (kitchenCleaned) {
                resolve("You clean the kitchen");
            } else {
                reject("You didn't clean the kitchen");
            }
        }, 2500);
    });
}

function takeOutTrashPromise() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const trashTakenOut = true;

            if (trashTakenOut) {
                resolve("You take out the trash");
            } else {
                reject("Youd didin't took out the trash");
            }
        }, 500);
    });
}

//method chaining
walkDogPromise().then(value => {console.log(value); return cleanKitchenPromise()})
                                    // a value az lesz amit vissza ad a kutyas function, es utana meghivjuk a kovetkezot
        .then(value => {console.log(value); return takeOutTrashPromise()})
        .then(value => {console.log(value); console.log("You finished all the chores!")})
        .catch(error => console.error(error));

// ------------------------------------------------------------------------------------------------------------------------------------------------

// Async/Await = Async = makes a function return a promise
//               Await = makes an async function wait for a promise

//               Allows you write asynchronous code in a synchronous manner
//               Async doesn't have resolve or reject parameters
//               Everything after Await is placed in an event queue

async function doChores(){

    try{
        const walkDogResult = await walkDogPromise();
        console.log(walkDogResult);
    
        const cleanKitchenResult = await cleanKitchenPromise();
        console.log(cleanKitchenResult);
    
        const takeOutTrashResult = await takeOutTrashPromise();
        console.log(takeOutTrashResult);
        
        console.log("You finsihed all the chores!");
    }
    catch(error){
        console.error(error);
    }
}

doChores();