import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { AuthCodesObservable } from "~/store/auth-codes";
import { CreateEntryDto } from "~/store/types";
import { generateRandom } from "~/utils";

const MOCK_VALUES = Object.seal({
  random: 123456,
  icon: "mock-icon",
  id: "mock-id",
});

vi.mock("~/utils", () => ({
  generateRandom: vi.fn(() => MOCK_VALUES.random),
  getIcon: vi.fn(() => MOCK_VALUES.icon),
  generateId: vi.fn(() => MOCK_VALUES.id),
}));

vi.useFakeTimers({
  shouldClearNativeTimers: true,
  toFake: ["setInterval", "setTimeout"],
});

beforeEach(() => {
  AuthCodesObservable.entries.clear();
});

describe("AuthCodesObservable", () => {
  test("create a new auth code entry", () => {
    const mockCreateEntryDto: CreateEntryDto = { name: "Mock Entry" };
    AuthCodesObservable.createEntry(mockCreateEntryDto);

    // should have the mock entry in the entries list
    expect(AuthCodesObservable.entries.length).toBe(1);

    let mockEntry = AuthCodesObservable.entries.at(0);

    // mock entry should be retrieved
    expect(mockEntry).not.toBeUndefined();
    expect(mockEntry?.name).toBe(mockCreateEntryDto.name);
    expect(mockEntry?.code).toBe(MOCK_VALUES.random);
    expect(mockEntry?.icon).toBe(MOCK_VALUES.icon);
    expect(mockEntry?.expireTime).toBe(60);
  });

  test("decrements `expiryTime` every second", () => {
    const mockCreateEntryDto: CreateEntryDto = { name: "Mock Entry" };
    AuthCodesObservable.createEntry(mockCreateEntryDto);

    let mockEntry = AuthCodesObservable.entries.at(0)!;

    expect(mockEntry.expireTime).toBe(60);
    vi.advanceTimersByTime(1000);
    expect(mockEntry.expireTime).toBe(59);
  });

  test("resets timer after 60s and also get a new code", () => {
    const newCode = 567890;
    vi.mocked(generateRandom).mockImplementation(() => newCode);

    const mockCreateEntryDto: CreateEntryDto = { name: "Mock Entry" };
    AuthCodesObservable.createEntry(mockCreateEntryDto);

    let mockEntry = AuthCodesObservable.entries.at(0)!;

    expect(mockEntry.expireTime).toBe(60);

    vi.advanceTimersByTime(60000); // 60s

    expect(mockEntry.expireTime).toBe(60);
    expect(mockEntry.code).toBe(newCode);
  });

  afterEach(() => {});
});
