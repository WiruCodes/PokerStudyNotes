import { CardType } from "../../library/Card/CardTypes";
import cardHandler from "./cardHandler";
import suitHandler from "./suitHandler";

export default function GenerateTurn(
  suits: string[],
  ranks: string[],
  dealtHand: any,
  flop: any,
  turn: any,
  river: any,
  passedRange: any,
  turnPrev: any
) {
  let originalValue = turn.current.value;

  let passedRangeKeys = Object.keys(passedRange.current.value)
  let filledPassedRangeCheck = [];

  for(let i = 0; i < passedRangeKeys.length; i++) {
    passedRange.current.value[passedRangeKeys[i]].length > 0 && filledPassedRangeCheck.push(passedRangeKeys[i])
  }

  // console.log(filledPassedRangeCheck)

  turnPrev.current = turn.current.value[0];

  turn.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'turn');

  suitHandler([document.getElementById('community_3')], turn)

  let counter = 0;
  while (
    JSON.stringify(turn.current.value[0]) === JSON.stringify(turnPrev.current) ||
    JSON.stringify(turn.current.value[0]) === JSON.stringify(flop.current.value[0]) ||
    JSON.stringify(turn.current.value[0]) === JSON.stringify(flop.current.value[1]) ||
    JSON.stringify(turn.current.value[0]) === JSON.stringify(flop.current.value[2]) ||
    JSON.stringify(turn.current.value[0]) === JSON.stringify(dealtHand.current.value[0]) ||
    JSON.stringify(turn.current.value[0]) === JSON.stringify(dealtHand.current.value[1]) ||
    JSON.stringify(turn.current.value[0]) === JSON.stringify(river.current.value[0])
  ) {
    counter++;
    if(counter === 20) {
      console.log(counter)
      turn.current.value = originalValue;
      suitHandler([document.getElementById('community_3')], turn)
      document.getElementById(passedRange.current.buttonId)!.setAttribute('disabled', 'true');
      document.getElementById('tooltip_turn')!.style.display = 'block';
      break;
    }
 
    turn.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'turn');

    suitHandler([document.getElementById('community_3')], turn)
  }
}
