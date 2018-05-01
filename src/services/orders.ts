import {Order} from "../models/order";
import {Location} from "../models/location";
import {Customer} from "../models/customer";

export class OrderService {

  private orders: Order[] = [];

  addOrder( orderType: string,
            location: Location,
            address: string,
            pickupDate:string,
            pickupTime: string,
            dropDate:string,
            dropTime: string,
            customer : string) {
    console.log("OrderService : addOrder Function : Starts");
    this.orders.push(new Order(orderType, location,address,pickupDate,pickupTime,dropDate,dropTime,customer));
    console.log("OrderService : addOrder Function : Ends");
    console.log ("Order is " + this.orders.length + this.orders[0]);
  }

  getOrders() {
    return this.orders.slice();
  }

  updateOrder(index: number,
              orderType: string,
              location: Location,
              address: string,
              pickupDate:string,
              pickupTime: string,
              dropDate:string,
              dropTime: string,
              customer : string) {
    this.orders[index] = new Order(orderType,location,address,pickupDate,pickupTime,dropDate,dropTime,customer);
  }

  removeOrder(index: number) {
    this.orders.splice(index, 1);
  }
}
