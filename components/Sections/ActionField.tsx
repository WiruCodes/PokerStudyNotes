import { Box, Button, Editable, EditableInput, EditablePreview, EditableTextarea, GridItem, Input, Textarea } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { useEffect, useRef, useReducer, ReactEventHandler, useState } from 'react';
import RangeModal from "../card_range_modal/RangeModal";
import { AiFillEdit } from "react-icons/ai";


function ActionField() {

  let actionHolder = useRef<any | null>({
    value: {
      blinds: '',
      preflop: [],
      flop: [],
      turn: [],
      river: []
    }
  })

  interface actionObject {
    title: string,
    detail: string,
    betSize: string,
    betPercent: string,
    totalPot: string,
    range: any
  }

  let range = useRef<any | null>({
    pocket: [],
    suited: [],
    unsuited: [],
    value: {
      pocket: [],
      suited: [],
      unsuited: [],
    },
    modalText: ['', '']
  });
  
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [tabFlopDisabled, setTabFlopDisabled] = useState(true);
  const [tabTurnDisabled, setTabTurnDisabled] = useState(true);
  const [tabRiverDisabled, setTabRiverDisabled] = useState(true);
  
  function addAction(street: string) {
    setTimeout(() => {
      actionHolder.current.value[street].length > 1 && (actionHolder.current.value[street][actionHolder.current.value[street].length - 1].totalPot = actionHolder.current.value[street][actionHolder.current.value[street].length - 2].totalPot)
      actionHolder.current.value.blinds && ((document.getElementById('blinds_input') as HTMLInputElement).value = actionHolder.current.value.blinds)

      let actionArray=['preflop', 'flop', 'turn', 'river'];

      actionArray.forEach((action) => {

        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[0].value = actionHolder.current.value[action][i].title;
          document.getElementById(`accordion-panel-${action}_${i + 1}`)!.getElementsByTagName('textarea')[0].value = actionHolder.current.value[action][i].detail;
  
          actionHolder.current.value[action][i].betSize == 0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[1].value = '' : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[1].value = actionHolder.current.value[action][i].betSize;
          document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[2].value = actionHolder.current.value[action][i].betPercent;
          Number(actionHolder.current.value[action][i].totalPot) == 0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '' : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = actionHolder.current.value[action][i].totalPot;
          console.log(actionHolder.current.value[action][i].totalPot)
          for(let j = 0; j <= i; j++) {
            if(j == 0) {
              document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
              actionHolder.current.value[action][j].betPercent == 0  && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
              !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            } else {
              document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
              actionHolder.current.value[action][j].betPercent == 0 && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
              !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            }
          }
  
        }

        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
          console.log(blinds)
          let totalPot: any
          action == 'preflop' && document.getElementById('accordion_preflop')!.childNodes.length > 1 && (totalPot = blinds);
          action == 'flop' && document.getElementById('accordion_flop')!.childNodes.length > 1 && (totalPot = Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot));
          action == 'turn' && document.getElementById('accordion_turn')!.childNodes.length > 1 && (totalPot = Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot));
          action == 'river' && document.getElementById('accordion_river')!.childNodes.length > 1 && (totalPot = Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot));
          for(let j = 0; j <= i; j++) {
            totalPot += Number(actionHolder.current.value[action][j].betSize)
          }
          
          totalPot >= 0 ? actionHolder.current.value[action][i].totalPot = `${totalPot.toFixed(2)}` : actionHolder.current.value[action][i].totalPot = `0`
          totalPot >=0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = totalPot.toFixed(2).toString() : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '0'
        }

        
      });
      console.log(actionHolder.current.value)
    }, 100)
    forceUpdate()
    const action: actionObject = {
      title: '',
      detail: '',
      betSize: '',
      betPercent: '',
      totalPot: '0',
      range: {
        current: {
          pocket: [],
          suited: [],
          unsuited: [],
          value: {
            pocket: [],
            suited: [],
            unsuited: [],
          },
          modalText: ['', '']
        }
      }
    }

    street == 'preflop' && actionHolder.current.value.preflop.push(action)
    street == 'flop' && actionHolder.current.value.flop.push(action)
    street == 'turn' && actionHolder.current.value.turn.push(action)
    street == 'river' && actionHolder.current.value.river.push(action)

    actionHolder.current.value.preflop.length > 0 && (setTabFlopDisabled(false))
    actionHolder.current.value.flop.length > 0 && (setTabTurnDisabled(false))
    actionHolder.current.value.turn.length > 0 && (setTabRiverDisabled(false))
    // console.log(actionHolder.current.value.preflop)
    
    // document.getElementById('accordion_river')!.childNodes.length > 1 && ((document.getElementById('tab_flop') as any).disabled = false)
  }
  
  function inputOnChangeHandler(street: string, index: string) {

    let titleValue = `${document.getElementById(`accordion-button-${street}_${index + 1}`)?.getElementsByTagName('input')[0].value}`;
    // if(street == 'preflop') {
      // action title
      actionHolder.current.value[street][index].title = titleValue
     
      // modal and range title
      actionHolder.current.value[street][index].range.current.modalText[0] = `${titleValue} Range`;
      actionHolder.current.value[street][index].range.current.modalText[1] = `${titleValue} Range`;
      titleValue ? document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('button')[0].textContent = `${titleValue} Range` : document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('button')[0].textContent = `Action ${index + 1} Range`

    // }

    // console.log(actionHolder.current.value.preflop) 

  }

  function textareaOnChangeHandler(street: string, index: string) {

    let textareaValue = `${document.getElementById(`accordion-panel-${street}_${index + 1}`)?.getElementsByTagName('textarea')[0].value}`;
    // if(street == 'preflop') {
      console.log(textareaValue)
      actionHolder.current.value[street][index].detail = textareaValue;
    // }

    // console.log(actionHolder.current.value.preflop) 

  }

  function removeAction(street: string, index: string, e:any) {
    let actionArray=['preflop', 'flop', 'turn', 'river'];
    setTimeout(() => {
      
      

      console.log(actionHolder.current.value[street])
      if(document.getElementById('accordion_preflop')!.childNodes.length == 1) return;
      actionHolder.current.value[street].length > 1 && (actionHolder.current.value[street][actionHolder.current.value[street].length - 1].totalPot = actionHolder.current.value[street][actionHolder.current.value[street].length - 2].totalPot)
      actionHolder.current.value.blinds && ((document.getElementById('blinds_input') as HTMLInputElement).value = actionHolder.current.value.blinds)


      actionArray.forEach((action) => {
        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[0].value = actionHolder.current.value[action][i].title;
          document.getElementById(`accordion-panel-${action}_${i + 1}`)!.getElementsByTagName('textarea')[0].value = actionHolder.current.value[action][i].detail;
  
          actionHolder.current.value[action][i].betSize == 0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[1].value = '' : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[1].value = actionHolder.current.value[action][i].betSize;
          document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[2].value = actionHolder.current.value[action][i].betPercent;
          Number(actionHolder.current.value[action][i].totalPot) == 0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '' : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = actionHolder.current.value[action][i].totalPot;
          console.log(actionHolder.current.value[action][i].totalPot)
          for(let j = 0; j <= i; j++) {
            if(j == 0) {
              document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
              actionHolder.current.value[action][j].betPercent == 0  && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
              !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            } else {
              document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
              actionHolder.current.value[action][j].betPercent == 0 && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
              !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            }
          }
        }
        
        
        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
          console.log(blinds)
          let totalPot: any
          action == 'preflop' && document.getElementById('accordion_preflop')!.childNodes.length > 1 && (totalPot = blinds);
          action == 'flop' && document.getElementById('accordion_flop')!.childNodes.length > 1 && (totalPot = Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot));
          action == 'turn' && document.getElementById('accordion_turn')!.childNodes.length > 1 && (totalPot = Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot));
          action == 'river' && document.getElementById('accordion_river')!.childNodes.length > 1 && (totalPot = Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot));
          for(let j = 0; j <= i; j++) {
            totalPot += Number(actionHolder.current.value[action][j].betSize)
          }
          
          totalPot >= 0 ? actionHolder.current.value[action][i].totalPot = `${totalPot.toFixed(2)}` : actionHolder.current.value[action][i].totalPot = `0`
          totalPot >=0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = totalPot.toFixed(2).toString() : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '0'
        }
      })
      betSizeInputHandler(street, index, 0)
    }, 100)
    forceUpdate()
    console.log(e.target.closest('.chakra-accordion__item'))
    e.target.closest('.chakra-accordion__item').remove()

    street == 'preflop' && actionHolder.current.value.preflop.splice(index, 1);
    street == 'flop' && actionHolder.current.value.flop.splice(index, 1);
    street == 'turn' && actionHolder.current.value.turn.splice(index, 1);
    street == 'river' && actionHolder.current.value.river.splice(index, 1);

    if(actionHolder.current.value.preflop.length == 0) {
      setTabFlopDisabled(true)
      setTabTurnDisabled(true)
      setTabRiverDisabled(true)

      
      actionHolder.current.value.blinds = 0;
      actionHolder.current.value.preflop = [];
      actionHolder.current.value.flop = [];
      actionHolder.current.value.turn = [];
      actionHolder.current.value.river = [];

      for(let i = 1; i < actionArray.length; i++) {
        while(document.getElementById(`accordion_${actionArray[i]}`)!.childNodes.length > 1) {
          document.getElementById(`accordion_${actionArray[i]}`)!.removeChild((document.getElementById(`accordion_${actionArray[i]}`) as any).firstChild)
        }
      }
    }
    if(actionHolder.current.value.flop.length == 0) {
      setTabTurnDisabled(true)
      setTabRiverDisabled(true)

      actionHolder.current.value.turn = [];
      actionHolder.current.value.river = [];

      for(let i = 2; i < actionArray.length; i++) {
        while(document.getElementById(`accordion_${actionArray[i]}`)!.childNodes.length > 1) {
          document.getElementById(`accordion_${actionArray[i]}`)!.removeChild((document.getElementById(`accordion_${actionArray[i]}`) as any).firstChild)
        }
      }
    }
    if(actionHolder.current.value.turn.length == 0) {
      setTabRiverDisabled(true)
      actionHolder.current.value.river = [];

      while(document.getElementById(`accordion_river`)!.childNodes.length > 1) {
        document.getElementById(`accordion_river`)!.removeChild((document.getElementById(`accordion_river`) as any).firstChild)
      }
    }

  }

  function blindsInputHandler(street: string, e: any) {
    let blinds = Number(e.target.value)
    actionHolder.current.value.blinds = blinds;

    let actionArray=['preflop', 'flop', 'turn', 'river'];

    actionArray.forEach((action) => {
      for(let i = 0; i < actionHolder.current.value[action].length; i++) {  
        let totalPot: any = blinds
        for(let j = 0; j <= i; j++) {
          totalPot += Number(actionHolder.current.value[action][j].betSize)
          if(j == 0) {
            actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / blinds) * 100).toFixed(2)
            document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
            actionHolder.current.value[action][j].betSize == ''  && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (actionHolder.current.value[action][j].betPercent = `0`)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (actionHolder.current.value[action][j].betSize = 0)
          } else {
            actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / Number(actionHolder.current.value[action][j-1].totalPot)) * 100).toFixed(2)
            document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
            actionHolder.current.value[action][j].betSize == '' && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (actionHolder.current.value[action][j].betPercent = `0`)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (actionHolder.current.value[action][j].betSize = 0)
          }
        }
      }
      for(let i = 0; i < actionHolder.current.value[action].length; i++) {
        let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
        console.log(blinds)
        let totalPot: any
        action == 'preflop' && (totalPot = blinds);
        action == 'flop' && (totalPot = Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot));
        action == 'turn' && (totalPot = Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot));
        action == 'river' && (totalPot = Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot));
        for(let j = 0; j <= i; j++) {
          totalPot += Number(actionHolder.current.value[action][j].betSize)
        }
        
        totalPot >= 0 ? actionHolder.current.value[action][i].totalPot = `${totalPot.toFixed(2)}` : actionHolder.current.value[action][i].totalPot = `0`
        totalPot >=0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = totalPot.toFixed(2).toString() : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '0'
      }
    })
  }
  
  function betSizeInputHandler(street: string, index: string, e: any) {
    if(e !== 0) {
      actionHolder.current.value[street][index].betSize = e.target.value
    }

    let actionArray=['preflop', 'flop', 'turn', 'river'];

    actionArray.forEach((action) => {
      for(let i = 0; i < actionHolder.current.value[action].length; i++) {
        let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
        // console.log(e.target.value)
        let totalPot: any = blinds
        for(let j = 0; j <= i; j++) {
          totalPot += Number(actionHolder.current.value[action][j].betSize)
  
          if(j == 0) {
            // make check for finding nearest behind with childNide
            action == 'preflop' && document.getElementById('accordion_preflop')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / blinds) * 100).toFixed(2));
            action == 'flop' && document.getElementById('accordion_flop')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot)) * 100).toFixed(2));
            action == 'turn' && document.getElementById('accordion_turn')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot)) * 100).toFixed(2));
            action == 'river' && document.getElementById('accordion_river')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot)) * 100).toFixed(2));


            document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
            actionHolder.current.value[action][j].betSize == '' && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (actionHolder.current.value[action][j].betSize = 0)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (actionHolder.current.value[action][j].betPercent = `0`)
          } else {
            actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / Number(actionHolder.current.value[action][j-1].totalPot)) * 100).toFixed(2)
            document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[action][j].betPercent}%`
            actionHolder.current.value[action][j].betSize == '' && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[2].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (actionHolder.current.value[action][j].betSize = 0)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (actionHolder.current.value[action][j].betPercent = `0`)
            // console.log(actionHolder.current.value.preflop[j].betPercent)
  
          }
  
        }
        
        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
          console.log(blinds)
          let totalPot: any
          action == 'preflop' && (totalPot = blinds);
          action == 'flop' && (totalPot = Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot));
          action == 'turn' && (totalPot = Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot));
          action == 'river' && (totalPot = Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot));
          for(let j = 0; j <= i; j++) {
            totalPot += Number(actionHolder.current.value[action][j].betSize)
          }
          
          totalPot >= 0 ? actionHolder.current.value[action][i].totalPot = `${totalPot.toFixed(2)}` : actionHolder.current.value[action][i].totalPot = `0`
          totalPot >=0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = totalPot.toFixed(2).toString() : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '0'
        }
      }

    })
  }

  function betPercentInputHandler(street: string, index: string, e: any) {

    actionHolder.current.value[street][index].betPercent = e.target.value.replace('%', '')
    console.log(document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value == '')
    console.log(actionHolder.current.value[street][index].betPercent)
    document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value = ''
    document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value = `${actionHolder.current.value[street][index].betPercent}%`

    document.getElementById(`accordion-button-${street}_${1}`)!.getElementsByTagName('input')[1].value = (Number((document.getElementById('blinds_input') as HTMLInputElement).value) * (actionHolder.current.value[street][0].betPercent / 100)).toString()


    let actionArray=['preflop', 'flop', 'turn', 'river'];

    actionArray.forEach((action) => {
      for(let i = 0; i < actionHolder.current.value[action].length; i++) {
        let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
        console.log(blinds)
        let totalPot: any = blinds

        for(let j = 0; j <= i; j++) {
          console.log(totalPot)
          if(j == 0) {

            action == 'preflop' && document.getElementById('accordion_preflop')!.childNodes.length > 1 && actionHolder.current.value.blinds !== 0 ? (actionHolder.current.value[action][j].betSize = +(blinds * (Number(actionHolder.current.value[action][j].betPercent) / 100)).toFixed(2)) : actionHolder.current.value[action][j].betSize = actionHolder.current.value[action][j].betSize
            action == 'flop' && document.getElementById('accordion_flop')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betSize = +(Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot) * (Number(actionHolder.current.value[action][j].betPercent) / 100)).toFixed(2));
            action == 'turn' && document.getElementById('accordion_turn')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betSize = +(Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot) * (Number(actionHolder.current.value[action][j].betPercent) / 100)).toFixed(2));
            action == 'river' && document.getElementById('accordion_river')!.childNodes.length > 1 && (actionHolder.current.value[action][j].betSize = +(Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot) * (Number(actionHolder.current.value[action][j].betPercent) / 100)).toFixed(2));

            document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[1].value = `${actionHolder.current.value[action][j].betSize}`
            actionHolder.current.value[action][j].betPercent == '' && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[1].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[1].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (actionHolder.current.value[action][j].betPercent = `0`)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (actionHolder.current.value[action][j].betSize = 0)
          } else {
            actionHolder.current.value[action][j].betSize = +(Number(actionHolder.current.value[action][j-1].totalPot) * (Number(actionHolder.current.value[action][j].betPercent) / 100)).toFixed(2)
            // actionHolder.current.value[action][j].betPercent = +((Number(actionHolder.current.value[action][j].betSize) / Number(actionHolder.current.value[action][j-1].totalPot)) * 100).toFixed(2)
            document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[1].value = `${actionHolder.current.value[action][j].betSize}`
            actionHolder.current.value[action][j].betPercent == '' && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[1].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (document.getElementById(`accordion-button-${action}_${j + 1}`)!.getElementsByTagName('input')[1].value = ``)
            !isFinite(Number(actionHolder.current.value[action][j].betPercent)) && (actionHolder.current.value[action][j].betPercent = `0`)
            !isFinite(Number(actionHolder.current.value[action][j].betSize)) && (actionHolder.current.value[action][j].betSize = 0)
            // console.log(actionHolder.current.value.preflop[j].betPercent)
            
          }
          
          totalPot += Number(actionHolder.current.value[action][j].betSize)
        }
        
        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
          console.log(blinds)
          let totalPot: any
          action == 'preflop' && (totalPot = blinds);
          action == 'flop' && (totalPot = Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot));
          action == 'turn' && (totalPot = Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot));
          action == 'river' && (totalPot = Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot));
          for(let j = 0; j <= i; j++) {
            totalPot += Number(actionHolder.current.value[action][j].betSize)
          }
          
          totalPot >= 0 ? actionHolder.current.value[action][i].totalPot = `${totalPot.toFixed(2)}` : actionHolder.current.value[action][i].totalPot = `0`
          totalPot >=0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = totalPot.toFixed(2).toString() : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '0'
        }
        
      }
    })

    console.log(actionHolder.current.value.preflop)
  }

  function betPercentBackspaceHandler(street: string, index: string, e: any) {
    let onlyNumbers = /^[0-9]*\.?[0-9]*$/;;

    let percentInput = document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value

    if(e.key == 'Backspace') {
      document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value = percentInput.substring(0, percentInput.length -1)
      percentInput.length == 2 && (document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value = '')
      
      actionHolder.current.value[street][index].betPercent = 0;
      actionHolder.current.value[street][index].betSize = 0;
      console.log(actionHolder.current.value[street])
      document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[1].value = ''
      
      
      let actionArray=['preflop', 'flop', 'turn', 'river'];

      actionArray.forEach((action) => {

        for(let i = 0; i < actionHolder.current.value[action].length; i++) {
          let blinds = Number((document.getElementById('blinds_input') as HTMLInputElement).value)
          console.log(blinds)
          let totalPot: any
          action == 'preflop' && (totalPot = blinds);
          action == 'flop' && (totalPot = Number(actionHolder.current.value['preflop'][actionHolder.current.value['preflop'].length - 1].totalPot));
          action == 'turn' && (totalPot = Number(actionHolder.current.value['flop'][actionHolder.current.value['flop'].length - 1].totalPot));
          action == 'river' && (totalPot = Number(actionHolder.current.value['turn'][actionHolder.current.value['turn'].length - 1].totalPot));
          for(let j = 0; j <= i; j++) {
            totalPot += Number(actionHolder.current.value[action][j].betSize)
          }
          
          totalPot >= 0 ? actionHolder.current.value[action][i].totalPot = `${totalPot.toFixed(2)}` : actionHolder.current.value[action][i].totalPot = `0`
          totalPot >=0 ? document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = totalPot.toFixed(2).toString() : document.getElementById(`accordion-button-${action}_${i + 1}`)!.getElementsByTagName('input')[3].value = '0'
        }
      })

    } 
    else if(!onlyNumbers.test(e.key) || (e.key == '.' && document.getElementById(`accordion-button-${street}_${index + 1}`)!.getElementsByTagName('input')[2].value.split('.').length == 2)) {
    e.preventDefault()
    }
  }

  function AccordionComponent({ currentStreet } : any) {
    return <Accordion id={`accordion_${currentStreet}`} >
      {actionHolder.current.value[currentStreet].map((action: any, i: string) => {
        action.range.current.modalText[0] = (action.title ? `${action.title} Range` : `Action ${i + 1} Range`)
        action.range.current.modalText[1] = (action.title ? `${action.title} Range` : `Action ${i + 1} Range`)
        return <AccordionItem key={`accordion_component_${i}`} id={`${currentStreet}_${i + 1}`} >
          {(i == '0' && currentStreet == 'preflop') && <Input onWheel={(e) => e.currentTarget.blur()} id='blinds_input' type='number' onChange={(e) =>blindsInputHandler(currentStreet, e)} mt='10px' flex='1' textAlign='center' placeholder='blinds + ante' />}
          <Box w='100%'>
            <AccordionButton>
              <Input placeholder={action.title ? 'loading...' : `Action ${i + 1} Title`} onChange={() => inputOnChangeHandler(currentStreet, i)} maxLength={21}  color='white'  width='fit-content' />
              <Box ml='14px' w='175px' display='flex' justifyContent='left'>
                <RangeModal {...action.range} />
              </Box>
              <Input onKeyDown={(e) => e.key == 'e' && e.preventDefault() } onWheel={(e) => e.currentTarget.blur()} type='number' onChange={(e) =>betSizeInputHandler(currentStreet, i, e)} flex='1' textAlign='center'  placeholder='bet size' />
              <Input onKeyDown={(e) => betPercentBackspaceHandler(currentStreet, i, e)} onChange={(e) =>betPercentInputHandler(currentStreet, i, e)} flex='1' textAlign='center'  placeholder='bet percentage' />
              <Input flex='1' textAlign='center' placeholder='total pot' disabled color='white' borderColor='var(--chakra-colors-whiteAlpha-400)' opacity='1!important' />
              <Box flex='1' textAlign='right'>
                <Button onClick={(e) => removeAction(currentStreet, i, e)} mr='25px'  backgroundColor='red.700' textAlign='center' size='sm'>Remove</Button>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Box>
          <AccordionPanel pb={4}>
            <Textarea  minH='150px' resize='none' onChange={() => textareaOnChangeHandler(currentStreet, i)} placeholder="Action detail here."></Textarea>
          </AccordionPanel>
        </AccordionItem>
      })}
        <AccordionItem backgroundColor='gray.500' _hover={{ backgroundColor: 'gray.400'}} >
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='center' onClick={() => addAction(currentStreet)}>
                Add Action
              </Box>
            </AccordionButton>
          </h2>
        </AccordionItem>
    </Accordion>
  }


  return <GridItem colSpan={2} rowSpan={2} border="solid 1px" minH="150px" h='fit-content' maxH='500px' borderRadius="2px" overflowX='auto'>
    <Tabs isFitted  variant='unstyled'>
      <TabList mb='1em' borderBottom='1px'>
        <Tab _selected={{ color: 'white', bg: 'green.400' }} borderRight='1px'>Preflop</Tab>
        <Tab isDisabled={tabFlopDisabled}_selected={{ color: 'white', bg: 'green.400' }} borderRight='1px'>Flop</Tab>
        <Tab isDisabled={tabTurnDisabled}_selected={{ color: 'white', bg: 'green.400' }} borderRight='1px'>Turn</Tab>
        <Tab isDisabled={tabRiverDisabled}_selected={{ color: 'white', bg: 'green.400' }}>River</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AccordionComponent currentStreet={'preflop'} />
        </TabPanel>
        <TabPanel>
          <AccordionComponent currentStreet={'flop'} />
        </TabPanel>
        <TabPanel>
          <AccordionComponent currentStreet={'turn'} />
        </TabPanel>
        <TabPanel>
          <AccordionComponent currentStreet={'river'} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </GridItem>

}

export default ActionField;