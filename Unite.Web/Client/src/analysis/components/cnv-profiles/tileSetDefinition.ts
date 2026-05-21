export class DimensionDefinition {
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

export default class TileSetDefinition {
    rows: DimensionDefinition;
    columns: DimensionDefinition;
    tileProperties: Array<TileProperty>;
    tiles: Array<Tile>;
    defaultTile: Tile;
    columnGroups: Array<Group>;
    rowGroups: Array<Group>;
}