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

    this.cellsSpecies = new ValuesCriteria<string>(criteria.cellsSpecies?.value);
    this.cellsType = new ValuesCriteria<string>(criteria.cellsType?.value);
    this.cellsCultureType = new ValuesCriteria<string>(criteria.cellsCultureType?.value);
    this.intervention = new ValuesCriteria<string>(criteria.intervention?.value);
    this.name = new ValuesCriteria<string>(criteria.name?.value);
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