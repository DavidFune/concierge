const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

export async function stringTopdf(text: string) {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();

    const fonteSize = 12;
    const x = 50;
    const y = page.getHeight() - 50;
    
    page.drawText(text, { x, y, size: fonteSize });

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}

export async function savePDF(pdfBytes, path: string) {
    try {
        //await fs.promises.writeFile(path, pdfBytes);
        console.log('PDF salvo com sucesso!');
    } catch (erro) {
        console.error('Ocorreu um erro ao salvar o PDF:', erro);
    }
}