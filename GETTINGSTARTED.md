# EzyReqParamHelperJS - Developer Reference

This project was built using steps based on the following blog post. The steps are recorded here for reference. 

- [Writing a Node.js module in TypeScript](https://www.twilio.com/blog/2017/06/writing-a-node-module-in-typescript.html)

## Installing dependencies

1. Create a new directory for your module and initialize the package.json with these commands

    ```cmd
    mkdir EzyReqParamHelperJS
    cd EzyReqParamHelperJS
    npm init -y
    ```

1. install typescript dependency

    ```cmd
    npm install typescript --save-dev
    ```

1. Install any other depenendencies as required by your module

## Configuring the TypeScript project

1. Create a `tsconfig.json` file using the initalizer

    ```cmd
    ./node_modules/.bin/tsc --init
    ```

1. Modify the contents of the `tsconfig.json` file as required. Particularly the declaration and outDir. Setting the `declaration` attribute to true ensures that the compiler generates the respective TypeScript definitions files aside of compiling the TypeScript files to JavaScript files. The `outDir` parameter defines the output directory as the dist folder.

    ```json
    {
        "compilerOptions": {
            "target": "es6",
            "module": "commonjs",
            "declaration": true,
            "outDir": "./dist",
            "strict": true
        }
    }
    ```

1. Modify the `package.json` file to have a build script that builds our code.

    ```json
    ...
    "scripts": {
        "prepublish": "npm run build",
        "build": "tsc",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ...
    ```

1. Modify the `package.json` file to point to the javascript file which will be compiled

    ```json
    ...
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    ...
    ```

## Create the module

1. Create a `\lib` folder in the root of our project.

1. Create a new `\lib\index.js` file.

1. Start writing your module code in this file

## Compile the module

1. Run `npm run build` to compile the module

1. You should have a `\dist` folder created with the compiled javascript file(s)
