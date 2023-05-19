import { CardType } from "../../library/Card/CardTypes";
import cardHandler from "./cardHandler";
import suitHandler from "./suitHandler";

export default function GenerateRiver(
  suits: string[],
  ranks: string[],
  dealtHand: any,
  flop: any,
  turn: any,
  river: any,
  passedRange: any,
  riverPrev: any
) {
  let originalValue = river.current.value;

  let passedRangeKeys = Object.keys(passedRange.current.value)
  let filledPassedRangeCheck = [];

  for(let i = 0; i < passedRangeKeys.length; i++) {
    passedRange.current.value[passedRangeKeys[i]].length > 0 && filledPassedRangeCheck.push(passedRangeKeys[i])
  }

  // console.log(filledPassedRangeCheck)

  riverPrev.current = river.current.value[0];

  river.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'turn');

  suitHandler([document.getElementById('community_4')], river)

  // setRiver(generatedCard);
  let counter = 0;
  while (
    JSON.stringify(river.current.value[0]) === JSON.stringify(riverPrev.current) ||
    JSON.stringify(river.current.value[0]) === JSON.stringify(flop.current.value[0]) ||
    JSON.stringify(river.current.value[0]) === JSON.stringify(flop.current.value[1]) ||
    JSON.stringify(river.current.value[0]) === JSON.stringify(flop.current.value[2]) ||
    JSON.stringify(river.current.value[0]) === JSON.stringify(dealtHand.current.value[0]) ||
    JSON.stringify(river.current.value[0]) === JSON.stringify(dealtHand.current.value[1]) ||
    JSON.stringify(river.current.value[0]) === JSON.stringify(turn.current.value[0])
  ) {
    counter++;
    if(counter === 20) {
      console.log(counter)
      river.current.value = originalValue;
      suitHandler([document.getElementById('community_4')], river)
      document.getElementById(passedRange.current.buttonId)!.setAttribute('disabled', 'true');
      document.getElementById('tooltip_river')!.style.display = 'block';
      break;
    }

    river.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'turn');

    suitHandler([document.getElementById('community_4')], river)
  }
}
