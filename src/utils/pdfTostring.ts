import { readFileSync, unlinkSync } from 'fs';
const pdfjsLib = require('pdfjs-dist');

export async function pdfToString(filename) {
    
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
    unlinkSync(`./files/${filename}`)
    return texto.trim();
}
