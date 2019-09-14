interface Human {
    name: string,
    gender: string,
    age: number
}

const person = {
    name: 'Koon',
    gender: 'male',
    age: 29
}

const sayHello = (person: Human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`
}

console.log(sayHello(person));

export {};

