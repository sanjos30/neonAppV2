import {Location} from "./location";
import {Customer} from "./customer"
export class Order {
  constructor(
    public orderType: string,
    public location: Location,
    public address: string,
    public pickupDate:string,
    public pickupTime: string,
    public dropDate:string,
    public dropTime: string,
    public customerId : string) {}
}
