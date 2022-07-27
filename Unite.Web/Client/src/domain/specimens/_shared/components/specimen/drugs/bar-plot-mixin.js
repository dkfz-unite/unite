const mixin = {
    emits: ["click"],

    methods: {
        onClick(event) {
            const data = event.points[0].data;
            const target = event.target;
            const payload = {}
        },

        getTargetScreening(drug, screenings) {
            return screenings.find(screening => screening.drug === drug);
        }
    }
};

export default mixin;