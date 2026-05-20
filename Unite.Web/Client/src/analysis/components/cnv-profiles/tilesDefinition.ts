export class DimensionDefinition {
    key: string;
    values: Array<any>;
}

export class AxesDefinition {
    x: string;
    y: string;
}

export class EventDefinition {
    dimension: string;
    colors: string[];
}

export class GroupDefinition {
    title: string;
    values: Array<number>;
}

export default class TilesDefinition {
    dimensions: Set<DimensionDefinition>;
    points: Array<Array<number>>;
    axes: AxesDefinition;
    events: Array<EventDefinition>;
    defaultEvents: number[];
    xGroups: Array<GroupDefinition>;
    yGroups: Array<GroupDefinition>;
}