import { FormsModule } from '@angular/forms';
import { MbscModule, mobiscroll } from '@mobiscroll/angular-trial';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {SchedulePage} from "../pages/schedule/schedule";
import {HistoryPage} from "../pages/history/history";
import {ProfilePage} from "../pages/profile/profile";
import {PricingPage} from "../pages/pricing/pricing";
import {HelpPage} from "../pages/help/help";
import {TabsPage} from "../pages/tabs/tabs";
import {SetLocationPage} from "../pages/set-location/set-location";
import { AgmCoreModule } from "@agm/core";
import {OrderService} from "../services/orders";
import {Schedule2Page} from "../pages/schedule2/schedule2";
import {SetOrderTimePage} from "../pages/set-order-time/set-order-time";
import { DatePicker } from '@ionic-native/date-picker';
import {Geolocation} from "@ionic-native/geolocation";
import { AuthService } from "../services/auth";
import { HttpModule } from '@angular/http';
import {HelperService} from "../services/helper";
import {ViewOrderPage} from "../pages/view-order/view-order";
import {AddItemsPage} from "../pages/add-items/add-items";
import {GetStartedPage} from "../pages/get-started/get-started";
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import {OtpVerifyPage} from "../pages/otp-verify/otp-verify";


mobiscroll.apiKey = '0433483d';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SchedulePage,
    HistoryPage,
    PricingPage,
    ProfilePage,
    HelpPage,
    SetLocationPage,
    Schedule2Page,
    SetOrderTimePage,
    ViewOrderPage,
    AddItemsPage,
    GetStartedPage,
    OtpVerifyPage
  ],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrY4TNNseW0m1Lpw4h9COEx4eA2RFaZkI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SchedulePage,
    HistoryPage,
    PricingPage,
    ProfilePage,
    HelpPage,
    SetLocationPage,
    Schedule2Page,
    SetOrderTimePage,
    ViewOrderPage,
    AddItemsPage,
    GetStartedPage,
    OtpVerifyPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    OrderService,
    DatePicker,
    AuthService,
    HelperService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
