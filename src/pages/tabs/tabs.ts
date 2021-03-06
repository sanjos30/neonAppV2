import { Component } from '@angular/core';

import {SchedulePage} from "../schedule/schedule";
import {HistoryPage} from "../history/history";
import {PricingPage} from "../pricing/pricing";
import {ProfilePage} from "../profile/profile";
import {HelpPage} from "../help/help";
import {MyDhobiPage} from "../my-dhobi/my-dhobi";
import {MyAccountPage} from "../my-account/my-account";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  myDhobiPage = MyDhobiPage;
  schedulePage =  SchedulePage;
  historyPage = HistoryPage;
  pricingPage = PricingPage;
  profilePage = ProfilePage;
  accountPage = MyAccountPage;
  helpPage = HelpPage;

}
