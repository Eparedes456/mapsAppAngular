const {writeFileSync,mkdirSync} = require('fs');

require('dotenv').config();

const targetPath = './src/enviroments/environment.ts';

const envFileContent = `

    export const environment = {
        mapbox_key: "${process.env('MAPBOX_KEY')}",
        otra: "PROPIEDAD"
    }

`; 

mkdirSync('./src/enviroments',{recursive:true});
writeFileSync(targetPath,envFileContent); 

