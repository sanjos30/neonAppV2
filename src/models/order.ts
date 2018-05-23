import {Customer} from "./customer"
import {Address} from "./address";
export class Order {
  constructor(
    public orderType: string,
    public address: Address,
    public pickupDate:string,
    public pickupTime: string,
    public dropDate:string,
    public dropTime: string,
    public customerId : string,
    public customer : Customer,
    public creationDate:string) {}
}
