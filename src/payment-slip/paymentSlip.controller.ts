import { Body, Controller, Post, Get, UploadedFile, UseInterceptors, BadRequestException, } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { PaymentSlipService } from './paymentSlip.service';
import { pdfToString } from 'src/utils/pdfTostring';

@Controller('/payment-slip')
export class PaymentSlipController {

    constructor(private paymentSlippService: PaymentSlipService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files'
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {

        const extesion = ['csv', 'pdf']
        const fileEx = file.originalname.split('.').pop()

        if (!extesion.includes(fileEx.toLocaleLowerCase())) {
            unlinkSync(`./files/${file.filename}`)
            throw new BadRequestException('Formato de arquivo inválido. Somente arquivos .csv!')
        }

        let response = null

        switch (fileEx.toLocaleLowerCase()) {
            case 'csv':
                const paymentSlipp = await this.paymentSlippService.createPaymentSlip(file.filename)
                response = {
                    paymentSlipp: paymentSlipp,
                    message: "Boletos criados com sucesso."
                };
                break;
            case 'pdf':
                const pdfString = await pdfToString(file.filename)
                console.log(pdfString);
                break;

            default:
                throw new BadRequestException('Nenhuma ação pode ser tomada, envie um boleto .csv ou .pdf')
        }

    }

    @Get()
    async findPaymentsSlip() {
        const paymentsSlip = [{
            nome: 'JOSE DA SILVA',
            unidade: 17,
            valor: 182.54,
            linha_digitavel: '123456123456123456'
        }]
        return paymentsSlip;
    }
}