import { Module } from '@nestjs/common';
import { PaymentSlipModule } from './payment-slip/paymentSlip.module';


@Module({
  imports: [PaymentSlipModule]
})
export class AppModule {}
