import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetStartedPage } from './get-started';

@NgModule({
  declarations: [
    GetStartedPage,
  ],
  imports: [
    IonicPageModule.forChild(GetStartedPage),
  ],
})
export class GetStartedPageModule {}
