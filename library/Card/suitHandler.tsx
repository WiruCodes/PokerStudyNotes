import {BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill, BsSuitHeartFill} from 'react-icons/bs';

let gradients: {[key: string]: string} = {
  club: "radial-gradient(circle, hsla(105, 71%, 44%, 1) 0%, hsla(109, 70%, 36%, 1) 100%)",
  diamond: "radial-gradient(circle, hsla(240, 69%, 33%, 1) 0%, hsla(217, 82%, 57%, 1) 100%)",
  heart: "radial-gradient(circle, hsla(0, 82%, 39%, 1) 0%, hsla(0, 100%, 55%, 1) 100%)",
  spade: "radial-gradient(circle, hsla(0, 0%, 0%, 1) 0%, hsla(0, 2%, 23%, 1) 100%)"
}

function getSVGPath(suit: string) {
  let path = ''
  suit == 'club' && (path = BsSuitClubFill({}).props.children[0].props.d)
  suit == 'spade' && (path = BsSuitSpadeFill({}).props.children[0].props.d)
  suit == 'diamond' && (path = BsSuitDiamondFill({}).props.children[0].props.d)
  suit == 'heart' && (path = BsSuitHeartFill({}).props.children[0].props.d)

  return path;
}

export default function suitHandler(card: (HTMLElement | null)[], cardValue: any) {

  if(cardValue.current.value.length == null) {
    cardValue.current.value = [cardValue.current.value]
  }

  for(let i = 0; i < cardValue.current.value.length; i++) {

    let chosenGradient = gradients[cardValue.current.value[i].suit]
    let svgPath = getSVGPath(cardValue.current.value[i].suit); 
    
    // document.getElementById('community_0')
    card[i]!.getElementsByClassName('suit')[0].firstElementChild?.remove()
    // console.log(cardValue)
    const svg = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" color="white" class="card_responsiveIcons__Lcq0b" style="color:white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath}"></path></svg>`
    
    card[i]!.getElementsByClassName('suit')[0].innerHTML = svg
    card[i]!.getElementsByClassName('rank')[0]!.textContent = cardValue.current.value[i].rank
    card[i]!.style.background = chosenGradient
    card[i]!.getElementsByClassName('suit')[0]!.setAttribute('data-id', cardValue.current.value[i].suit)
  }


}