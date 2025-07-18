import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";

export default class LineFiltersCriteria extends SpecimenFiltersCriteria {
  cellsSpecies = new ValuesCriteria<string>();
  cellsType = new ValuesCriteria<string>();
  cellsCultureType = new ValuesCriteria<string>();
  intervention = new ValuesCriteria<string>();
  name = new ValuesCriteria<string>();

  constructor(criteria: LineFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.cellsSpecies = new ValuesCriteria<string>(criteria.cellsSpecies);
    this.cellsType = new ValuesCriteria<string>(criteria.cellsType);
    this.cellsCultureType = new ValuesCriteria<string>(criteria.cellsCultureType);
    this.intervention = new ValuesCriteria<string>(criteria.intervention);
    this.name = new ValuesCriteria<string>(criteria.name);
  }

  sanitise() {
    super.sanitise();
  }

  clone() {
    let criteria = new LineFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}