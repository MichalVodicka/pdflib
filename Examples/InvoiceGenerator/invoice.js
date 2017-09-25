

let PDF = require('../../Lib/pdflib.js');
let fontMetrics = require('../../Lib/fontMetrics.js');
PDF.init(require('fs')); // pass FS module to PDF module


let page1 = PDF.newPage({height:842, width:595});

page1.addText({ content: "Invoice No 123456", fontSize:36, x: 200, y:800});

page1.addText({content: "ITEM", fontSize:14, x:50, y:600});
page1.addText({content: "UNIT COST", fontSize:14, x:300, y:600});
page1.addText({content: "QUANTITY", fontSize:14, x:400, y:600});
page1.addText({content: "TOTAL", fontSize:14, x: 500, y:600});

// following three text strings we want to have them aligned to right. There is no build-in function in PDF for that. We have to calculate position (from left side of page) based on font metrics. 
// For non-monospaced font we have to calculate metrics each character from a string. For monospaced we only have to multiply number of character in string by width of a glyph

// Calcuating position from the left(x) for text Sub total
let x =350-fontMetrics.calculate("Sub total","Helvetica", 12);
page1.addText({ content: "Sub total", fontSize:12, x: x, y:84});

// Calcuating position from the left(x) for text Paid to date
x =350-fontMetrics.calculate("Paid to date","Helvetica", 12);
page1.addText({ content: "Paid to date", fontSize:12, x: x, y:69});

// Calcuating position from the left(x) for text Balance due
x =350-fontMetrics.calculate("Balance due","Helvetica", 14);
page1.addText({ content: "Balance due", fontSize:14, x: x, y:50});

/**
 * Add one item/product to invoice
 * @param {*} item object that contains name, unit cost, quantity, and total 
 */
let addInvoiceItem = function(page,item,level){
    page.addText({ content: item.name, fontSize:12, x:50, y:level});
    page.addText({ content: item.unitCost, fontSize:12, x:300, y:level});
    page.addText({ content: item.quantity, fontSize:12, x:400, y:level});
    page.addText({ content: item.total, fontSize:12, x:500, y:level});
    return true
}

// Add invoice items
addInvoiceItem(page1,{ name:"Developer work", unitCost:"35", quantity:"300", total:"10500"}, 575); // 575 how many points from bottom it will be 
addInvoiceItem(page1,{ name:"consultancy work", unitCost:"55", quantity:"300", total:"16500"}, 560);
addInvoiceItem(page1,{ name:"sw analyst work", unitCost:"45", quantity:"300", total:"13500"}, 545);
addInvoiceItem(page1,{ name:"QA", unitCost:"45", quantity:"300", total:"13500"}, 530);
addInvoiceItem(page1,{ name:"sw analyst work", unitCost:"45", quantity:"300", total:"13500"}, 515);
addInvoiceItem(page1,{ name:"sw analyst work", unitCost:"45", quantity:"300", total:"13500"}, 500);
addInvoiceItem(page1,{ name:"sw analyst work", unitCost:"45", quantity:"300", total:"13500"}, 485);
addInvoiceItem(page1,{ name:"sw analyst work", unitCost:"45", quantity:"300", total:"13500"}, 470);

// draw line between two point (start and end point).  Xstart, Ystart, Xend, Yend. 
page1.addLine(50,800,545,800);

PDF.Pages.push(page1);
// output PDF. Automaticaly it writes two file: invoice.pdf and invoice.pdf.txt
PDF.fileName = __dirname+"/invoice.pdf";

PDF.writePDF(PDF.buildPDF(PDF), PDF.fileName);