// Проксуємо об'єкти - Objects

// const person = {
//     name: "Vladislav",
//     age: 25,
//     job: "studing"
// }

// const objProxy = new Proxy(person, {  // person - 1 параметр, той об'єкт, який ми хочемо запроксувати; далі в фігурних - 2 параметр, набір хендлерів = методи які роблять "пастки" для 1 об'єкту
//  get(target, prop){   // target = ключове слово, яке означає наш об'єкт(по факту будь-який ключ, головне, щоб викликався в самому коді після оголошення); prop = ключове слово, яке ми введемо після крапки = виклик об'єкту !!конкретно проксі (objProxy.prop)
//      console.log(`Getting prop: ${prop}`)
//     return target[prop]
//  },
//  set (target, prop, value){ // target = як і в get; props - ключ, який ми ввели після крапки (object.key = objProxy.prop); value - значення які ми присвоюємо через (object.key = value)
//     if (prop in target){
//       target[prop] = value
//     } else {
//         throw new Error(`No ${prop} found in target`)
//     }   
//  },
//  has (target, prop){     // повертає значення або true abo falls в залежності чи є в target таке поле prop   // name in objProxy = true; Juli in objProxy = false
//     return ["age", "name", "job"].includes(prop) // логіка для повернення true. Не обов'язково вказувати всі ключі об'єкта, можна зробити кастомну валідацію
//  },
//  deleteProperty(target, prop) { // дозволяє видаляти певні свойства об'єкту
//     console.log("Deliting... ", prop)
//     delete target[prop]
//     return true             // щоб після видалення нам повернула консоль "тру"
//  }
// })

// Проксування функцій

// const log = text => `Log: ${text}`

// const funcProx = new Proxy (log, {   // log - 1 параметр, функція, яку ми хочемо запроксувати; далі в фігурних - 2 параметр, набір хендлерів
//     apply(target, thisArg, argsArray){ // відслідковує, коли ця функція буде реалізуватись. target = функція яку ми проксуємо; thisArg = контекст(я так розумію, це якийсь об'єкт, то якого ми хочемо застосувати функцію), якщо ми його передавали, наприклад за допомогою кол, чи байнд; argsArray = усі параметри, які ми передаємо у функцію( ми передаємо тільки параметр - text)
//         console.log("Calling fn...")

//        return target.apply(thisArg, argsArray).toUpperCase()               // target = сама наша функція (log). apply виходить додатковий спосіб обробки функції
//     }          
// })


//  Проксування класів 

// class Person {
//     constructor(name, age){
//         this.name = name,
//         this.age = age
//     }
// }

// const PersonProxy = new Proxy (Person, {  // Person - 1 параметр, клас, який ми хочемо запроксувати; 
//     construct(target, args){     // відслідковує ініціалізацію нового класу. target = клас який ми проксуємо; thisArg = масив аргументів як в apply (походу мається на увазі, весь об'єкт, який збираються створити)
//         console.log("Construct...")

//         return new Proxy(new target(...args), {
//             get (t, prop){
//                 console.log(`Getting prop "${prop}"`)
//                 return t[prop]
//             }
//         })
//     }
// })  

// const p = new PersonProxy ("Max", 30)


// const person = {
//     name: "Vladislav",
//     age: 25,
//     job: "studing"
// }

// const objProxy = new Proxy(person, {  
//  get(target, prop){
//     //  console.log(`Getting prop: ${prop}`)
//      if (!(prop in target)) {
//         return prop
//         .split("_")
//         .map(p => target[p])
//         .join(" ")
//      }
//     return target[prop]
//  },
//  set (target, prop, value){ 
//     if (prop in target){
//       target[prop] = value
//     } else {
//         throw new Error(`No ${prop} found in target`)
//     }   
//  },
//  has (target, prop){    
//     return ["age", "name", "job"].includes(prop)
//  },
//  deleteProperty(target, prop) { 
//     console.log("Deliting... ", prop)
//     delete target[prop]
//     return true            
//  }
// })





// Objects

// const person = {
//    name: "Vlad",
//    age: 25,
//    job: "studing"
// }

// const op = new Proxy(person, {
//    get(target, prop){     // я так розумію, цей метод описує, що потрібно робити, коли об'єкт викликається з певним ключем(існуючим чи ні)
//       console.log(`Don't touch my object's ${prop}!`)
//       return target[prop]
//    },
//    set(target, prop, value){     // цей метод описує дії, котрі мають бути виконані, якщо ми мутуємо велью певного ключа об'єкту
//       if (prop in target){
//          target[prop] = value
//       } else {
//          throw new Error(`Ohoh easy there! ${prop} is not a key of this object!`)
//       }
//    },
//    has (target, prop) {
//       return ["age", "name", "job"].includes(prop)
//    },
//    deleteProperty(target, prop){       // які дії мають бути виконані, якщо хтось намагається видалити зв'язку ключ - велью в об`єкті
//       console.log("Deleting ", prop)
//       delete target[prop]
//       return true
//    }
// })



// FUnctions

// const log = text => `Your text was: ${text}`

// const fp = new Proxy(log, {
//    apply(target, thisArg, argsArray){
//     console.log("Calling fp...")
//     return target.apply(thisArg, argsArray).toUpperCase()        
//    }
// })

// Classes 

// class Person{
//     constructor(name, age){
//         this.name = name,
//         this.age = age
//     }
// }

// const PP = new Proxy(Person, {
//     construct(target, args){
//         console.log("Construct...")

//         return new Proxy(new target(...args), { //target = сам наш клас Person, args = усі потрібні аргументи, які застосовуються в конструкторі персона
//             get(t, prop) {                // така сама логіка, як у проксі об'єктів зверху. виконує певний код, коли хтось викликає ключ в нашому класі
//                  console.log(`Getting "p" ${prop}. Why do you need this infO???`)
//                  return t[prop]
//             }
//         })      
//     }
// })

// const p = new PP ("Julia", 20)





//https://www.youtube.com/watch?v=np08WdS9OXg          !!! 