import { Injectable } from '@nestjs/common';
import { readFileSync, unlinkSync } from 'fs';
import { csvToJson } from 'src/utils/csvTojson';

@Injectable()
export class PaymentSlipService{

    async createPaymentSlip(filename: string){
        const fileJson = csvToJson(`./files/${filename}`)
        unlinkSync(`./files/${filename}`)

        return fileJson;
    }


}