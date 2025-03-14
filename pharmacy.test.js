/* eslint-disable prettier/prettier */
import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("should decrease Dafalgan benefit twice as fast", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 2, 10)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 1, 8)]);
  });

  it("should decrease expired Dafalgan benefit four times as fast", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", -1, 10)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -2, 6)]);
  });
});
