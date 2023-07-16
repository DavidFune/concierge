import { Module } from '@nestjs/common';
import { PaymentSlipController } from './paymentSlip.controller';


@Module({
  imports: [],
  controllers: [PaymentSlipController],
  providers: [],
})
export class PaymentSlipModule {}
