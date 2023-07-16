import { Module } from '@nestjs/common';
import { PaymentSlipController } from './paymentSlip.controller';
import { PaymentSlipService } from './paymentSlip.service';

@Module({
  imports: [],
  controllers: [PaymentSlipController],
  providers: [PaymentSlipService],
})
export class PaymentSlipModule {}
