/* eslint-disable prettier/prettier */
export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  static MINIMUM_BENEFIT = 0;
  static MAXIMUM_BENEFIT = 50;

  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      if (drug.name === "Magic Pill") {
        return; // Magic Pill never changes
      }

      this._updateExpiresIn(drug);
      this._updateBenefit(drug);
    });

    return this.drugs;
  }

  _updateExpiresIn(drug) {
    drug.expiresIn--;
  }

  _updateBenefit(drug) {
    switch (drug.name) {
      case "Herbal Tea":
        this._updateHerbalTeaBenefit(drug);
        break;
      case "Fervex":
        this._updateFervexBenefit(drug);
        break;
      case "Dafalgan":
        this._updateDafalganBenefit(drug);
        break;
      default:
        this._updateNormalDrugBenefit(drug);
    }
  }

  _updateHerbalTeaBenefit(drug) {
    if (drug.benefit < Pharmacy.MAXIMUM_BENEFIT) {
      drug.benefit++;
      if (drug.expiresIn < 0 && drug.benefit < Pharmacy.MAXIMUM_BENEFIT) {
        drug.benefit++;
      }
    }
  }

  _updateFervexBenefit(drug) {
    if (drug.expiresIn < 0) {
      drug.benefit = 0;
      return;
    }

    if (drug.benefit < Pharmacy.MAXIMUM_BENEFIT) {
      drug.benefit++;

      if (drug.expiresIn < 10 && drug.benefit < Pharmacy.MAXIMUM_BENEFIT) {
        drug.benefit++;
      }

      if (drug.expiresIn < 5 && drug.benefit < Pharmacy.MAXIMUM_BENEFIT) {
        drug.benefit++;
      }
    }
  }

  _updateDafalganBenefit(drug) {
    if (drug.benefit > 0) {
      drug.benefit = Math.max(
        Pharmacy.MINIMUM_BENEFIT,
        drug.benefit - (drug.expiresIn < 0 ? 4 : 2)
      );
    }
  }

  _updateNormalDrugBenefit(drug) {
    if (drug.benefit > 0) {
      drug.benefit = Math.max(
        Pharmacy.MINIMUM_BENEFIT,
        drug.benefit - (drug.expiresIn < 0 ? 2 : 1)
      );
    }
  }
}
