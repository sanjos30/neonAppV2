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
    console.log ("Order is "  + this.orders[0].orderType + " - "
                              + this.orders[0].location.lng + " - "
                              + this.orders[0].location.lat + " - "
                              + this.orders[0].address + " - "
                              + this.orders[0].pickupDate + " - "
                              + this.orders[0].pickupTime + " - "
                              + this.orders[0].dropDate + " - "
                              + this.orders[0].dropTime + " - "
                              + this.orders[0].customerId
    );
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
