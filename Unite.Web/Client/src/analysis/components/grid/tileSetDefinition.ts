export class DimensionDefinition {
    title: string;
    values: Set<any>
}

export class TileProperty {
    key: string;
    values: Set<any>;
    colors: Array<string>;
}

export type TilePosition = [number, number];

export namespace TilePosition {
    export const getColumn = (pos: TilePosition) => pos[0];
    export const getRow    = (pos: TilePosition) => pos[1];
}

export type PropertyValue = [number, any];

export namespace PropertyValue {
    export const getIndex = (propertyValue: PropertyValue) => propertyValue[0];
    export const getValue = (propertyValue: PropertyValue) => propertyValue[1];
}

export type Tile = [TilePosition, ...PropertyValue[]];

export namespace Tile {
    export const create = (position: TilePosition, ...propertyValues: PropertyValue[]): Tile =>
        [position, ...propertyValues];

    export const getPosition = (tile: Tile): TilePosition =>
        tile[0];

    export const forEachEvent = (tile: Tile, callback: (event: PropertyValue, index: number) => void) => {
        if (tile.length > 1) {
            for (let i = 1; i < tile.length; i++) {
                callback(tile[i] as PropertyValue, i);
            }
        }
    };

    export const getFirstPropertyValue = (tile: Tile): PropertyValue => {
        if(tile.length > 1) {
            return tile[1];
        }
        return null;
    }
}

export default class TileSetDefinition {
    rows: DimensionDefinition;
    columns: DimensionDefinition;
    tileProperties: Array<TileProperty>;
    tiles: Array<Tile>;
    defaultTile: Tile;
}