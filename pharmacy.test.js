/* eslint-disable prettier/prettier */
import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  // Tests pour les médicaments normaux
  it("should decrease the benefit and expiresIn for normal drugs", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  // Tests pour Dafalgan
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

  // Tests pour Herbal Tea
  it("should increase Herbal Tea benefit", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 5)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 6)]);
  });

  it("should increase expired Herbal Tea benefit twice as fast", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", -1, 5)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -2, 7)]);
  });

  // Tests pour Magic Pill
  it("should never change Magic Pill", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 15, 40)]);
  });

  // Tests pour Fervex
  it("should increase Fervex benefit normally when expiresIn > 10", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 15, 20)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 14, 21)]);
  });

  it("should increase Fervex benefit by 2 when expiresIn <= 10", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 20)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 9, 22)]);
  });

  it("should increase Fervex benefit by 3 when expiresIn <= 5", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 20)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 23)]);
  });

  it("should drop Fervex benefit to 0 after expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 20)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  // Tests pour les limites de benefit
  it("should never increase benefit above 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 4, 50)]);
  });

  it("should never have negative benefit", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 5, 0)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 4, 0)]);
  });
});
