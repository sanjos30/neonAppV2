import {Location} from "./location";

export class Address {
  constructor(  public street: string,
                public city : string,
                public postCode : string,
                public location: Location){}

}
