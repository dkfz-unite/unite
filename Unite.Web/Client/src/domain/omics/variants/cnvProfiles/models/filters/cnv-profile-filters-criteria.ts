import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";

export default class CnvProfileFiltersCriteria extends FiltersCriteriaBase {
    chromosome = new ValuesCriteria<string>();
    chromosomeArm = new ValuesCriteria<string>();
    gain = new RangeCriteria();
    loss = new RangeCriteria();
    neutral = new RangeCriteria();

    constructor(criteria: CnvProfileFiltersCriteria | null = null) {
        super(criteria);

        if (!criteria)
            return;

        this.chromosome = new ValuesCriteria<string>(criteria.chromosome);
        this.chromosomeArm = new ValuesCriteria<string>(criteria.chromosomeArm);
        this.gain = new RangeCriteria(criteria.gain);
        this.loss = new RangeCriteria(criteria.loss);
        this.neutral = new RangeCriteria(criteria.neutral);
    }

    clone() : CnvProfileFiltersCriteria {
        return new CnvProfileFiltersCriteria(this);
    }
}