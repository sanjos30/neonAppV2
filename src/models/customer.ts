import {Address} from "./address";

export class Customer {
constructor(  public name: string,
              public phone : string,
              public email : string,
              public address: Address)
    {}

}
