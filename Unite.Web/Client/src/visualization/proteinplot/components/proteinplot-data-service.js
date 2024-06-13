export default class ProteinPlotDataService {

    /**
     * Prepares Unite data to be displayed on lolliplot
     * @param {Object} transcript Current transcript coding the protein 
     * @param {Object} mutation Current mutation affecting transcript coded protein
     * @param {Object} data Unite data
     * @returns Data in lolliplot consumable format
     */
    prepareData(transcript, mutation, data) {
        let proteinPlotData = {};

        proteinPlotData.transcript = transcript;

        proteinPlotData.mutation = mutation;

        proteinPlotData.proteins = !data.domains?.length ? [] : data.domains
            .filter(domain => domain.start < proteinPlotData.transcript.protein.length)
            .map(domain => {
                return {
                    id: domain.id,
                    symbol: domain.symbol,
                    description: domain.description,
                    start: domain.start,
                    startOffset: 0,
                    end: domain.end > transcript.protein.length ? transcript.protein.length : domain.end,
                    endOffset: domain.end > transcript.protein.length ? domain.end - transcript.protein.length : 0
                }
            });

        proteinPlotData.mutations = !data.mutations?.length ? [] : data.mutations
            .map(mutation => {
                return {
                    id: mutation.id,
                    code: mutation.code,
                    effect: mutation.effect,
                    impact: mutation.impact,
                    proteinChange: mutation.proteinChange,
                    numberOfDonors: mutation.numberOfDonors,
                    donors: mutation.numberOfDonors,
                    x: +mutation.proteinChange.match(/\d+/)[0],
                    y: mutation.numberOfDonors,
                }
            });

        return proteinPlotData;
    }
}