import {Order} from "../models/order";
import {Location} from "../models/location";
import {Customer} from "../models/customer";
import {Address} from "../models/address";

export class OrderService {

  private orders: Order[] = [];

  addOrder( orderType: string,
            address: Address,
            pickupDate:string,
            pickupTime: string,
            dropDate:string,
            dropTime: string,
            customerId:string,
            customer : Customer,
            creationDate:string
            ) {
    console.log("OrderService : addOrder Function : Starts");
    this.orders.push(new Order(orderType, address,pickupDate,pickupTime,dropDate,dropTime,customerId,null,creationDate));
    console.log("OrderService : addOrder Function : Ends");
  }

  getOrders() {
    return this.orders.slice();
  }

  updateOrder(index: number,
              orderType: string,
              address: Address,
              pickupDate:string,
              pickupTime: string,
              dropDate:string,
              dropTime: string,
              customerId : string,
              customer:Customer,
              creationDate:string) {
    this.orders[index] = new Order(orderType,address,pickupDate,pickupTime,dropDate,dropTime,customerId,customer,creationDate);
  }

  removeOrder(index: number) {
    this.orders.splice(index, 1);
  }
}
