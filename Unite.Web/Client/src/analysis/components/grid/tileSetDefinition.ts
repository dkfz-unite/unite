export class DimensionDefinition {
    title: string;
    values: Set<any>
}

export class TileProperty {
    key: string;
    values: Set<any>;
    colors: Array<string>;
}

export class Tile extends Array<Array<any>> {
}

export default class TileSetDefinition {
    rows: DimensionDefinition;
    columns: DimensionDefinition;
    tileProperties: Array<TileProperty>;
    tiles: Array<Tile>;
    defaultTile: Tile;
}