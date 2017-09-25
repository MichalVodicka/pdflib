let fs = require('fs');

let PDF = "%PDF-1.5"; // version of PDF
/**
 * Add catalog object e.g. 
 * 
 * 1 0 obj <</Type /Catalog /Pages 2 0 R>> 
 * endobj
 */
PDF += "\n1 0 obj <</Type /Catalog /Pages 2 0 R>> \nendobj"; // \n is for new line

/**
 * Add pages object. It is something like container for pages(Kids) in our example there is only one page, e.g.
 * 
 * 2 0 obj <</Type /Pages /Kids [ 3 0 R] /Count 1>>
 * endobj
 * 
 */

PDF += "\n2 0 obj <</Type /Pages /Kids [ 3 0 R] /Count 1>> \nendobj"; // Kids [3 0 R] - object ID of page

 /**
  * Add actual page. 
    Parent element index to a Pages container. 
    MediaBox is size of page in points(pt not px) 
    Contents is content stream
  * e.g.
  *
  * 3 0 obj <</Type /Page /Parent 2 0 R  /Resources <<    
  * /Font <</Helvetica 5 0 R>>>>
  * /MediaBox [0 0 200 200] /Contents 4 0 R>>
  * endobj
  */
  
PDF += "\n3 0 obj <</Type /Page /Parent 2 0 R  ";
PDF += "/Resources <<"; //Resources element contains other elements fonts, images etc. 
PDF += "/Font <</FontNo1 5 0 R>>>> ";  // FontNo1 is name of font used in content strem for the page
PDF += "/MediaBox [0 0 200 200]"; // MediaBox is size of page in points(pt not px) 
PDF += "/Contents 4 0 R>>" // object ID of content stream
PDF += "\nendobj";


/**
 * 
 * Content stream object
 * 
 * 4 0 obj <</Length 107>>
stream
BT /Helvetica 14 Tf 50 150 Td (Salut tout le monde.)Tj ET
BT /Helvetica 14 Tf 30 30 Td (Hello world.)Tj ET
endstream
endobj
 */


PDF +=  "\n4 0 obj <</Length 107>>";
PDF += "\nstream";
PDF += "\nBT /FontNo1 14 Tf 50 150 Td (Salut tout le monde.)Tj ET"; // Salut tout le monde string, /FontNo1 = name of a font from rosources dictionary from page, 50 150 are cordination on the page from left down corner. i.e. 50 points from left and 150 points from bottom.
PDF += "\nBT /FontNo1 14 Tf 30 30 Td (Hello world.)Tj ET" // Hello world
PDF += "\nendstream"; 
PDF += "\nendobj";


/** 
 * Font Object
 * 
 * 5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj 
*/

PDF += "\n5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> \nendobj"; // here is real name of the font from 14 base font 


/**
 * xref
0 7
0000000000 65535 f
0000000008 00000 n 
0000000055 00000 n 
0000000111 00000 n 
0000000242 00000 n 
0000000397 00000 n 
 * 
 * 
 */

 PDF += "\nxref";
 PDF += "\n0 6 "; // last position how many object are in the pdf
 PDF += "\n0000000000 65535 f "; // allways the same
 PDF += "\n0000000008 00000 n "; // 8 bytes from begining of the file is first object (catalog object)
 PDF += "\n0000000055 00000 n "; // 55 bytes from begining of the file is second object (pages object)
 PDF += "\n0000000111 00000 n "; // 111 bytes from begining of the file is third object (page object)
 PDF += "\n0000000242 00000 n "; // 242 bytes from begining of the file is fourth object (stream object)
 PDF += "\n0000000397 00000 n "; // 397 bytes from begining of the file is last object (font object)

 /**
  * Trailer 
  
  trailer <</Size 5 /Root 1 0 R>>

  */

PDF += "\ntrailer <</Size 6/Root 1 0 R>>"; // size = how many object are in PDF, root = catalog object id

  /**
   * startxref
        465
        %%EOF
   */

   PDF += "\nstartxref";
PDF += "\n465"; // count of bytes from begining od the file to xref;
PDF += "\n%%EOF"; // end of the file


fs.writeFile(__dirname+"/Basic PDF.pdf", PDF, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});    

fs.writeFile(__dirname+"/Basic PDF.txt", PDF, function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!");
});  