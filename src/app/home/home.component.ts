import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    // this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish()
      .subscribe((dishFromService) => this.dish = dishFromService);
    // this.promotion = this.promotionservice.getFeaturedPromotion();
    this.promotionservice.getFeaturedPromotion()
      .subscribe((promotionFromService) => this.promotion = promotionFromService);
    // this.leader = this.leaderService.getFeaturedLeader();
    this.leaderService.getFeaturedLeader()
      .subscribe((leaderFromService) => this.leader = leaderFromService);
  }

  

}
