import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  public API = '//localhost:8080';
  public CAMPAIGN_API = this.API + '/campaigns';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.CAMPAIGN_API)
  }

  getBudget(): Observable<any> {
    return this.http.get(this.CAMPAIGN_API + '/budget');
  }

  get(id: string) {
    return this.http.get(this.CAMPAIGN_API + '/' + id);
  }

  save(campaign: any): Observable<any> {
    let result: Observable<Object>;

    if (campaign['href']) {
      console.log(campaign);
      result = this.http.put(campaign.href, campaign);
    } else {
      result = this.http.post(this.CAMPAIGN_API, campaign);
    }
    return result;
  }


  remove(href: string) {
    return this.http.delete(href);
  }
}
