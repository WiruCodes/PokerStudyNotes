let suits = ['club', 'diamond', 'heart', 'spade']
let ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

export default function cardHandler(passedRange: any, filledPassedRangeCheck: string[], cardType: string, ) {
  // console.log(passedRange)

  if(cardType == 'hand') {
    if(filledPassedRangeCheck.length == 0) {
      return [
        {
          suit: suits[Math.floor(Math.random() * 4)].toString(),
          rank: ranks[Math.floor(Math.random() * 13)].toString()
        },
        {
          suit: suits[Math.floor(Math.random() * 4)].toString(),
          rank: ranks[Math.floor(Math.random() * 13)].toString()
        }
      ];
    }
  
    let cardClassPick = filledPassedRangeCheck[Math.floor(Math.random() * filledPassedRangeCheck.length)].toString();
    let cardRank = passedRange.current.value[cardClassPick][Math.floor(Math.random() * passedRange.current.value[cardClassPick].length)].toString();
    
    if(cardClassPick == 'pocket') {
      let pocketSuit1 = suits[Math.floor(Math.random() * 4)].toString();
      const generateSecondSuit = () => {
        let generatedSuit2 = suits[Math.floor(Math.random() * 4)].toString()
        while(generatedSuit2 == pocketSuit1) {
          generatedSuit2 = suits[Math.floor(Math.random() * 4)].toString()
        }
        return generatedSuit2;
      }
      let pocketSuit2 = generateSecondSuit();
      

      return [
        {
          suit: pocketSuit1,
          rank: cardRank[0]
        },
        {
          suit: pocketSuit2,
          rank: cardRank[1]
        }
      ]
    }

    if(cardClassPick == 'unsuited') {
      let unsuitedSuit1 = suits[Math.floor(Math.random() * 4)].toString();
      const generateSecondSuit = () => {
        let generatedSuit2 = suits[Math.floor(Math.random() * 4)].toString()
        while(generatedSuit2 == unsuitedSuit1) {
          generatedSuit2 = suits[Math.floor(Math.random() * 4)].toString()
        }
        return generatedSuit2;
      }
      let unsuitedSuit2 = generateSecondSuit();
      

      return [
        {
          suit: unsuitedSuit1,
          rank: cardRank[0]
        },
        {
          suit: unsuitedSuit2,
          rank: cardRank[1]
        }
      ]
    }

    if(cardClassPick == 'suited') {
      let suitedSuit1 = suits[Math.floor(Math.random() * 4)].toString();
      let suitedSuit2 = suitedSuit1;
      

      return [
        {
          suit: suitedSuit1,
          rank: cardRank[0]
        },
        {
          suit: suitedSuit2,
          rank: cardRank[1]
        }
      ]
    }

  }


  function generateFlopCards(empty: Boolean, arrayCheck: String) {
    let flop1 = {
      suit: (empty == true || arrayCheck == 'suits empty') ? suits[Math.floor(Math.random() * 4)].toString() : passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
      rank: (empty == true || arrayCheck == 'ranks empty') ? ranks[Math.floor(Math.random() * 13)].toString() : passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
    }

    const generatedFlop2 = () => {
      let generatedFlop2 = {
        suit: (empty == true || arrayCheck == 'suits empty') ? suits[Math.floor(Math.random() * 4)].toString() : passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
        rank: (empty == true || arrayCheck == 'ranks empty') ? ranks[Math.floor(Math.random() * 13)].toString() : passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
      }

      while(flop1.suit == generatedFlop2.suit && flop1.rank == generatedFlop2.rank) {
        generatedFlop2 = {
          suit: (empty == true || arrayCheck == 'suits empty') ? suits[Math.floor(Math.random() * 4)].toString() : passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
          rank: (empty == true || arrayCheck == 'ranks empty') ? ranks[Math.floor(Math.random() * 13)].toString() : passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
        }
      }
      return generatedFlop2;
    }

    let flop2 = generatedFlop2();

    const generatedFlop3 = () => {
      let generatedFlop3 = {
        suit: (empty == true || arrayCheck == 'suits empty') ? suits[Math.floor(Math.random() * 4)].toString() : passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
        rank: (empty == true || arrayCheck == 'ranks empty') ? ranks[Math.floor(Math.random() * 13)].toString() : passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
      }

      while((generatedFlop3.suit == flop1.suit && generatedFlop3.rank == flop1.rank) || (generatedFlop3.suit == flop2.suit && generatedFlop3.rank == flop2.rank)) {
        generatedFlop3 = {
          suit: (empty == true || arrayCheck == 'suits empty') ? suits[Math.floor(Math.random() * 4)].toString() : passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
          rank: (empty == true || arrayCheck == 'ranks empty') ? ranks[Math.floor(Math.random() * 13)].toString() : passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
        }
      }
      return generatedFlop3;
    }

    let flop3 = generatedFlop3()
    return [flop1, flop2, flop3]
  }

  if(cardType == 'flop') {

    if(filledPassedRangeCheck.length == 0) {
      return generateFlopCards(true, '');
    }

    if(passedRange.current.value.suits.length > 0 && passedRange.current.value.ranks.length > 0) {
      return generateFlopCards(false, '');
    }
    
    if(passedRange.current.value.suits.length > 0 && passedRange.current.value.ranks.length == 0) {
      return generateFlopCards(false, 'ranks empty');
    }

    if(passedRange.current.value.suits.length == 0 && passedRange.current.value.ranks.length > 0) {
      return generateFlopCards(false, 'suits empty');
    }

  }

  if(cardType == 'turn') {

    let turn = {
      suit: '',
      rank: ''
    }

    if(filledPassedRangeCheck.length == 0) {
      turn = {
        suit: suits[Math.floor(Math.random() * 4)].toString(),
        rank: ranks[Math.floor(Math.random() * 13)].toString()
      }
    }

    if(passedRange.current.value.suits.length > 0 && passedRange.current.value.ranks.length > 0) {
      turn = {
        suit: passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
        rank: passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
      }
    }
    
    if(passedRange.current.value.suits.length > 0 && passedRange.current.value.ranks.length == 0) {
      turn = {
        suit: passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
        rank: ranks[Math.floor(Math.random() * 13)].toString()
      }
    }

    if(passedRange.current.value.suits.length == 0 && passedRange.current.value.ranks.length > 0) {
      turn = {
        suit: suits[Math.floor(Math.random() * 4)].toString(),
        rank: passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
      }
    }

    return turn;

  }

  if(cardType == 'river') {

    let river = {
      suit: '',
      rank: ''
    }

    if(filledPassedRangeCheck.length == 0) {
      river = {
        suit: suits[Math.floor(Math.random() * 4)].toString(),
        rank: ranks[Math.floor(Math.random() * 13)].toString()
      }
    }

    if(passedRange.current.value.suits.length > 0 && passedRange.current.value.ranks.length > 0) {
      river = {
        suit: passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
        rank: passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
      }
    }
    
    if(passedRange.current.value.suits.length > 0 && passedRange.current.value.ranks.length == 0) {
      river = {
        suit: passedRange.current.value.suits[Math.floor(Math.random() * passedRange.current.value.suits.length)].toString(),
        rank: ranks[Math.floor(Math.random() * 13)].toString()
      }
    }

    if(passedRange.current.value.suits.length == 0 && passedRange.current.value.ranks.length > 0) {
      river = {
        suit: suits[Math.floor(Math.random() * 4)].toString(),
        rank: passedRange.current.value.ranks[Math.floor(Math.random() * passedRange.current.value.ranks.length)].toString()
      }
    }

    return river;

  }
}