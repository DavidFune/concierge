import { Body, Controller, Post, Get, UploadedFile, UseInterceptors, BadRequestException, } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { csvToJson } from 'src/utils/csvTojson';
import { PaymentSlipService } from './paymentSlip.service';
import { OutputPaymentSlipDTO } from './dto/OutputPaymentSlip.dto';

@Controller('/payment-slip')
export class PaymentSlipController {

    constructor(private paymentSlippService: PaymentSlipService){}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files'
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        
        const extesion = ['csv', 'pdf']
        const fileEx = file.originalname.split('.').pop()

        if(!extesion.includes(fileEx.toLocaleLowerCase())){
            unlinkSync(`./files/${file.filename}`)
            throw new BadRequestException('Formato de arquivo inválido. Somente arquivos .csv!')
        }
        
        await this.paymentSlippService.createPaymentSlip(file.filename)
        unlinkSync(`./files/${file.filename}`)

        return {
            message: "Boletos criados com sucesso."
        };
    }

    @Get()
    async findPaymentsSlip(){
        const paymentsSlip = [{
            nome: 'JOSE DA SILVA',
            unidade: 17,
            valor: 182.54,
            linha_digitavel: '123456123456123456'
        }]
        return paymentsSlip;
    }
}