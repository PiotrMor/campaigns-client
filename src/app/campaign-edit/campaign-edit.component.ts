import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription} from 'rxjs'
import { ActivatedRoute, Router} from '@angular/router';
import { CampaignService } from '../shared/campaign/campaign.service';
import { FormControl, NgForm} from '@angular/forms';
import { map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit, OnDestroy {
  campaign: any = {};
  budget: number;
  options: Option[] = [
    {keyword: 'Sport'},
    {keyword: 'Car'},
    {keyword: 'Gym'},
    {keyword: 'Bike'},
    {keyword: 'Food'},
    {keyword: 'Pizza'},
    {keyword: 'Computer'},
    {keyword: 'Programming'}
    ];
  myControl = new FormControl();
  filteredOptions: Observable<Option[]>;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private campaignService: CampaignService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.campaignService.get(id).subscribe((campaign: any) => {
          if (campaign) {
            this.campaign = campaign;
            this.campaign.href = campaign._links.self.href;
            console.log(campaign);
          } else {
            console.log(`Campaign with id '${id}' does not exist.`);
            this.gotoList();
          }
        });
      }
    });

    this.campaignService.getBudget().subscribe(budget => {
      this.budget = budget;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Option>(''),
        map(value => typeof value === 'string' ? value : value.keyword),
        map(keyword => keyword ? this._filter(keyword) : this.options.slice())
      );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/campaign-list']);
  }

  save(form: NgForm) {
    console.log(form);
    this.campaignService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.campaignService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  displayFn(option?: Option): string | undefined {
    if (typeof option === "string"){
      return option;
    }

    return option ? option.keyword : undefined;
  }


  private _filter(keyword: string): Option[] {
    const filterValue = keyword.toLowerCase();

    return this.options.filter(option => option.keyword.toLowerCase().indexOf(filterValue) === 0);
  }

}

export interface Option {
  keyword: string;
}
