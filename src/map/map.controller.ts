import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('/api/map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('coords')
  getCoords(@Query('query') query: string) {
    return this.mapService.getCoords(query);
  }
  @Get('path')
  getPath(@Query('start') start: string, @Query('goal') goal: string) {
    return this.mapService.getPath(start, goal);
  }
  @Get('address')
  getAddress(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.mapService.getAddress(lat, lng);
  }
}
