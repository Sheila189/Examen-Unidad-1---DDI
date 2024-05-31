// Diferencias entre var, let y const

// var (alcance de función, valor por defecto undefined, permite reasignación y redeclaración)
var globalVar = 10; // Declaración global
function exampleVar() {
  var localVar = 20; // Declaración local
  console.log(`globalVar: ${globalVar}`); // Imprime 10
  console.log(`localVar: ${localVar}`); // Imprime 20
}
exampleVar();
console.log(`globalVar después de la función: ${globalVar}`); // Imprime 10

// let (alcance de bloque, valor por defecto undefined, permite reasignación pero no redeclaración)
function exampleLet() {
  let blockLet = 30; // Declaración dentro del bloque
  console.log(`blockLet: ${blockLet}`); // Imprime 30
  blockLet = 40; // Reasignación
  console.log(`blockLet después de la reasignación: ${blockLet}`); // Imprime 40
}
exampleLet();
// console.log(`blockLet fuera del bloque: ${blockLet}`); // Error: ReferenceError: blockLet is not defined

// const (alcance de bloque, valor obligatorio al declarar, no permite reasignación)
function exampleConst() {
  const blockConst = 50; // Declaración con valor obligatorio
  console.log(`blockConst: ${blockConst}`); // Imprime 50
  // blockConst = 60; // Error: Assignment to constant variable
}
exampleConst();
