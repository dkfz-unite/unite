export default class TumorType {
    static values = {
        "Primary": "Primary",
        "Metastasis": "Metastasis",
        "Recurrent": "Recurrent"
    };

    static Primary = this.values["Primary"];
    static Metastasis = this.values["Metastasis"];
    static Recurrent = this.values["Recurrent"];
}
