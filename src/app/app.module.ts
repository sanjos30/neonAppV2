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
import {WelcomePage} from "../pages/welcome/welcome";
import {Schedule3Page} from "../pages/schedule3/schedule3";
import {SetOrderTimePage} from "../pages/set-order-time/set-order-time";
import { DatePicker } from '@ionic-native/date-picker';
import {Geolocation} from "@ionic-native/geolocation";
import { AuthService } from "../services/auth";

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
    WelcomePage,
    Schedule3Page,
    SetOrderTimePage
  ],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    WelcomePage,
    Schedule3Page,
    SetOrderTimePage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    OrderService,
    DatePicker,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
