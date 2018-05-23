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
    console.log ("Order is "  + this.orders[0].orderType + " - "
                              + this.orders[0].address.location.lng + " - "
                              + this.orders[0].address.location.lat + " - "
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
