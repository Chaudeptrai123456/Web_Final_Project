 
var path = require('path');
const formidable  =require('formidable')
let upfile =  (req)=>{
    var form = new formidable.IncomingForm();

    form.parse(req);
    
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/images/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    console.log(form)
}

module.exports = {
    upfile:upfile
}