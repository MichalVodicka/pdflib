// pdflib.js
module.exports = {
    fs: null, // placeholder for FS module
    fileName:"pdfFile.pdf",
    header:"%PDF-1.5", // header including version
    buildTrailer: (size, root, byteLenght)=>{return "\ntrailer <</Size "+size+"/Root "+root+" 0 R>>"+
                "\nstartxref\n" +
                + byteLenght +
                "\n%%EOF"},
    buildXRef:function(size){return "\nxref\n0 "+ size+ "\n0000000000 65535 f"+ this.xRef}, // return cross reference table (xRef)
    xRef:"",
    /**
     * arrya of page objectst, Page object is a main object of PDF, there are stored resources and structure of PDF and whole data
     */
    Pages:[],
    init:function(fs){
        if(fs && {}.toString.call(fs) == '[object Function]'){
            console.log("FS module is required");
        }
        this.fs = fs;
    },
    generatePage:function(page){
        page.gid = this.nextID(); // gid = generated ID
        let contentID = this.nextID();
        let stream =""; // place holder for stream object 
        let content = ""; 
        /**
         * handle texts related to this page
         */
        let alreadyAddedFont = [] ;
        addObject = this.addObject;
        page.texts.forEach(function(element) {
            let fontObjID = this.addBaseFont(element.font);
                if(alreadyAddedFont.indexOf(fontObjID)===-1){
                    alreadyAddedFont.push(fontObjID);
                    page.resourceDictionary.fonts.push({ // push information about font to resource dicitonarry object
                    objectID: fontObjID,
                    name: element.font
                    });
                }
            stream += "\nBT /"+element.font+" "+element.fontSize+" Tf "+element.position+" Td ("+element.content+")Tj ET";

        }, this);

        /**
         * generate Image string 
         * e.g. 
         *      q 256 0 0 256 45 145 cm /Im8 Do Q
         */
        let alreadyAddedImage = []; // list of images(xObject) IDs added for this page
        page.images.forEach(function(image){
            let imgID = this.addImageFromFile(image);
            if(alreadyAddedImage.indexOf(imgID)===-1){
                alreadyAddedImage.push(imgID);
                page.resourceDictionary.xObjects.push({
                        objectID: imgID,
                        name: "\Im"+imgID
                });
                stream += "\nq "+image.width+" 0 0 "+image.height+" 45 145 cm /Im"+imgID+" Do Q";
            }
            // add ProcSet for this page
            page.resourceDictionary.procSet.indexOf("/PDF") === -1? page.resourceDictionary.procSet.push("/PDF"):false;
            page.resourceDictionary.procSet.indexOf("/"+image.type) === -1? page.resourceDictionary.procSet.push("/"+image.type):false;
        },this);
        stream += page.rawStream;
        this.addObject(contentID,"<</Length "+stream.length+">>\nstream"+stream+"\nendstream"); // add stream object into object array
        this.addObject(page.gid, "<</Type /Page /Parent "+page.parent +" 0 R "+this.buildResourceDictionary(page.resourceDictionary)+" /MediaBox "+page.mediaBox +" /Contents "+contentID+" 0 R>>");
        return page.gid;

    },

    buildResourceDictionary: function(resourceDictionary){
        
        if(resourceDictionary==={}){
            return true;
        }
        let RDstring = "";
        
        // ProcSet 
        let procSetResources = "";
        resourceDictionary.procSet.forEach(function(procSet){
        procSetResources += " "+procSet;                
        });
        RDstring += procSetResources === ""? "" :"\n/ProcSet ["+procSetResources+" ]";

        // FONTS
        let fontRecources = "";
        resourceDictionary.fonts.forEach((font)=>{
            fontRecources += " /" +font.name + " "+font.objectID+" 0 R";
        },this);
        RDstring += fontRecources!=""? "\n/Font <<\n"+fontRecources+">>" : "";

        // xObjects - images only (just for now)
        let xObjectRecources = "";
        resourceDictionary.xObjects.forEach((xObject)=>{
            xObjectRecources += " /" +xObject.name + " "+xObject.objectID+" 0 R";
        },this);
        RDstring += xObjectRecources!=""? "\n/XObject <<\n"+xObjectRecources+">>" : "" ;
        if(RDstring===""){
            return "";
        }
        RDstring = " /Resources <<" +RDstring +">>"//

        return RDstring;
    },

    /**
     * newPage function is not for use inside of the library. It is called from an app and than pushed to pagess array.
     * currently there is limited support for 
     */
    newPage:function(page){
        this.parent = 2; // it will be always no. 2 
        this.mediaBox = (page.height === undefined && page.width === undefined)? "[0 0 595 842]": "[0 0 "+page.width+" "+page.height+"]"; // if no height or width provided use A4 format

        /** text object example
         * {
            id:"Subject",
            content:"What is seen",
            font:"Courier", // Times-Roman, Helvetica
            fontSize:"40", // Normal, heading1, etc
            position: "440 230"
        }
         */
        this.addText = function(text){
            text.position = (text.x !==undefined && text.y !== undefined)? text.x+" "+text.y: "1 1";
            this.texts.push({
            id:text.subject!==undefined?text.subject:"DefaultSubject",
            content:text.content!==undefined?text.content:"Default Content",
            font:text.font!==undefined?text.font:"Helvetica",
            fontSize:text.fontSize!==undefined?text.fontSize:12, // Normal, heading1, etc
            position: text.position!==undefined?text.position:"1 1" // TODO change to x and y properties
            });
        };

/**
 * {id:"hullla", //i.e name. used in PDF like /mySuperName
            path:"/Code_128_Barcode_Graphic.jpg",
            type: "ImageC",
            width:256,
            height:256,
            x:100,
            y:100,
            colorSpace: "/DeviceRGB", // leading with / is necessary
            bitsPerComponent:8, 
            filters:"[/ASCIIHexDecode /DCT]" //"/DCT" // posible to use string or pdf array  e.g. filters: "[/DCT /Deflate]" (not javascript array e.g. filters: ["/DCT", "/Deflate"])}
 */

        this.addImage = function(image){
            this.images.push({
            id:image.id!==undefined?image.id:"Default ID",
            path:image.path!==undefined?image.path:"",
            type:image.type!==undefined?image.type:"ImageC",  // ImageC = color, ImageB - black and white
            width:image.width!==undefined?image.width:15,
            height:image.height!==undefined?image.height:15,
            x:image.x!==undefined?image.x:1, 
            y: image.y!==undefined?image.y:1,
            colorSpace: image.colorSpace !==undefined?image.colorSpace:"/DeviceRGB",
            bitsPerComponent: image.bitsPerComponent!==undefined?image.bitsPerComponent:8,
            filters:"[/ASCIIHexDecode /DCT]" // right now only filter type which successfully works for me
            });
        };

        this.addLine = (xStart,yStart,xEnd,yEnd,width=1)=>{
            this.rawStream += "\n"+width+" w "+xStart+" "+yStart+" m "+xEnd+" "+yEnd+" l S";
        }


        this.resourceDictionary = {fonts:[],xObjects:[],procSet:[]}; // only for building "page header" purpose 
        this.texts = []; // list of text objects attached to this page
        this.images = []; // list of images objects attached to this page
        this.rawStream = "";
        return this;
    },
    /**
     * list of images/fonts add to PDF - for not to add image / font second time 
     * 
     */
   Resources:{
        fonts:[],
        images:[],
        addFont:function(objectID,id){this.fonts[id] = objectID},
        addImage:function(objectID,id){this.images[id] = objectID}
    },
         /**
         * Add JPG (only) image from filesystem to image library.
         * e.g.
         * 
         * <</Type /XObject /Subtype /Image /Width 256 /Height 256 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Length 310114 /Filter [/ASCIIHexDecode /DCT]>>
         *   stream
         *  ffd8ff ..... ffd9
         *  endstream
         *  
         * 
         * @param name          object image {path: absolute path to image}
         * @return              object ID (PDF object id)
         */

    addImageFromFile:function(image){
        //check if image is already in global resources 
        if(this.Resources.images[image.id] === undefined){
            let fileImage = new Buffer(fs.readFileSync(image.path)).toString("hex"); // using hex instead of utf8 because, it is simply working. 
            let imageObjID = this.nextID();
            // build a header of this image pdf object 
            let imageObject = "<</Type /XObject /Subtype /Image /Width "+image.width+" /Height "+image.height+" /ColorSpace "+image.colorSpace+" /BitsPerComponent "+image.bitsPerComponent+" /Length "+fileImage.length+" /Filter "+image.filters+">>"; // objecct header
            imageObject += "\nstream\n"+fileImage+"\nendstream"; // this pdf object stream
            this.addObject(imageObjID,imageObject);
            // add to global resources for 
            this.Resources.addImage(imageObjID, image.id)
            return imageObjID;
        }
        return this.Resources.images[image.id];
    },
        /**
         * Add to base font to library
         * 
         * @param name          name of base font which is already embeded in PDF viewer
         * @return              object ID (PDF object id)
         */
   addBaseFont: function(name){ // name  e.g Helvetica
        if(this.Resources.fonts[name] === undefined){
            let fontObjID = this.nextID();
            this.addObject(fontObjID,"<</Type /Font /Subtype /Type1 /BaseFont /"+name+">>");
            this.Resources.addFont(fontObjID,name);
            return fontObjID;
        }
        return this.Resources.fonts[name];
    },
    lastObjectID:0,
    objects:[],
    nextID:function(){this.lastObjectID +=1; return this.lastObjectID},
    addObject:function(objectID,objectContent){
        this.objects[objectID]=objectContent; return objectID},
    addxRef : function(position){
        let positionWLZ = "000000000"+position; // add leading zeros e.g 12345 => 000000000012345, 1 => 0000000001
        positionWLZ = positionWLZ.substring(positionWLZ.length-10); // cut down to 10 digits e.g. 000000000012345 => 0000012345, 0000000001 =(will be the same)= 0000000001 
        this.xRef+="\n"+positionWLZ+" 00000 n "},
         /**
         * Start building whole PDF
         * e.g.
         * 
         * <</Type /XObject /Subtype /Image /Width 256 /Height 256 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Length 310114 /Filter [/ASCIIHexDecode /DCT]>>
         *   stream
         *  ffd8ff ..... ffd9
         *  endstream
         *  
         * 
         * @param PDF          object that hold everything about pdf
         * @return              string that represent whole PDF, utf8 encoded
         */


    buildPDF:function(PDF){

        
        /**
         * Simply add a string to final pdf file
         * @param {*} corpus text string 
         */
        let addContent = (corpus) =>{pdfContent += corpus; return true;};
        let pdfContent = ""; // whole PDF content
        let catalogId = this.nextID(); 
        let pagesId = this.nextID(); 
        /**
         * 
         * @param {*} objectID PDF object ID 
         * @param {*} objectContent string of PDF object without object leading and trailing tags e.g. 1 0 R obj .....  end obj
         */
        
        
        
        addContent(this.header);
        this.addObject(catalogId,"<</Type /Catalog /Pages "+pagesId+" 0 R>>");
        
        this.Pages.forEach((page)=>{
            this.generatePage(page);
        })

        let pagesKids = "";
        this.Pages.forEach((el)=>{
            pagesKids += " "+el.gid+" 0 R";
        });

        this.addObject(pagesId,"<</Type /Pages /Kids ["+pagesKids+"] /Count "+PDF.Pages.length+">>"); 
        this.objects.forEach((el,index)=>{
            this.addxRef(pdfContent.length);
            let object = "\n" + index +" 0 obj " + el + "\nendobj";
            addContent(object);
        });

        let byteSizeOfPDFBody = pdfContent.length; // all objects including header
        addContent(this.buildXRef(this.objects.length));
        addContent(this.buildTrailer(this.objects.length,catalogId,byteSizeOfPDFBody));
        return pdfContent;

    },

    /**
         * generic function  - save a file to filesystem
         * e.g.
         * 
         * <</Type /XObject /Subtype /Image /Width 256 /Height 256 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Length 310114 /Filter [/ASCIIHexDecode /DCT]>>
         *   stream
         *  ffd8ff ..... ffd9
         *  endstream
         *  
         * 
         * @param PDF          object that hold everything about pdf
         * @return             return always true
         */

    writePDF:function(content, fileName){    
        this.fs.writeFile(fileName, Buffer.from(content, "utf8"), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            
        }); 
        return true;
         
    }
};