const assert = require('assert');
const { validateSchema } = require('../lib/schema-validator');

console.log("Test #1: Simple validation");

// Test: Check if we can validate a simple object
const obj = {
    prop1: "Test String",
    prop2: "1234567890",
    prop3: 10
}

validateSchema({
    prop1: { type: "string" },
    prop2: { type: "string", regex: /[0-9]/ },
    prop3: { type: "number" }
}, obj);

console.log("Test #2: Validation in strict mode");

// This test validates if strict mode throws an error.
(function() {
    try {
        validateSchema({
            prop1: { type: "string" },
            prop2: { type: "string", regex: /[0-9]/ }
        }, obj, true);
    } catch(e) {
        return;
    }
    
    throw new Error("Test #2 failed");
})();
