import {Location} from "./location";
import {Customer} from "./customer"
import {Address} from "./address";
export class Order {
  constructor(
    public orderType: string,
   // public location: Location,
    public address: Address,
    public pickupDate:string,
    public pickupTime: string,
    public dropDate:string,
    public dropTime: string,
    public customerId : string) {}
}
