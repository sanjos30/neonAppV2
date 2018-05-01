import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PricingPage } from './pricing';

@NgModule({
  declarations: [
    PricingPage,
  ],
  imports: [
    IonicPageModule.forChild(PricingPage),
  ],
})
export class PricingPageModule {}
