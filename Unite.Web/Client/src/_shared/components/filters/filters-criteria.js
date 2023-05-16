import DonorFiltersCriteria from "./domain/donors/donor-filters-criteria";
import TissueFiltersCriteria from "./domain/specimens/tissues/tissue-filters-criteria";
import CellFiltersCriteria from "./domain/specimens/cells/cell-filters-criteria";
import OrganoidFiltersCriteria from "./domain/specimens/organoids/organoid-filters-criteria";
import XenograftFiltersCriteria from "./domain/specimens/xenografts/xenograft-filters-criteria";
import GeneFiltersCriteria from "./domain/genome/genes/gene-filters-criteria";
import MutationFiltersCriteria from "./domain/genome/variants/ssm/ssm-filters-criteria";
import CopyNumberVariantFiltersCriteria from "./domain/genome/variants/cnv/cnv-filters-criteria";
import StructuralVariantFiltersCriteria from "./domain/genome/variants/sv/sv-filters-criteria";
import MriFiltersCriteria from "./domain/images/mris/mri-filters-criteria";
import OncogirdFiltersCriteria from "./analysis/oncogrid/oncogrid-filters-criteria";

// This class is used only inside this file, all side assignments still use object.
class Filters {
  query = null;
  from = 0;
  size = 20;

  constructor(filters = null) {
    this.query = filters?.query || null;
  }

  resetPage() {
    this.from = 0;
  }
}

export default class FiltersCriteria {
  filters = new Filters();
  donor = new DonorFiltersCriteria();
  mri = new MriFiltersCriteria();
  tissue = new TissueFiltersCriteria();
  cell = new CellFiltersCriteria();
  organoid = new OrganoidFiltersCriteria();
  xenograft = new XenograftFiltersCriteria();
  gene = new GeneFiltersCriteria();
  ssm = new MutationFiltersCriteria();
  cnv = new CopyNumberVariantFiltersCriteria();
  sv = new StructuralVariantFiltersCriteria();
  oncogrid = new OncogirdFiltersCriteria();

  get numberOfFilters() {
    let number = 0;

    number += this.filters.query != null ? 1 : 0;
    number += this.donor.numberOfFilters;
    number += this.mri.numberOfFilters;
    number += this.tissue.numberOfFilters;
    number += this.cell.numberOfFilters;
    number += this.organoid.numberOfFilters;
    number += this.xenograft.numberOfFilters;
    number += this.gene.numberOfFilters;
    number += this.ssm.numberOfFilters;
    number += this.cnv.numberOfFilters;
    number += this.sv.numberOfFilters;

    return number;
  }

  constructor(criteria = null) {
    this.filters = new Filters(criteria?.filters);
    this.donor = new DonorFiltersCriteria(criteria?.donor);
    this.mri = new MriFiltersCriteria(criteria?.mri);
    this.tissue = new TissueFiltersCriteria(criteria?.tissue);
    this.cell = new CellFiltersCriteria(criteria?.cell);
    this.organoid = new OrganoidFiltersCriteria(criteria?.organoid);
    this.xenograft = new XenograftFiltersCriteria(criteria?.xenograft);
    this.gene = new GeneFiltersCriteria(criteria?.gene);
    this.ssm = new MutationFiltersCriteria(criteria?.ssm);
    this.cnv = new CopyNumberVariantFiltersCriteria(criteria?.cnv);
    this.sv = new StructuralVariantFiltersCriteria(criteria?.sv);
    this.oncogrid = new OncogirdFiltersCriteria(criteria?.oncogrid);
  }

  sanitise() {
    this.donor?.sanitise();
    this.mri?.sanitise();
    this.tissue?.sanitise();
    this.cell?.sanitise();
    this.organoid?.sanitise();
    this.xenograft?.sanitise();
    this.gene?.sanitise();
    this.ssm?.sanitise();
    this.cnv.sanitise();
    this.sv.sanitise();
    this.oncogrid?.sanitise();
  }

  clone() {
    var criteria = new FiltersCriteria();

    criteria.filters = {
      query: this.filters.query,
      from: this.filters.from,
      size: this.filters.size
    };
    criteria.donor = this.donor?.clone();
    criteria.mri = this.mri?.clone();
    criteria.tissue = this.tissue?.clone();
    criteria.cell = this.cell?.clone();
    criteria.organoid = this.organoid?.clone();
    criteria.xenograft = this.xenograft?.clone();
    criteria.gene = this.gene?.clone();
    criteria.ssm = this.ssm?.clone();
    criteria.cnv = this.cnv.clone();
    criteria.sv = this.sv.clone();
    criteria.oncogrid = this.oncogrid?.clone();

    return criteria;
  }

  copy() {
    const criteria = {};

    for (const property in this) {
      if (Object.hasOwnProperty.call(this, property)) {
        const value = this[property];
        if (value.copy != null) {
          criteria[property] = value.copy();
        }
      }
    }

    return criteria;
  }

  clear() {
    this.filters.from = 0;
    this.filters.query = null;
    this.donor.clear();
    this.mri.clear();
    this.tissue.clear();
    this.cell.clear();
    this.organoid.clear();
    this.xenograft.clear();
    this.gene.clear();
    this.ssm.clear();
    this.cnv.clear();
    this.sv.clear();
  }

  toSearchCriteria() {
    return {
      from: this.filters.from,
      size: this.filters.size,
      term: this.filters.query,
      donor: this.donor,
      mri: this.mri,
      tissue: this.tissue,
      cell: this.cell,
      organoid: this.organoid,
      xenograft: this.xenograft,
      gene: this.gene,
      ssm: this.ssm,
      cnv: this.cnv,
      sv: this.sv,
      oncoGrid: this.oncogrid
    };
  }
}