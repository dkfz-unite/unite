class Filters{
    sanitiseArray(values){
        if(!values || !values.length){
            return [];
        }
        else{
            return values.map(value => value.trim());            
        }
    }

    sanitiseRange(range){
        if(!range){
            return { from: null, to: null };
        }
        else{
            var from = range.from != null && !isNaN(range.from) ? +range.from : null;
            var to = range.to != null && !isNaN(range.to) ? +range.to : null;

            return { from: from, to: to };
        }
    }
}

export default Filters;