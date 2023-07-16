import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { csvToJson } from 'src/utils/csvTojson';
import { PaymentSlipEntity } from './paymentSlip.entity';
import {v4 as uuid} from 'uuid'

const lotes = [
    {
        id: "0101-casa",
        nome: "0017",
        ativo: true,
        criado_em: new Date(),
    },
    {
        id: "0102-casa",
        nome: "0018",
        ativo: true,
        criado_em: new Date(),
    },
    {
        id: "0103-casa",
        nome: "0019",
        ativo: true,
        criado_em: new Date(),
    },
]

@Injectable()
export class PaymentSlipService{

    constructor(){}

    async createPaymentSlip(filename: string){
        const paymentSlipJson = csvToJson(`./files/${filename}`)
        unlinkSync(`./files/${filename}`)

        const  newPaymentsSlip: PaymentSlipEntity[] = []
        const noLotes = []
        
        paymentSlipJson.forEach((element) => {
            const lote = lotes.find(item => 
                String(item.nome).replace(/^0+/, '') === element?.unidade
            )
            
            if(lote){
                const newPaymentSlip = new PaymentSlipEntity()
                
                newPaymentSlip.id = uuid()
                newPaymentSlip.nome_sacado = element.nome
                newPaymentSlip.id_lote = lote.id
                newPaymentSlip.valor = element.valor
                newPaymentSlip.linha_digitavel = element.linha_digitavel
                newPaymentSlip.ativo = element.ativo
                newPaymentSlip.criado_em = new Date().toISOString()
                
                newPaymentsSlip.push(newPaymentSlip)
            }else{
                noLotes.push(element?.unidade)

            }

        });

        return {
            newPaymentsSlip: newPaymentsSlip,
            noLotes: noLotes
        };
    }


}