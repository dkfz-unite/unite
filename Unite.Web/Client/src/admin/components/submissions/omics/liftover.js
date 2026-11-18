import OmicsSubmissionType from "@/domain/submissions/models/enums/submission-type-omics";

const thresholds = {
  [OmicsSubmissionType.DNA_SM]: { success: 99, warn: 95 },
  [OmicsSubmissionType.DNA_CNV]: { success: 95, warn: 80 },
  [OmicsSubmissionType.DNA_SV]: { success: 95, warn: 80 }
};

const statusClasses = {
  success: "text-positive",
  warn: "text-orange-8",
  negative: "text-negative"
};

export function getLiftoverStats(data, type) {
  if (!Array.isArray(data?.liftover_failures))
    return null;

  const success = data.entries?.length ?? 0;
  const fail = data.liftover_failures.length;
  const total = success + fail;
  const successRate = total > 0 ? Number((success / total * 100).toFixed(1)) : 0;
  const failRate = total > 0 ? Number((fail / total * 100).toFixed(1)) : 0;
  const limits = thresholds[type];

  return {
    sourceGenome: data.tsample?.genome,
    success,
    successRate,
    fail,
    failRate,
    total,
    status: successRate >= limits.success ? "success"
      : successRate >= limits.warn ? "warn"
      : "negative"
  };
}

export function getLiftoverShortMessage(stats) {
  return stats ? `${stats.successRate}% lifted` : null;
}

export function getLiftoverEntriesMessage(stats) {
  return stats ? `${stats.success} of ${stats.total} (${stats.successRate}%) passed liftover from ${stats.sourceGenome}` : null;
}

export function getLiftoverFailuresMessage(stats) {
  return stats ? `${stats.fail} of ${stats.total} (${stats.failRate}%) failed liftover from ${stats.sourceGenome}` : null;
}

export function getLiftoverTitle(stats) {
  return stats ? `${stats.success} of ${stats.total} variants lifted; ${stats.fail} failed` : null;
}

export function getLiftoverStatusClass(stats) {
  return stats ? statusClasses[stats.status] : null;
}

export function getLiftoverReasonLabel(reason) {
  const label = reason.replaceAll("_", " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

const liftover = {
  getLiftoverStats,
  getLiftoverShortMessage,
  getLiftoverEntriesMessage,
  getLiftoverFailuresMessage,
  getLiftoverTitle,
  getLiftoverStatusClass,
  getLiftoverReasonLabel
};

export default liftover;
