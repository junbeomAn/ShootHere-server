import { HttpService } from '@nestjs/axios';
import { Coords } from './entities/map.entity';
export declare class MapService {
    private httpService;
    private naverApiDomain;
    private apiKeys;
    constructor(httpService: HttpService);
    getCoords(address: string): Promise<Coords>;
    getPath(startPos: string, goalPos: string): Promise<number[]>;
}
