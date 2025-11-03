import FeedApi, { Format } from "./api-feed";
import settings from "@/settings";
import OmicsSubmissionType from "../models/enums/submission-type-omics";
import VariantType from "@/domain/omics/variants/_shared/variants/models/enums/variant-type";

export default class OmicsFeedApi extends FeedApi {
  private readonly feedUrl: string = `${settings.urls.omics}`;
  
  protected formats: Record<string, Format>;

  public async getSubmission(id: string, type: string): Promise<any> {
    let url = null;
    
    if (type == OmicsSubmissionType.DNA)
      url = `${this.feedUrl}/dna/sample/${id}`;
    if (type == OmicsSubmissionType.DNA_SM)
      url = `${this.feedUrl}/dna/analysis/${VariantType.SM}/${id}`;
    else if (type == OmicsSubmissionType.DNA_CNV)
      url = `${this.feedUrl}/dna/analysis/${VariantType.CNV}/${id}`;
    else if (type == OmicsSubmissionType.DNA_SV)
      url = `${this.feedUrl}/dna/analysis/${VariantType.SV}/${id}`;
    else if (type == OmicsSubmissionType.METH)
      url = `${this.feedUrl}/meth/sample/${id}`;
    else if (type == OmicsSubmissionType.METH_LVL)
      url = `${this.feedUrl}/meth/analysis/levels/${id}`;
    else if (type == OmicsSubmissionType.RNA)
      url = `${this.feedUrl}/rna/sample/${id}`;
    else if (type == OmicsSubmissionType.RNA_EXP)
      url = `${this.feedUrl}/rna/analysis/exp/${id}`;
    else if (type == OmicsSubmissionType.RNASC)
      url = `${this.feedUrl}/rnasc/sample/${id}`;
    else if (type == OmicsSubmissionType.RNASC_EXP)
      url = `${this.feedUrl}/rnasc/analysis/exp/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}