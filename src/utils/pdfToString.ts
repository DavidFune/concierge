const pdfjsLib = require('pdfjs-dist');

import { readFileSync, unlinkSync } from 'fs';
import { savePDF, stringTopdf } from './stringTopdf';

export async function pdfToString(filename: string) {
    
    const file = readFileSync(`./files/${filename}`)
    const data = new Uint8Array(file);
    const pdf = await pdfjsLib.getDocument(data).promise;

    let texto = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const content = await page.getTextContent();

        content.items.forEach(item => {
            texto += item.str + ' ';
        });
    }

    const separator = "Compensação/Autenticação Mecânica"
    
    const boletos = texto.trim().split(separator)

    unlinkSync(`./files/${filename}`)

    try {        
        boletos.forEach(async (element) => { 
            const toPDF = await stringTopdf(element + separator)
            //await savePDF(toPDF, './files/pdf')
        });
    } catch (error) {
        error.log(error);
        return ;   
    }

    return boletos;
}
