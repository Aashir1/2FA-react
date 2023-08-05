export interface AuthCodeEntry {
  id: string;
  name: string;
  icon: string;
  code: number;
  timer: ReturnType<typeof setInterval>;
  expireTime: number;
}

export type CreateEntryDto = {
  name: string;
};
