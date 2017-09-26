const assert = require('chai').assert;
const pdflib = require("../Lib/pdflib.js");

let s = {
    OK:"Sunny day test!",
    notNumber:"Should be a number.",
    notGraeter0:"Should be greater than zero."
}


describe('pdflib',function(){
    describe('NextID()',function(){
        it(s.OK,function(){
            let result = pdflib.nextID();
            assert.isNumber(result, s.notNumber);
            assert.isAtLeast(result,1, s.notGraeter0);
        });
    });
    describe('addObject()',function(){
        it(s.OK,function(){
            let result = pdflib.addObject(1,"What ever content");
            assert.isNumber(result, s.notNumber);
            assert.isAtLeast(result,1, s.notGraeter0);
        });
}   );
});