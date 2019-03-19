import { Component, OnInit } from '@angular/core';
import { CampaignService} from '../shared/campaign/campaign.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Array<any>;
  budget: number;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getAll().subscribe(data => {
      this.campaigns = data;
    });
    this.campaignService.getBudget().subscribe(budget => {
      this.budget = budget;
    })
  }

  remove(id) {
    this.campaignService.remove(id).subscribe(result => {
      console.log("Campaign deleted")
    }, error => console.error(error));
  }

}
