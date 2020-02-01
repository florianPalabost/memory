import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import * as _ from 'underscore';

// todo move it

_.mixin({
  merge : function() {
    return _.reduce(arguments, function(list, obj) {
      return _.extend(list, obj);
    }, {});
  }
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'memory';
  choiceNbCardsForm: any;
  numberOfCardsChose: any;
  // cards = [{
  //   'value': 1,
  //   'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 2,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 3,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 1,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 2,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 3,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 4,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 5,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 4,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   {
  //     'value': 5,
  //     'img' : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
  //   },
  //   ];
  cards = [];
  nbClick = 0;
  seen = [];

  constructor(private fb: FormBuilder) {
    this.choiceNbCardsForm = this.fb.group({
      numberCards: ['']
    });
  }
  ngOnInit(): void {

  }

  onSubmit(form: any) {
    this.nbClick = 0;
    this.cards = [];
    this.numberOfCardsChose = form.numberCards;

    let i = 0;
    while (i < this.numberOfCardsChose / 2) {
      const newCard = {
        'id': _.random(0, 100),
        'value': i,
        'found': false
      };
      this.cards.push(newCard);

      const newCard1 = {
        'id': _.random(0, 100),
        'value': i,
        'found': false
      };
      this.cards.push(newCard1);
      i++;
    }
    console.log(this.cards);
    // random order of the cards
    this.cards = _.shuffle(this.cards);

  }

  clickCard(card) {
    console.debug(`card clicked : ${card.value}`);
    // TODO check card is not the same that click previously
    switch (this.seen.length) {
      case 2:
        // not the same cards
        this.seen = [];
        break;
      case 1:
        // cmp card clicked & card seen previously
        if (this.seen[0].value === card.value && this.seen[0].id !== card.id) {
          // same cards so update found of the 2 cards
          const cardsToUpdate = _.where(this.cards, [card, this.seen[0]]);
          _.each(cardsToUpdate, (carte) => {
            carte.found = true;
          });
          this.cards = _.merge(this.cards, cardsToUpdate);
          console.log('oui');
          console.log(this.cards);
          // empty seen cards array
          this.seen = [];
        } else {
          this.seen.push(card);
        }
        break;
      default:
        this.seen.push(card);
        break;

    }

    this.nbClick++;
  }


}
