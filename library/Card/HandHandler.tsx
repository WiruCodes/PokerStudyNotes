import { CardType } from "../../library/Card/CardTypes";
import cardHandler from "./cardHandler";
import suitHandler from "./suitHandler";
import { useRef } from "react";

export default function GenerateHand(
  dealtHand: any,
  flop: any,
  turn: any,
  river: any,
  passedRange: any,
  dealtHandPrev: any
  ) {

  let passedRangeKeys = Object.keys(passedRange.current.value)
  let filledPassedRangeCheck = [];
  
  for(let i = 0; i < passedRangeKeys.length; i++) {
    passedRange.current.value[passedRangeKeys[i]].length > 0 && filledPassedRangeCheck.push(passedRangeKeys[i])
  }
  
  dealtHandPrev.current = dealtHand.current.value;
  // console.log(dealtHandPrev.current)

  dealtHand.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'hand');

  suitHandler([document.getElementById('hand1'), document.getElementById('hand2')], dealtHand)
  // console.log(dealtHand.current.value)
  console.log(flop.current.value)
  while (
    JSON.stringify(dealtHand.current.value[0]) === JSON.stringify(dealtHandPrev.current[0]) && JSON.stringify(dealtHand.current.value[1]) === JSON.stringify(dealtHandPrev.current[1]) ||
    JSON.stringify(dealtHand.current.value[0]) === JSON.stringify(flop.current.value[0]) ||
    JSON.stringify(dealtHand.current.value[0]) === JSON.stringify(flop.current.value[1]) ||
    JSON.stringify(dealtHand.current.value[0]) === JSON.stringify(flop.current.value[2]) ||
    JSON.stringify(dealtHand.current.value[0]) === JSON.stringify(turn.current.value[0]) ||
    JSON.stringify(dealtHand.current.value[0]) === JSON.stringify(river.current.value[0]) ||
    JSON.stringify(dealtHand.current.value[1]) === JSON.stringify(flop.current.value[0]) ||
    JSON.stringify(dealtHand.current.value[1]) === JSON.stringify(flop.current.value[1]) ||
    JSON.stringify(dealtHand.current.value[1]) === JSON.stringify(flop.current.value[2]) ||
    JSON.stringify(dealtHand.current.value[1]) === JSON.stringify(turn.current.value[0]) ||
    JSON.stringify(dealtHand.current.value[1]) === JSON.stringify(river.current.value[0])
  ) {

    dealtHandPrev.current = dealtHand.current.value;
    // console.log(dealtHandPrev.current)
    
    dealtHand.current.value = cardHandler(passedRange, filledPassedRangeCheck, 'hand');
    suitHandler([document.getElementById('hand1'), document.getElementById('hand2')], dealtHand)


    // console.log(dealtHand.current.value)
  }
}
