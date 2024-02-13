export async function parseFile(file) {
  try {
    const json = await file.text();
    const screenings = JSON.parse(json);

    return screenings;
  } catch {
    return null;
  }
}

export default {
  parseFile
}