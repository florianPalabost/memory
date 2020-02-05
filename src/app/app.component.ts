import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mini-Memory';
  choiceNbCardsForm: any;
  numberOfCardsChosen: any;
  cards = [];
  nbClick = 0;
  nbPairs = 0;
  seen = [];
  typeCards = ['C', 'D', 'H', 'S'];

  constructor(private fb: FormBuilder) {
    this.choiceNbCardsForm = this.fb.group({
      numberCards: ['']
    });
  }

  onSubmit(form: any) {
    this.nbClick = 0;
    this.cards = [];
    this.numberOfCardsChosen = form.numberCards;
    this.nbPairs = form.numberCards / 2;
    let i = 1;
    while (i <= this.numberOfCardsChosen / 2) {
      const type = this.typeCards[Math.floor(Math.random() * this.typeCards.length)];
      let newCard = createCard(i, type);
      // todo avoid to have the same cards create

      if (_.where(this.cards, {
        'value': i % 12 + 1,
        'type': type
      }).length > 0 ) {
        newCard = createCard(i, type);
      }
      this.cards.push(newCard);
      const newCard1 = createCard(i, type);
      this.cards.push(newCard1);
      i++;
    }
    // random order of the cards
    this.cards = _.shuffle(this.cards);

  }

  /**
   * handle check cards values on click
   * @param card
   */
  clickCard(card) {
    // rotate img
    const domCard = document.querySelector('#card_' + card.id);
    domCard.setAttribute('style', ' transform: rotateY(180deg);' );

    switch (this.seen.length) {
      case 2:
        // not the same cards
        this.seen = [];
        reverseCard(domCard);
        break;
      case 1:
        // cmp card clicked & card seen previously need to have same value & type but not same id
        if (this.seen[0].value === card.value && this.seen[0].id !== card.id && this.seen[0].type === card.type) {
          // same cards so update found of the 2 cards
          _.each(this.cards, (carte) => {
            if (carte.value === this.seen[0].value && carte.type === this.seen[0].type) {
              carte.found = true;
            }
          });
          this.nbPairs--;
          // empty seen cards array
          this.seen = [];
        } else {
          reverseCard(domCard);
          this.seen.push(card);
        }
        break;
      case 0:
        this.seen.push(card);
        reverseCard(domCard);
        break;
      default:
        this.seen.push(card);
        reverseCard(domCard);
        break;

    }

    this.nbClick++;
  }



}

/**
 * apply rotation style to the card pass in param
 * @param domCard
 */
function reverseCard(domCard) {
  setTimeout(() => {
    domCard.setAttribute('style', ' transform: rotateY(0deg);' );

  }, 1000);
}

/**
 * return a new card to add to the cards list
 */
function createCard(i, type) {
  return {
    'id': _.random(0, 100000),
    'value': i % 12 + 1,
    'found': false,
    'type': type
  };
}
