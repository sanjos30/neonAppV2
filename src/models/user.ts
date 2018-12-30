import {Address} from "./address";
import {Order} from "./order";

export class User {
  constructor(
                public isUserAuthenticated:boolean = false,
                public name: string,
                public phone : string,
                public email : string,
                public address : Address,
                public orders: Order[]){}

}
