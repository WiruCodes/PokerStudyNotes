import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { CardType } from "../../library/Card/CardTypes";
import cardHandler from "./cardHandler";
import suitHandler from "./suitHandler";

export default function GenerateFlop(
  suits: string[],
  ranks: string[],
  dealtHand: any,
  flop: any,
  turn: any,
  river: any,
  passedRange: any,
  flopPrev: any
) {
  console.log(flop.current.value)
  let originalValue = flop.current.value;

  let passedRangeKeys = Object.keys(passedRange.current.value)
  let filledPassedRangeCheck = [];

  for(let i = 0; i < passedRangeKeys.length; i++) {
    passedRange.current.value[passedRangeKeys[i]].length > 0 && filledPassedRangeCheck.push(passedRangeKeys[i])
  }

  // console.log(filledPassedRangeCheck)

  flopPrev.current = flop.current.value;
  // console.log(flopPrev.current)

  flop.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'flop');

  suitHandler([document.getElementById('community_0'), document.getElementById('community_1'), document.getElementById('community_2')], flop)

  let counter = 0;
  while (
    JSON.stringify(flop.current.value[0]) === JSON.stringify(flopPrev.current[0]) && JSON.stringify(flop.current.value[1]) === JSON.stringify(flopPrev.current[1]) && JSON.stringify(flop.current.value[2]) === JSON.stringify(flopPrev.current[2]) ||
    JSON.stringify(flop.current.value[0]) === JSON.stringify(dealtHand.current.value[0]) ||
    JSON.stringify(flop.current.value[0]) === JSON.stringify(dealtHand.current.value[1]) ||
    JSON.stringify(flop.current.value[0]) === JSON.stringify(turn.current.value[0]) ||
    JSON.stringify(flop.current.value[0]) === JSON.stringify(river.current.value[0]) ||
    JSON.stringify(flop.current.value[1]) === JSON.stringify(dealtHand.current.value[0]) ||
    JSON.stringify(flop.current.value[1]) === JSON.stringify(dealtHand.current.value[1]) ||
    JSON.stringify(flop.current.value[1]) === JSON.stringify(turn.current.value[0]) ||
    JSON.stringify(flop.current.value[1]) === JSON.stringify(river.current.value[0]) ||
    JSON.stringify(flop.current.value[2]) === JSON.stringify(dealtHand.current.value[0]) ||
    JSON.stringify(flop.current.value[2]) === JSON.stringify(dealtHand.current.value[1]) ||
    JSON.stringify(flop.current.value[2]) === JSON.stringify(turn.current.value[0]) ||
    JSON.stringify(flop.current.value[2]) === JSON.stringify(river.current.value[0])
  ) {
    counter++;
    if(counter === 20) {
      console.log(counter)
      flop.current.value = originalValue;
      suitHandler([document.getElementById('community_0'), document.getElementById('community_1'), document.getElementById('community_2')], flop)
      document.getElementById(passedRange.current.buttonId)!.setAttribute('disabled', 'true');
      document.getElementById('tooltip_flop')!.style.display = 'block';
      break;
    }

    flopPrev.current = flop.current.value;
    // console.log(dealtHandPrev.current)
    
    flop.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'flop');
    suitHandler([document.getElementById('community_0'), document.getElementById('community_1'), document.getElementById('community_2')], flop)
  }
 
}
