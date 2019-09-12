const name = "Koon";
const age = 28;
const gender = "male";

const sayHello = (name: string, age: number, gender: string): string => {
    return `Hello ${name}, you are ${age}, you are a ${gender}!`
}

console.log(sayHello(name, age, gender));

export {};

