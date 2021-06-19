
const fs = require('fs');

const path = require('path');

import * as fsx from 'fs-extra';

const Handlebars = require("handlebars");

// to minify the output html
const minify = require('html-minifier').minify;

// These are some useful handlerbar helpers 
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotIn', function(arg1, arg2, options) {
    return (arg2.includes(arg1)) ? options.inverse(this) : options.fn(this);
});


Handlebars.registerHelper('isLessThanEqual', function(arg1, arg2, options) {
    return (arg1 <= arg2) ? options.fn(this) : options.inverse(this);
});

const ASSET_URL =  '';

Handlebars.registerHelper('asset_url_helper', function () {
    return ASSET_URL
})

const dataPath = 'data/userData.json';
const handlerbarTemplatePath = 'templates/handlerbar/template1.hbs'
const htmlPath = `output_html/template1.html`;

import { ProcessInput } from './core/process_input';
import { UserData } from './core/types/interfaces';

export const generateEmail = async () =>{
    return await new Promise(async (resolve, reject)=>{
        try{
            // input data
            const inputDataFilePath = dataPath;
            const inputJson = await fsx.readJson(inputDataFilePath) as UserData;

            const processInput = new ProcessInput();
            const processedData = processInput.process(inputJson);

            const templateStr = fs.readFileSync(path.resolve(process.cwd(), handlerbarTemplatePath)).toString('utf8');
            const template = Handlebars.compile(templateStr, { noEscape: true });
            const emailHtml = template(processedData);

            // final output
            const minifiedEmailHtml = minify(emailHtml, {collapseWhitespace:true, minifyCSS: true});

            fs.writeFileSync(htmlPath, minifiedEmailHtml);

            resolve(true);

        }catch(e){
            console.log("Err => ",e);
            reject(e);
        }
    });
}