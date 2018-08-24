//
// Author: Matt Lavery
// Date: 06/03/2018
// Purpose: helper module for validating parameters
//
// Who          When            What
// ---------------------------------------------------------------------------
// MLavery      06/03/2018      Initial code
// MLavery      16/05/2018      Added get
// MLavery      19/05/2018      Removed the length check in Get() as this breaks for numbers

// get
function get(req, paramname) {

    // set the return if we don't find any match
    var returnValue = null;

    // check we have a valid defaultValue
    try {
        // if (req.body[paramname] != undefined && req.body[paramname].length > 0) {
        if (req.body[paramname] != undefined) {
            returnValue = req.body[paramname];
        // } else if (req.query[paramname] != undefined && req.query[paramname].length > 0) {
        } else if (req.query[paramname] != undefined) {
            returnValue = req.query[paramname];
        }
    }
    catch(err) {
        returnValue = null;
        console.log("ERR: could not retrieve the param from body or query string. Null used");
    }

    // finally if nothing went wrong return the value
    return returnValue;
}

// Validate
function validate(value, expectedType, defaultValue) {

    // set the return if we don't find any issues
    var returnValue = value;

    // check we have a valid defaultValue
    try {
        if (undefined === defaultValue)
        {
            defaultValue = null;
        }
    }
    catch(err) {
        defaultValue = null;
        console.log("ERR: could not validate defaultValue param. Null used");
    }

    // assume string if we didn't get a type
    try {
        if (undefined === expectedType || expectedType.length == 0)
        {
            expectedType = "string";
        }
    }
    catch(err) {
        expectedType = "string";
        console.log("ERR: could not validate expectedType param. 'string' used");
    }

    try {
        // was the value defined
        if (undefined === value)
        {
            return defaultValue;
        }
        else
        {
            // if we can attempt to parse the type
            if (expectedType === "number")
            {
                returnValue = parseInt(value);
                if (isNaN(returnValue))
                {
                    console.log("Parsed to NotANumber (NaN) returning default");
                    return defaultValue;
                }
            } else if (expectedType === "bit")
            {
                console.log("converting from bit");
                returnValue = value ? 1 : 0;
                console.log("returnValue=" + returnValue);
                // switch the return type to number
                expectedType = "number";
            }
        }
    }
    catch(err) {
        console.log("ERR: could not validate param. Default used");
        console.log(err.name + ':'+ err.message);
        return defaultValue;
    }
    
    // check the type of the parameter is valid
    try {
        if (typeof returnValue != expectedType)
        {
            console.log('Parameter type invalid. Expected ['+expectedType+'], Received ['+(typeof returnValue)+']');
            return defaultValue;
        }
    }
    catch(err) {
        console.log("ERR: could not test param type. Default used");
        console.log(err.name + ':'+ err.message);
        return defaultValue;
    }


    // finally if nothing went wrong return the value
    return returnValue;
}

// set the exported functions for this module
module.exports.get = get;
module.exports.validate = validate;
