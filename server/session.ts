import { Moment } from "moment";
import moment = require("moment");
import { User } from "../src/app/model/user";

export class Session {
  static readonly VALID_MINUTES = 2;

  private validUntil?: Moment

  constructor(
    public sessionId: string,
    public user: User
  ) {
    this.validUntil = moment().add(Session.VALID_MINUTES, 'minutes');
  }

  isValid(): boolean {
    return moment().diff(this.validUntil, 'minutes') <= 0;
  }

  get expires() {
    return this.validUntil.toDate();
  }
}
