import { makeAutoObservable, observable } from "mobx";
import { generateRandom, getIcon } from "~/utils";
import { AuthCodeEntry, CreateEntryDto } from "./types";
import { generateId } from "~/utils";

const EXPIRE_TIME = 60;
const TIMER_INTERVAL = 1000; // 1s

class AuthCodes {
  entries = observable.array<AuthCodeEntry>([]);

  constructor() {
    makeAutoObservable(this);
  }

  public createEntry({ name }: CreateEntryDto): void {
    const newEntry: AuthCodeEntry = observable({
      id: generateId(),
      name: name,
      code: generateRandom(),
      icon: getIcon(),
      expireTime: EXPIRE_TIME,
      timer: setInterval(() => {
        this._decrementTime(newEntry);
      }, TIMER_INTERVAL),
    });

    this.entries.push(newEntry);
  }

  _resetTimer(authCodeEntry: AuthCodeEntry): void {
    clearInterval(authCodeEntry.timer);
    authCodeEntry.code = generateRandom();
    authCodeEntry.expireTime = EXPIRE_TIME;
    authCodeEntry.timer = setInterval(() => {
      this._decrementTime(authCodeEntry);
    }, TIMER_INTERVAL);
  }

  _decrementTime(authCodeEntry: AuthCodeEntry): void {
    if (authCodeEntry.expireTime === 1) {
      this._resetTimer(authCodeEntry);
    } else {
      authCodeEntry.expireTime -= 1;
    }
  }

  public moveItem(fromIndex:number, toIndex:number):void {
    const [movedItem] = this.entries.splice(fromIndex, 1);
    this.entries.splice(toIndex, 0, movedItem);
  };
}

export const AuthCodesObservable = new AuthCodes();
