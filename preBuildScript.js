const fsx = require('fs-extra');

(async() => {

    await fsx.emptyDir('./dist');
    
    const templatesSrc = './templates';
    const templateDest = './dist/templates';
    await fsx.copy(templatesSrc, templateDest);

    const nodeModulesSrc = './node_modules';
    const nodeModulesDest = './dist/node_modules';
    await fsx.copy(nodeModulesSrc, nodeModulesDest);

})();