import { makeAutoObservable, makeObservable, observable } from "mobx";
import { AuthCodeEntry, CreateEntryDto } from "./types";
import { generateRandom } from "~/utils";

const EXPIRE_TIME = 60;
const TIMER_INTERVAL = 1000; // 1s

class AuthCodes {
  entries: AuthCodeEntry[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public createEntry({ name }: CreateEntryDto): void {
    const newEntry: AuthCodeEntry = observable({
      id: crypto.randomUUID(),
      name: name,
      code: generateRandom(),
      icon: "",
      expireTime: EXPIRE_TIME,
      timer: setInterval(() => {
        this._decrementTime(newEntry);
      }, TIMER_INTERVAL),
    });

    this.entries.push(newEntry);
  }

  _resetTimer(authCodeEntry: AuthCodeEntry): void {
    authCodeEntry.code = generateRandom();
    authCodeEntry.expireTime = EXPIRE_TIME;
    authCodeEntry.timer = setInterval(() => {
      this._decrementTime(authCodeEntry);
    }, TIMER_INTERVAL);
  }

  _decrementTime(authCodeEntry: AuthCodeEntry): void {
    if (authCodeEntry.expireTime === 0) {
      this._resetTimer(authCodeEntry);
    } else {
      authCodeEntry.expireTime -= 1;
    }
  }
}

export const AuthCodesObservable = new AuthCodes();
