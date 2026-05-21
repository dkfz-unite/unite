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

export default class TileSetDefinition {
    dimensions: Set<DimensionDefinition>;
    points: Array<Array<number>>;
    axes: AxesDefinition;
    events: Array<EventDefinition>;
    defaultEvents: number[];
    xGroups: Array<GroupDefinition>;
    yGroups: Array<GroupDefinition>;
}

/*export class DimensionDefinition {
    title: string;
    values: Set<any>
}

export class TileProperty {
    key: string;
    values: Set<any>;
}

export class Tile extends Array<Array<any>> {

}

export class Group {
    title: string;
    indices: Set<number>;
}

export class TileSetDefinition {
    rows: DimensionDefinition;
    columns: DimensionDefinition;
    tileProperties: Array<TileProperty>;
    tiles: Array<Tile>;
    defaultTile: Tile;
    columnGroups: Array<Group>;
    rowGroups: Array<Group>;
}*/