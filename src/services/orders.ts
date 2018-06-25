import {Order} from "../models/order";
import {Customer} from "../models/customer";
import {Address} from "../models/address";
import {Items} from "../models/items";

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
            creationDate:string,
            itemsList:Array<Items>
            ) {
    this.orders.push(new Order(orderType, address,pickupDate,pickupTime,dropDate,dropTime,customerId,null,creationDate,itemsList));
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
              creationDate:string,
              itemsList:Array<Items>) {
    this.orders[index] = new Order(orderType,address,pickupDate,pickupTime,dropDate,dropTime,customerId,customer,creationDate,itemsList);
  }

  removeOrder(index: number) {
    this.orders.splice(index, 1);
  }
}
