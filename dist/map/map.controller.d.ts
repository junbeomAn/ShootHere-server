import { MapService } from './map.service';
export declare class MapController {
    private readonly mapService;
    constructor(mapService: MapService);
    getCoords(query: string): Promise<import("./entities/map.entity").Coords>;
    getPath(start: string, goal: string): Promise<number[]>;
    getAddress(lat: string, lng: string): Promise<string>;
}
