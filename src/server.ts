class Greeter {
    constructor(public greeting: string) {
    }

    greet() {
        return this.greeting;
    }
}

const greeter = new Greeter("Hello, Ministry of Programming!");
console.log(greeter.greet());
