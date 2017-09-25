// fontMetrics.js
module.exports= {
    calculate:function(text, fontName, fontSize){
        let metric = 0;
        let i = text.length;
        while(i--){
            let character = text.charAt(i)
            this.fonts.forEach((font)=>{
                if(font.name == fontName){
                    font.glyphs.forEach((glyph)=>{
                        if(glyph.glyph ==character){
                            metric += glyph.metric;
                        }
                    })
                }
            })
        }  
        return (metric*fontSize/1000); // lenght of a string in pt (points)
    },
    /**
     * Here is font metrics library. It helps to calculate width of rendered elements in PDF. for non-monospaced fonts
     * 
     * right now only for Helvetica, unfortunately not for all chars - I'm working on it. 
     */
    fonts:[{
        name:"Helvetica",
        glyphs:[
            {glyph: ' ', metric: 278},
            {glyph: '!', metric: 278},
            {glyph: '"', metric: 355},
            {glyph: '#', metric: 556},
            {glyph: '$', metric: 556},
            {glyph: '%', metric: 889},
            {glyph: '&', metric: 667},
            {glyph: '\"', metric: 222},
            {glyph: '(', metric: 333},
            {glyph: ')', metric: 333},
            {glyph: '*', metric: 389},
            {glyph: '+', metric: 584},
            {glyph: ',', metric: 278},
            {glyph: '-', metric: 333},
            {glyph: '.', metric: 278},
            {glyph: '/', metric: 278},
            {glyph: '0', metric: 556},
            {glyph: '1', metric: 556},
            {glyph: '2', metric: 556},
            {glyph: '3', metric: 556},
            {glyph: '4', metric: 556},
            {glyph: '5', metric: 556},
            {glyph: '6', metric: 556},
            {glyph: '7', metric: 556},
            {glyph: '8', metric: 556},
            {glyph: '9', metric: 556},
            {glyph: ':', metric: 278},
            {glyph: ';', metric: 278},
            {glyph: '<', metric: 584},
            {glyph: '=', metric: 584},
            {glyph: '>', metric: 584},
            {glyph: '?', metric: 556},
            {glyph: '@', metric: 1015},
            {glyph: 'A', metric: 667},
            {glyph: 'B', metric: 667},
            {glyph: 'C', metric: 722},
            {glyph: 'D', metric: 722},
            {glyph: 'E', metric: 667},
            {glyph: 'F', metric: 611},
            {glyph: 'G', metric: 778},
            {glyph: 'H', metric: 722},
            {glyph: 'I', metric: 278},
            {glyph: 'J', metric: 500},
            {glyph: 'K', metric: 667},
            {glyph: 'L', metric: 556},
            {glyph: 'M', metric: 833},
            {glyph: 'N', metric: 722},
            {glyph: 'O', metric: 778},
            {glyph: 'P', metric: 667},
            {glyph: 'Q', metric: 778},
            {glyph: 'R', metric: 722},
            {glyph: 'S', metric: 667},
            {glyph: 'T', metric: 611},
            {glyph: 'U', metric: 722},
            {glyph: 'V', metric: 667},
            {glyph: 'W', metric: 944},
            {glyph: 'X', metric: 667},
            {glyph: 'Y', metric: 667},
            {glyph: 'Z', metric: 611},
            {glyph: '[', metric: 278},
            {glyph: '\\', metric: 278},
            {glyph: ']', metric: 278},
            {glyph: '^', metric: 469},
            {glyph: '_', metric: 556},
            {glyph: '`', metric: 222},
            {glyph: 'a', metric: 556},
            {glyph: 'b', metric: 556},
            {glyph: 'c', metric: 500},
            {glyph: 'd', metric: 556},
            {glyph: 'e', metric: 556},
            {glyph: 'f', metric: 278},
            {glyph: 'g', metric: 556},
            {glyph: 'h', metric: 556},
            {glyph: 'i', metric: 222},
            {glyph: 'j', metric: 222},
            {glyph: 'k', metric: 500},
            {glyph: 'l', metric: 222},
            {glyph: 'm', metric: 833},
            {glyph: 'n', metric: 556},
            {glyph: 'o', metric: 556},
            {glyph: 'p', metric: 556},
            {glyph: 'q', metric: 556},
            {glyph: 'r', metric: 333},
            {glyph: 's', metric: 500},
            {glyph: 't', metric: 278},
            {glyph: 'u', metric: 556},
            {glyph: 'v', metric: 500},
            {glyph: 'w', metric: 722},
            {glyph: 'x', metric: 500},
            {glyph: 'y', metric: 500},
            {glyph: 'z', metric: 500},
            {glyph: '{', metric: 334},
            {glyph: '|', metric: 260},
            {glyph: '}', metric: 334},
            {glyph: '~', metric: 584},
            {glyph: '¡', metric: 333},
            {glyph: '¢', metric: 556},
            {glyph: '£', metric: 556},
            {glyph: '¤', metric: 167},
            {glyph: '¥', metric: 556},
            {glyph: '¦', metric: 556},
            {glyph: '§', metric: 556},
            {glyph: '¨', metric: 556},
            {glyph: '©', metric: 191},
            {glyph: 'ª', metric: 333},
            {glyph: '«', metric: 556},
            {glyph: '¬', metric: 333},
            {glyph: '­', metric: 333},
            {glyph: '®', metric: 500},
            {glyph: '¯', metric: 500},
            {glyph: '±', metric: 556},
            {glyph: '²', metric: 556},
            {glyph: '³', metric: 556},
            {glyph: '´', metric: 278},
            {glyph: '¶', metric: 537},
            {glyph: '·', metric: 350},
            {glyph: '¸', metric: 222},
            {glyph: '¹', metric: 333},
            {glyph: 'º', metric: 333},
            {glyph: '»', metric: 556},
            {glyph: '¼', metric: 1000},
            {glyph: '½', metric: 1000},
            {glyph: '¿', metric: 611},
            {glyph: 'Á', metric: 333},
            {glyph: 'Â', metric: 333},
            {glyph: 'Ã', metric: 333},
            {glyph: 'Ä', metric: 333},
            {glyph: 'Å', metric: 333},
            {glyph: 'Æ', metric: 333},
            {glyph: 'Ç', metric: 333},
            {glyph: 'È', metric: 333},
            {glyph: 'Ê', metric: 333},
            {glyph: 'Ë', metric: 333},
            {glyph: 'Í', metric: 333},
            {glyph: 'Î', metric: 333},
            {glyph: 'Ï', metric: 333},
            {glyph: 'Ð', metric: 1000},
            {glyph: 'á', metric: 1000},
            {glyph: 'ã', metric: 370},
            {glyph: 'è', metric: 556},
            {glyph: 'é', metric: 778},
            {glyph: 'ê', metric: 1000},
            {glyph: 'ë', metric: 365},
            {glyph: 'ñ', metric: 889},
            {glyph: 'õ', metric: 278},
            {glyph: 'ø', metric: 222},
            {glyph: 'ù', metric: 611},
            {glyph: 'ú', metric: 944},
            {glyph: 'û', metric: 611},
            {glyph: 'Idieresis', metric: 278},
            {glyph: 'eacute', metric: 556},
            {glyph: 'abreve', metric: 556},
            {glyph: 'uhungarumlaut', metric: 556},
            {glyph: 'ecaron', metric: 556},
            {glyph: 'Ydieresis', metric: 667},
            {glyph: 'divide', metric: 584},
            {glyph: 'Yacute', metric: 667},
            {glyph: 'Acircumflex', metric: 667},
            {glyph: 'aacute', metric: 556},
            {glyph: 'Ucircumflex', metric: 722},
            {glyph: 'yacute', metric: 500},
            {glyph: 'scommaaccent', metric: 500},
            {glyph: 'ecircumflex', metric: 556},
            {glyph: 'Uring', metric: 722},
            {glyph: 'Udieresis', metric: 722},
            {glyph: 'aogonek', metric: 556},
            {glyph: 'Uacute', metric: 722},
            {glyph: 'uogonek', metric: 556},
            {glyph: 'Edieresis', metric: 667},
            {glyph: 'Dcroat', metric: 722},
            {glyph: 'commaaccent', metric: 250},
            {glyph: 'copyright', metric: 737},
            {glyph: 'Emacron', metric: 667},
            {glyph: 'ccaron', metric: 500},
            {glyph: 'aring', metric: 556},
            {glyph: 'Ncommaaccent', metric: 722},
            {glyph: 'lacute', metric: 222},
            {glyph: 'agrave', metric: 556},
            {glyph: 'Tcommaaccent', metric: 611},
            {glyph: 'Cacute', metric: 722},
            {glyph: 'atilde', metric: 556},
            {glyph: 'Edotaccent', metric: 667},
            {glyph: 'scaron', metric: 500},
            {glyph: 'scedilla', metric: 500},
            {glyph: 'iacute', metric: 278},
            {glyph: 'lozenge', metric: 471},
            {glyph: 'Rcaron', metric: 722},
            {glyph: 'Gcommaaccent', metric: 778},
            {glyph: 'ucircumflex', metric: 556},
            {glyph: 'acircumflex', metric: 556},
            {glyph: 'Amacron', metric: 667},
            {glyph: 'rcaron', metric: 333},
            {glyph: 'ccedilla', metric: 500},
            {glyph: 'Zdotaccent', metric: 611},
            {glyph: 'Thorn', metric: 667},
            {glyph: 'Omacron', metric: 778},
            {glyph: 'Racute', metric: 722},
            {glyph: 'Sacute', metric: 667},
            {glyph: 'dcaron', metric: 643},
            {glyph: 'Umacron', metric: 722},
            {glyph: 'uring', metric: 556},
            {glyph: 'threesuperior', metric: 333},
            {glyph: 'Ograve', metric: 778},
            {glyph: 'Agrave', metric: 667},
            {glyph: 'Abreve', metric: 667},
            {glyph: 'multiply', metric: 584},
            {glyph: 'uacute', metric: 556},
            {glyph: 'Tcaron', metric: 611},
            {glyph: 'partialdiff', metric: 476},
            {glyph: 'ydieresis', metric: 500},
            {glyph: 'Nacute', metric: 722},
            {glyph: 'icircumflex', metric: 278},
            {glyph: 'Ecircumflex', metric: 667},
            {glyph: 'adieresis', metric: 556},
            {glyph: 'edieresis', metric: 556},
            {glyph: 'cacute', metric: 500},
            {glyph: 'nacute', metric: 556},
            {glyph: 'umacron', metric: 556},
            {glyph: 'Ncaron', metric: 722},
            {glyph: 'Iacute', metric: 278},
            {glyph: 'plusminus', metric: 584},
            {glyph: 'brokenbar', metric: 260},
            {glyph: 'registered', metric: 737},
            {glyph: 'Gbreve', metric: 778},
            {glyph: 'Idotaccent', metric: 278},
            {glyph: 'summation', metric: 600},
            {glyph: 'Egrave', metric: 667},
            {glyph: 'racute', metric: 333},
            {glyph: 'omacron', metric: 556},
            {glyph: 'Zacute', metric: 611},
            {glyph: 'Zcaron', metric: 611},
            {glyph: 'greaterequal', metric: 549},
            {glyph: 'Eth', metric: 722},
            {glyph: 'Ccedilla', metric: 722},
            {glyph: 'lcommaaccent', metric: 222},
            {glyph: 'tcaron', metric: 317},
            {glyph: 'eogonek', metric: 556},
            {glyph: 'Uogonek', metric: 722},
            {glyph: 'Aacute', metric: 667},
            {glyph: 'Adieresis', metric: 667},
            {glyph: 'egrave', metric: 556},
            {glyph: 'zacute', metric: 500},
            {glyph: 'iogonek', metric: 222},
            {glyph: 'Oacute', metric: 778},
            {glyph: 'oacute', metric: 556},
            {glyph: 'amacron', metric: 556},
            {glyph: 'sacute', metric: 500},
            {glyph: 'idieresis', metric: 278},
            {glyph: 'Ocircumflex', metric: 778},
            {glyph: 'Ugrave', metric: 722},
            {glyph: 'Delta', metric: 612},
            {glyph: 'thorn', metric: 556},
            {glyph: 'twosuperior', metric: 333},
            {glyph: 'Odieresis', metric: 778},
            {glyph: 'mu', metric: 556},
            {glyph: 'igrave', metric: 278},
            {glyph: 'ohungarumlaut', metric: 556},
            {glyph: 'Eogonek', metric: 667},
            {glyph: 'dcroat', metric: 556},
            {glyph: 'threequarters', metric: 834},
            {glyph: 'Scedilla', metric: 667},
            {glyph: 'lcaron', metric: 299},
            {glyph: 'Kcommaaccent', metric: 667},
            {glyph: 'Lacute', metric: 556},
            {glyph: 'trademark', metric: 1000},
            {glyph: 'edotaccent', metric: 556},
            {glyph: 'Igrave', metric: 278},
            {glyph: 'Imacron', metric: 278},
            {glyph: 'Lcaron', metric: 556},
            {glyph: 'onehalf', metric: 834},
            {glyph: 'lessequal', metric: 549},
            {glyph: 'ocircumflex', metric: 556},
            {glyph: 'ntilde', metric: 556},
            {glyph: 'Uhungarumlaut', metric: 722},
            {glyph: 'Eacute', metric: 667},
            {glyph: 'emacron', metric: 556},
            {glyph: 'gbreve', metric: 556},
            {glyph: 'onequarter', metric: 834},
            {glyph: 'Scaron', metric: 667},
            {glyph: 'Scommaaccent', metric: 667},
            {glyph: 'Ohungarumlaut', metric: 778},
            {glyph: 'degree', metric: 400},
            {glyph: 'ograve', metric: 556},
            {glyph: 'Ccaron', metric: 722},
            {glyph: 'ugrave', metric: 556},
            {glyph: 'radical', metric: 453},
            {glyph: 'Dcaron', metric: 722},
            {glyph: 'rcommaaccent', metric: 333},
            {glyph: 'Ntilde', metric: 722},
            {glyph: 'otilde', metric: 556},
            {glyph: 'Rcommaaccent', metric: 722},
            {glyph: 'Lcommaaccent', metric: 556},
            {glyph: 'Atilde', metric: 667},
            {glyph: 'Aogonek', metric: 667},
            {glyph: 'Aring', metric: 667},
            {glyph: 'Otilde', metric: 778},
            {glyph: 'zdotaccent', metric: 500},
            {glyph: 'Ecaron', metric: 667},
            {glyph: 'Iogonek', metric: 278},
            {glyph: 'kcommaaccent', metric: 500},
            {glyph: 'minus', metric: 584},
            {glyph: 'Icircumflex', metric: 278},
            {glyph: 'ncaron', metric: 556},
            {glyph: 'tcommaaccent', metric: 278},
            {glyph: 'logicalnot', metric: 584},
            {glyph: 'odieresis', metric: 556},
            {glyph: 'udieresis', metric: 556},
            {glyph: 'notequal', metric: 549},
            {glyph: 'gcommaaccent', metric: 556},
            {glyph: 'eth', metric: 556},
            {glyph: 'zcaron', metric: 500},
            {glyph: 'ncommaaccent', metric: 556},
            {glyph: 'onesuperior', metric: 333},
            {glyph: 'imacron', metric: 278},
            {glyph: 'Euro', metric: 556}
        ]
    }]

}
