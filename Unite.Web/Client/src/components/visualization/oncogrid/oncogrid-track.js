class OncoGridTrack {
    /**
     * Track group key and name
     */
    group = null;

    /**
     * Track key and name
     */
    name = null;

    /**
     * Track field key
     */
    fieldName = null;

    /**
     * Track type key (used to recognize track field by sorting, fill or opacity function)
     */
    type = null;

    /**
     * Track data storing function
     * @returns False by default
     */
    sort = () => false;

    /**
     * 
     * @param {String} group Track group key and name
     * @param {String} name Track key and name
     * @param {String} fieldName Track field key
     * @param {String} type Track type key (used to recognize track field by sorting, fill or opacity function)
     * @param {Function} sort Track data storing function
     */
    constructor(group = null, name = null, fieldName = null, type = null, sort = () => false) {
        this.group = group;
        this.name = name;
        this.fieldName = fieldName;
        this.type = type;
        this.sort = sort;
    }
}

export default OncoGridTrack;