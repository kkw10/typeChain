const name = "Koon";
const age = 28;
const gender = "male";

const sayHello = (name, age, gender?) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHello(name, age);

export {};

