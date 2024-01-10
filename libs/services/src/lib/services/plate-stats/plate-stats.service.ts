import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_KEY } from '@ddsi-labs-apps/enums';

const BASE_URL = `${process.env[ENV_KEY.BASE_URL]}`;
const statsEndpoint = `${BASE_URL}/api/v1/stats`;

@Injectable({
  providedIn: 'root',
})
export class PlateStatsService {
  constructor(private http: HttpClient) {}

  getPlatesDashboardStats() {
    return this.http.get(`${statsEndpoint}`);
  }
}
