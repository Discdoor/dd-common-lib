/**
 * Validates the specified schema.
 * @param {*} schema The schema to validate against.
 * @param {*} inData The data to check.
 * @param {boolean} strictMode Whether to strictly check objects (they must match exactly).
 */
 function validateSchema(schema, inData, strictMode = true) {
    if(typeof schema !== 'object' || typeof inData !== 'object')
        return false;

    const schemaProps = Object.keys(schema);

    // Prereq: Check if the properties are the exact same if we are in strict mode
    const pObjKeys = Object.keys(inData);
    
    for(let objKey of pObjKeys) {
        // Check if schema rule exists
        if(!schemaProps.includes(objKey))
            throw new Error(`Key "${objKey}" not present in schema.`);
    }

    // Do the validation
    for(let scp of schemaProps) {
        const objectProp = inData[scp];
        const schemaRule = schema[scp];

        // Check if property exists
        if(typeof objectProp === 'undefined')
            throw new Error(`Required property "${scp}" does not exist.`);
        else if(typeof objectProp !== schemaRule.type)
            throw new Error(`Property "${scp}" does not match target type "${schemaRule.type}`);

        // Do additional checks for specific types
        switch(schemaRule.type) {
            case "number":
                let fmtNum = (schemaRule.mustBeInt) ? (objectProp|0) : objectProp;

                if((typeof schemaRule.min == 'number') && (fmtNum < schemaRule.min))
                    throw new Error(`Property "${scp}" < ${schemaRule.min}`);
                else if((typeof schemaRule.max == 'number') && (fmtNum > schemaRule.max))
                    throw new Error(`Property "${scp}" > ${schemaRule.max}`);
                break;
            case "string":
                if((typeof schemaRule.maxLength == 'number') && (objectProp.length > schemaRule.maxLength))
                    throw new Error(`Property "${scp}" > ${schemaRule.maxLength}`);
                else if((typeof schemaRule.minLength == 'number') && (objectProp.length < schemaRule.minLength))
                    throw new Error(`Property "${scp}" < ${schemaRule.minLength}`);
                
                // Check regex
                if(schemaRule.regex && (!schemaRule.regex.test(objectProp)))
                    throw new Error(`Property "${scp}" failed regex match.`);
                break;
        }
    }

    return true;
}

module.exports = {
    validateSchema
}