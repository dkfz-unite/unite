import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import DataFiltersCriteria from "@/domain/_shared/entries/models/filters/data-filters-criteria";

export default class SpecimenFiltersCriteria extends DataFiltersCriteria {
  id = new ValuesCriteria<number>();
  referenceId = new ValuesCriteria<string>();

  category = new ValuesCriteria<string>();
  tumorType = new ValuesCriteria<string>();
  tumorGrade = new RangeCriteria();
  tumorSuperfamily = new ValuesCriteria<string>();
  tumorFamily = new ValuesCriteria<string>();
  tumorClass = new ValuesCriteria<string>();
  tumorSubclass = new ValuesCriteria<string>();
  mgmtStatus = new BoolCriteria();
  idhStatus = new BoolCriteria();
  idhMutation = new ValuesCriteria<string>();
  tertStatus = new BoolCriteria();
  tertMutation = new ValuesCriteria<string>();
  expressionSubtype = new ValuesCriteria<string>();
  methylationSubtype = new ValuesCriteria<string>();
  gCimpMethylation = new BoolCriteria();
  geneKnockout = new ValuesCriteria<string>();
  drug = new ValuesCriteria<string>();
  dss = new RangeCriteria();
  dssSelective = new RangeCriteria();

  constructor(criteria: SpecimenFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId);

    this.category = new ValuesCriteria<string>(criteria.category);
    this.tumorType = new ValuesCriteria<string>(criteria.tumorType);
    this.tumorGrade = new RangeCriteria(criteria.tumorGrade);
    this.tumorSuperfamily = new ValuesCriteria<string>(criteria.tumorSuperfamily);
    this.tumorFamily = new ValuesCriteria<string>(criteria.tumorFamily);
    this.tumorClass = new ValuesCriteria<string>(criteria.tumorClass);
    this.tumorSubclass = new ValuesCriteria<string>(criteria.tumorSubclass);
    this.mgmtStatus = new BoolCriteria(criteria.mgmtStatus);
    this.idhStatus = new BoolCriteria(criteria.idhStatus);
    this.idhMutation = new ValuesCriteria<string>(criteria.idhMutation);
    this.tertStatus = new BoolCriteria(criteria.tertStatus);
    this.tertMutation = new ValuesCriteria<string>(criteria.tertMutation);
    this.expressionSubtype = new ValuesCriteria<string>(criteria.expressionSubtype);
    this.methylationSubtype = new ValuesCriteria<string>(criteria.methylationSubtype);
    this.gCimpMethylation = new BoolCriteria(criteria.gCimpMethylation);
    this.geneKnockout = new ValuesCriteria<string>(criteria.geneKnockout);
    this.drug = new ValuesCriteria<string>(criteria.drug);
    this.dss = new RangeCriteria(criteria.dss);
    this.dssSelective = new RangeCriteria(criteria.dssSelective);
  }

  clone() : SpecimenFiltersCriteria {
    return new SpecimenFiltersCriteria(this);
    // Object.assign(criteria, this);

    // return criteria;
  }
}