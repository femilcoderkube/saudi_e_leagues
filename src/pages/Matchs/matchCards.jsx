
import {
    SecondPosCard,
    ThirdPosCard,
    ForthPosCard,
    FifthPosCard,
    SecondPosCard_Opp,
    ThirdPosCard_Opp,
    ForthPosCard_Opp,
    FifthPosCard_Opp,
    FirstPosCard_gold,
    ThirdPos_Gold,
    ThirdPos_OppGold,
    FirstPosCard_Opp_gold,
  } from "../../components/ui/svg";
export function getCards(position, isOpponent = false) {
 
    // Choose card sets based on isOpponent
    const goldCards = isOpponent
      ? [FirstPosCard_Opp_gold, ThirdPos_OppGold]
      : [FirstPosCard_gold, ThirdPos_Gold];
  
    const cards = isOpponent
      ? [undefined, SecondPosCard_Opp, ThirdPosCard_Opp, ForthPosCard_Opp, FifthPosCard_Opp]
      : [undefined, SecondPosCard, ThirdPosCard, ForthPosCard, FifthPosCard];
  
    switch (position) {
      case 5:
        return [goldCards[0], cards[1], cards[2], cards[3], cards[4]];
      case 4:
        return [goldCards[0], cards[1], cards[2], cards[3]];
      case 3:
        return [goldCards[1], cards[2], cards[3]];
      case 2:
        return [goldCards[1], cards[2]];
      case 1:
        return [cards[2]];
      default:
        return [];
    }
  }
  
  