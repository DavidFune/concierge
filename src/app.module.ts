import { Module } from '@nestjs/common';
import { PaymentSlipModule } from './payment-slip/paymentSlip.module';
import { LoteModule } from './lote/lote.module';


@Module({
  imports: [PaymentSlipModule, LoteModule]
})
export class AppModule {}
