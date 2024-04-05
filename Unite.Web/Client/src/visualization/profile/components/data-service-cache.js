function shouldCache(criteria) {
  return !criteria.startChr && !criteria.start && !criteria.endChr && !criteria.end;
}

function getKey(sampleId, criteria) {
  return `SP${sampleId}-PROFILE`;
}

export function read(sampleId, criteria) {
  if (!shouldCache(criteria)) return null;
  var key = getKey(sampleId, criteria);
  var cache = localStorage.getItem(key);
  return JSON.parse(cache);
}

export function write(sampleId, criteria, data) {
  if (!shouldCache(criteria)) return;
  var key = getKey(sampleId, criteria);
  var cache = JSON.stringify(data);
  localStorage.setItem(key, cache);
}

export function clear() {
  Object.keys(localStorage)
    .filter(key => key.startsWith("SP") && key.endsWith("-PROFILE"))
    .forEach(key => localStorage.removeItem(key));
}

export default {
  read,
  write,
  clear
}
