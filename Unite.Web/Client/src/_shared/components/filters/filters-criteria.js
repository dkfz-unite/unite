import DonorFiltersCriteria from "@/domain/donors/models/filters/donor-filters-criteria";
import MrFiltersCriteria from "@/domain/images/mrs/models/filters/mr-filters-criteria";
import MaterialFiltersCriteria from "@/domain/specimens/materials/models/filters/material-filters-criteria";
import LineFiltersCriteria from "@/domain/specimens/lines/models/filters/line-filters-criteria";
import OrganoidFiltersCriteria from "@/domain/specimens/organoids/models/filters/organoid-filters-criteria";
import XenograftFiltersCriteria from "@/domain/specimens/xenografts/models/filters/xenograft-filters-criteria";
import GeneFiltersCriteria from "@/domain/omics/genes/models/filters/gene-filters-criteria";
import MutationFiltersCriteria from "@/domain/omics/variants/sms/models/filters/sm-filters-criteria";
import CopyNumberVariantFiltersCriteria from "@/domain/omics/variants/cnvs/models/filters/cnv-filters-criteria";
import StructuralVariantFiltersCriteria from "@/domain/omics/variants/svs/models/filters/sv-filters-criteria";
import OncogirdFiltersCriteria from "@/visualization/oncogrid/filters/oncogrid-filters-criteria";

export default class FiltersCriteria {
  from = 0;
  size = 20;
  query = null;
  donor = new DonorFiltersCriteria();
  mr = new MrFiltersCriteria();
  material = new MaterialFiltersCriteria();
  line = new LineFiltersCriteria();
  organoid = new OrganoidFiltersCriteria();
  xenograft = new XenograftFiltersCriteria();
  gene = new GeneFiltersCriteria();
  sm = new MutationFiltersCriteria();
  cnv = new CopyNumberVariantFiltersCriteria();
  sv = new StructuralVariantFiltersCriteria();
  oncogrid = new OncogirdFiltersCriteria();

  get numberOfFilters() {
    let number = 0;

    number += !!this.query ? 1 : 0;
    number += this.donor.numberOfFilters;
    number += this.mr.numberOfFilters;
    number += this.material.numberOfFilters;
    number += this.line.numberOfFilters;
    number += this.organoid.numberOfFilters;
    number += this.xenograft.numberOfFilters;
    number += this.gene.numberOfFilters;
    number += this.sm.numberOfFilters;
    number += this.cnv.numberOfFilters;
    number += this.sv.numberOfFilters;

    return number;
  }

  constructor(criteria = null) {
    this.from = criteria?.from || 0;
    this.size = criteria?.size || 20;
    this.query = criteria?.query || null;
    this.donor = new DonorFiltersCriteria(criteria?.donor);
    this.mr = new MrFiltersCriteria(criteria?.mr);
    this.material = new MaterialFiltersCriteria(criteria?.material);
    this.line = new LineFiltersCriteria(criteria?.line);
    this.organoid = new OrganoidFiltersCriteria(criteria?.organoid);
    this.xenograft = new XenograftFiltersCriteria(criteria?.xenograft);
    this.gene = new GeneFiltersCriteria(criteria?.gene);
    this.sm = new MutationFiltersCriteria(criteria?.sm);
    this.cnv = new CopyNumberVariantFiltersCriteria(criteria?.cnv);
    this.sv = new StructuralVariantFiltersCriteria(criteria?.sv);
    this.oncogrid = new OncogirdFiltersCriteria(criteria?.oncogrid);
  }

  sanitise() {
    this.query = this.query?.trim();
    this.donor?.sanitise();
    this.mr?.sanitise();
    this.material?.sanitise();
    this.line?.sanitise();
    this.organoid?.sanitise();
    this.xenograft?.sanitise();
    this.gene?.sanitise();
    this.sm?.sanitise();
    this.cnv.sanitise();
    this.sv.sanitise();
    this.oncogrid?.sanitise();
  }

  resetPage() {
    this.from = 0;
  }
  
  clone() {
    var criteria = new FiltersCriteria();

    criteria.from = this.from;
    criteria.size = this.size;
    criteria.query = this.query;
    criteria.donor = this.donor?.clone();
    criteria.mr = this.mr?.clone();
    criteria.material = this.material?.clone();
    criteria.line = this.line?.clone();
    criteria.organoid = this.organoid?.clone();
    criteria.xenograft = this.xenograft?.clone();
    criteria.gene = this.gene?.clone();
    criteria.sm = this.sm?.clone();
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
        if (value?.copy != null) {
          criteria[property] = value.copy();
        }
      }
    }

    return criteria;
  }

  clear() {
    this.from = 0;
    this.query = null;
    this.donor.clear();
    this.mr.clear();
    this.material.clear();
    this.line.clear();
    this.organoid.clear();
    this.xenograft.clear();
    this.gene.clear();
    this.sm.clear();
    this.cnv.clear();
    this.sv.clear();
  }

  toSearchCriteria() {
    let criteria = {};
    if (this.from != null) criteria.from = this.from;
    if (this.size != null) criteria.size = this.size;
    if (!!this.query) criteria.query = this.query;
    if (this.donor?.numberOfFilters > 0) criteria.donor = this.donor;
    if (this.mr?.numberOfFilters > 0) criteria.mr = this.mr;
    if (this.material?.numberOfFilters > 0) criteria.material = this.material;
    if (this.line?.numberOfFilters > 0) criteria.line = this.line;
    if (this.organoid?.numberOfFilters > 0) criteria.organoid = this.organoid;
    if (this.xenograft?.numberOfFilters > 0) criteria.xenograft = this.xenograft;
    if (this.gene?.numberOfFilters > 0) criteria.gene = this.gene;
    if (this.sm?.numberOfFilters > 0) criteria.sm = this.sm;
    if (this.cnv?.numberOfFilters > 0) criteria.cnv = this.cnv;
    if (this.sv?.numberOfFilters > 0) criteria.sv = this.sv;
    if (this.oncogrid?.numberOfFilters > 0) criteria.oncoGrid = this.oncogrid;
    return criteria;
  }
}