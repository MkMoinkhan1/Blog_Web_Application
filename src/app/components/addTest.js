function addVal(num1,num2) {
    return num1+num2
}

function checkObj(num1,num2) {
    return {name:"La Casa"}
}
function fetchData(back){
    return back('callback function')
}
function handlePromise(){
    return new Promise((resolve,reject)=>{
        resolve('hello good morning')
    })
}
function fetchAsync() {
    return new Promise((resolve,reject)=>{
        resolve('ek no mere bhai')
    })
}
module.exports = {
    addVal,checkObj,fetchData,handlePromise,fetchAsync
}