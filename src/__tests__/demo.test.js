// import { addVal, checkObj } from "../app/components/addTest";

const {addVal,checkObj,fetchAsync,fetchData,handlePromise} = require('../app/components/addTest')

test('first test' ,()=>{
    expect(true).toBe(true)
})
test('add fun test',()=>{
    expect(addVal(10,20)).toBe(30)
})

// /failure case 
test('add fun test mest',()=>{
    expect(addVal(10,20)).not.toBe(31)
})


// test obj
test('add fun test mest2',()=>{
    expect(checkObj()).toEqual({name:"La Casa"})
})
// test obj failure case
test('add fun test mest3',()=>{
    expect(checkObj()).not.toEqual({name:"La Casa Da Papal"})
})
//callback
test('callback function',back =>{
    function callback(data){
        try{
            expect(data).toBe('callback function')
            back()
        }
        catch(error){
            back(error)
        }
    }
    fetchData(callback)
})


//promise
test('Pomise test',()=>{
    return handlePromise().then((data)=>{
        expect(data).toBe('hello good morning')
    })
})
//promise failure
test('Pomise test2',()=>{
    return handlePromise().then((data)=>{
        expect(data).not.toBe('hello')
    })
})

// async
test('promise async await',async()=>{
    const data = await fetchAsync()
    expect(data).toBe('ek no mere bhai')
})
// async failure
test('promise async await2',async()=>{
    const data = await fetchAsync()
    expect(data).not.toBe('ek no mere bhaii ')
})