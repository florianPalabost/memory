import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'memory';
  choiceNbCardsForm: any;
  numberOfCardsChose: any;
  cards = [];
  nbClick = 0;
  nbPairs = 0;
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
    this.nbPairs = form.numberCards / 2;

    let i = 0;
    while (i < this.numberOfCardsChose / 2) {
      const newCard = {
        'id': _.random(0, 100000),
        'value': i,
        'found': false
      };
      this.cards.push(newCard);

      const newCard1 = {
        'id': _.random(0, 100000),
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

    // rotate img
    const domCard = document.querySelector('#card_' + card.id);
    domCard.setAttribute('style', ' transform: rotateY(180deg);' );

    console.debug(`card clicked : ${card.value}`);
    // TODO check card is not the same that click previously
    switch (this.seen.length) {
      case 2:
        // not the same cards
        this.seen = [];
        reverseCard(domCard);
        break;
      case 1:
        // cmp card clicked & card seen previously
        if (this.seen[0].value === card.value && this.seen[0].id !== card.id) {
          // same cards so update found of the 2 cards
          _.each(this.cards, (carte) => {
            if (carte.value === this.seen[0].value) {
              carte.found = true;
              console.log(carte);
            }
          });
          this.nbPairs--;
          console.log(this.cards);
          // empty seen cards array
          this.seen = [];
        } else {
          reverseCard(domCard);
          this.seen.push(card);
        }
        break;
      default:
        this.seen.push(card);
        reverseCard(domCard);
        break;

    }

    this.nbClick++;
  }



}

function reverseCard(domCard) {
  setTimeout(() => {
    domCard.setAttribute('style', ' transform: rotateY(0deg);' );

  }, 1000);
}
