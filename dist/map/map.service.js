"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let MapService = class MapService {
    constructor(httpService) {
        this.httpService = httpService;
        this.naverApiDomain = 'https://naveropenapi.apigw.ntruss.com';
    }
    async getCoords(address) {
        const geocodeUrl = `${this.naverApiDomain}/map-geocode/v2/geocode`;
        const res = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`${geocodeUrl}?query=${encodeURI(address)}`, {
            headers: {
                'X-NCP-APIGW-API-KEY-ID': 'kznn87rxc3',
                'X-NCP-APIGW-API-KEY': 'RLdS4OGei2VMDTxwiaTlsRJklqOtVq1obmn1m3Ty',
            },
        }));
        const target = res.data.addresses[0];
        return { x: target.x, y: target.y };
    }
    async getPath(startPos, goalPos) {
        const directionUrl = `${this.naverApiDomain}/map-direction/v1/driving`;
        const [startY, startX] = startPos.split(',');
        const [goalY, goalX] = goalPos.split(',');
        const res = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`${directionUrl}?start=${startY},${startX}&goal=${goalY},${goalX}`, {
            headers: {
                'X-NCP-APIGW-API-KEY-ID': 'kznn87rxc3',
                'X-NCP-APIGW-API-KEY': 'RLdS4OGei2VMDTxwiaTlsRJklqOtVq1obmn1m3Ty',
            },
        }));
        const result = res.data.route.traoptimal[0];
        const path = result.path;
        return path;
    }
};
MapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], MapService);
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map