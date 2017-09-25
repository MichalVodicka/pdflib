let PDF = require('../../Lib/pdflib.js');
PDF.init(require('fs')); // pass file system module to PDF module


let page = new PDF.newPage({
    height:200,
    width:200
});

page.addText({
    content: "Salut tout le monde.",
    fontSize:14,
    x: 50,
    y:150
});
page.addText({
    content: "Hello world.",
    fontSize:14,
    x: 30,
    y:30
});
PDF.Pages.push(page);

PDF.writePDF(PDF.buildPDF(PDF), __dirname+"/hello world.pdf");