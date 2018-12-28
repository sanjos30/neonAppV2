import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDhobiPage } from './my-dhobi';
import {ExpandableComponent} from "../../components/expandable/expandable";

@NgModule({
  declarations: [
    MyDhobiPage,
    ExpandableComponent
  ],
  imports: [
    IonicPageModule.forChild(MyDhobiPage),
  ],
})
export class MyDhobiPageModule {}
