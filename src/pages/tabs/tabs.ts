import { Component } from '@angular/core';

import {SchedulePage} from "../schedule/schedule";
import {HistoryPage} from "../history/history";
import {PricingPage} from "../pricing/pricing";
import {ProfilePage} from "../profile/profile";
import {HelpPage} from "../help/help";
import {WelcomePage} from "../welcome/welcome";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  schedulePage =  SchedulePage;
  historyPage = HistoryPage;
  pricingPage = PricingPage;
  profilePage = ProfilePage;
  helpPage = HelpPage;
  welcomePage=WelcomePage;
}
