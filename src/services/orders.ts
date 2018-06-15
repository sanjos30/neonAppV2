import {Order} from "../models/order";
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
    this.orders.push(new Order(orderType, address,pickupDate,pickupTime,dropDate,dropTime,customerId,null,creationDate));
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
