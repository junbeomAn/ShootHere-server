import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { Coords } from './entities/map.entity';

@Injectable()
export class MapService {
  private naverApiDomain = 'https://naveropenapi.apigw.ntruss.com';
  private apiKeys = {
    'X-NCP-APIGW-API-KEY-ID': process.env.API_KEY_ID,
    'X-NCP-APIGW-API-KEY': process.env.API_KEY,
  };

  constructor(private httpService: HttpService) {}

  async getCoords(address: string): Promise<Coords> {
    const geocodeUrl = `${this.naverApiDomain}/map-geocode/v2/geocode`;
    const res = await lastValueFrom(
      this.httpService.get(`${geocodeUrl}?query=${encodeURI(address)}`, {
        headers: {
          ...this.apiKeys,
        },
      }),
    );
    const target = res.data.addresses[0];
    return { x: target.x, y: target.y };
  }

  async getPath(startPos: string, goalPos: string): Promise<number[]> {
    const directionUrl = `${this.naverApiDomain}/map-direction/v1/driving`;
    const [startY, startX] = startPos.split(',');
    const [goalY, goalX] = goalPos.split(',');

    const res = await lastValueFrom(
      this.httpService.get(
        `${directionUrl}?start=${startY},${startX}&goal=${goalY},${goalX}`,
        {
          headers: {
            ...this.apiKeys,
          },
        },
      ),
    );
    const result = res.data.route.traoptimal[0];
    const path: number[] = result.path;
    return path;
  }
}
