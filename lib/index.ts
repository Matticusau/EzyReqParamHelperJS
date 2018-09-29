//
// Author:  Matt Lavery
// Date:    24/08/2018
// Purpose: Typescript file for providing the functionality of our module
//
// When         Who         What
// ------------------------------------------------------------------------------------------
// 29/09/2018   MLavery     Added check for null value in Validate function
//


//
// get function
//
export function get(req: any, paramname: string): any {

    // set the return if we don't find any match
    let returnValue: any = null;

    // check we have a valid defaultValue
    try {
        if (req.body != undefined) {
            if (req.body[paramname] != undefined) {
                returnValue = req.body[paramname];
            } else if (req.query[paramname] != undefined) {
                returnValue = req.query[paramname];
            }
        } else if (req.query != undefined) {
            if (req.query[paramname] != undefined) {
                returnValue = req.query[paramname];
            }
        }
    }
    catch(err) {
        returnValue = null;
        console.log("ERR: could not retrieve the param from body or query string. Null used");
    }

    // finally if nothing went wrong return the value
    return returnValue;

}


//
// validate function
//
export function validate(value: any, expectedType: string, defaultValue: any) {

    // set the return if we don't find any issues
    let returnValue: any = value;

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
        if (undefined === expectedType || expectedType.length == 0) {
            expectedType = "string";
        }
    }
    catch(err) {
        expectedType = "string";
        console.log("ERR: could not validate expectedType param. 'string' used");
    }

    try {
        // was the value defined
        if (undefined === value || null === value) {
            return defaultValue;
        } else {
            // if we can attempt to parse the type
            if (expectedType === "number")
            {
                returnValue = parseInt(value);
                if (isNaN(returnValue))
                {
                    console.log("Parsed to NotANumber (NaN) returning default");
                    return defaultValue;
                }
            } else if (expectedType === "bit") {
                console.log("converting from bit");
                returnValue = value ? 1 : 0;
                console.log("returnValue=" + returnValue);
                // switch the return type to number
                expectedType = "number";
            }
        }
    } catch(err) {
        console.log("ERR: could not validate param. Default used");
        console.log(err.name + ':'+ err.message);
        return defaultValue;
    }

    // check the type of the parameter is valid
    try {
        if (typeof returnValue != expectedType) {
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
