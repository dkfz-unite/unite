import Analysis from "./analysis";
import AnalysisType from "./analysis-type";
import CedpAnalysis from "../cedp/analysis";
import DegAnalysis from "../deg/analysis";
import DepAnalysis from "../dep/analysis";
import DmAnalysis from "../dm/analysis";
import PcamAnalysis from "../pcam/analysis";
import SurvAnalysis from "../surv/analysis";
import UmappAnalysis from "../umapp/analysis";
import GafAnalysis from "../gaf/analysis";

export default class AnalysisFactory {
  static create(payload: any): Analysis {
    // payload.data = JSON.parse(payload.data);

    switch (payload.type) {
      case AnalysisType.CEDP: return CedpAnalysis.fromPayload(payload);
      case AnalysisType.DEG: return DegAnalysis.fromPayload(payload);
      case AnalysisType.DEP: return DepAnalysis.fromPayload(payload);
      case AnalysisType.DM: return DmAnalysis.fromPayload(payload);
      case AnalysisType.PCAM: return PcamAnalysis.fromPayload(payload);
      case AnalysisType.SURV: return SurvAnalysis.fromPayload(payload);
      case AnalysisType.UMAPP: return UmappAnalysis.fromPayload(payload);
      case AnalysisType.GAF: return GafAnalysis.fromPayload(payload);
      default: return payload;
    }
  }
}