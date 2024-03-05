export async function parseFile(file) {
  try {
    const content = await file.text();
    const json = `[${content}]`;
    const screenings = JSON.parse(json);

    for(var i = 0; i < screenings.length; i++) {
      screenings[i].Concentration = JSON.parse(`[${screenings[i].Concnetration}]`);
      screenings[i].Inhibition = JSON.parse(`[${screenings[i].Inhibition}]`);
      screenings[i].Dose = JSON.parse(`[${screenings[i].Dose}]`);
      screenings[i].Response = JSON.parse(`[${screenings[i].Response}]`);
      screenings[i].MinConcentration = Math.min(...screenings[i].Concentration);
      screenings[i].MaxConcentration = Math.max(...screenings[i].Concentration);
      delete(screenings[i].Concnetration);
    }

    return screenings;
  } catch {
    return null;
  }
}

export default {
  parseFile
}
