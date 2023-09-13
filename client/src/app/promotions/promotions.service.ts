import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Promotion } from './promotion';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Injectable()
export class PromotionsService implements OnDestroy {

  private httpClientSubscription: Subscription | null = null;

  constructor(httpClient: HttpClient) {
    this.httpClientSubscription = httpClient
        .get<Promotion[]>(`${environment.apiUrl}/promotions`)
        .subscribe(promos => this.promotions = promos);
  }

  promotions: Promotion[] = [];

  ngOnDestroy(): void {
    this.httpClientSubscription?.unsubscribe();
  }
}
