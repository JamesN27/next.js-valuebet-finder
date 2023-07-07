import Link from 'next/link';
import React from 'react';
import OddsComponentArg from '../OddsComponentArg';
import OddsComponentATP from '../OddsComponentATP';
import Calculator from './calculator';

export default function ValueBets() {
  return (
    <div>
      <div>
        <h1>Value Bets Page</h1>
        <OddsComponentATP />
        <OddsComponentArg />
        <Calculator />
      </div>

      <div>
        <ul>
          <li>
            <Link href="https://www.pinnacle.com/de/">Pinnacle</Link>
          </li>
          <li>
            <Link href="https://williamhill.com/de">William Hill</Link>
          </li>
          <li>
            <Link href="https://www.betfair.com/exchange/plus/">
              Betfair Exchange
            </Link>
          </li>
          <li>
            <Link href="https://www.betfair.com/sport/">
              Betfair Sportsbook
            </Link>
          </li>
          <li>
            <Link href="https://www.betonline.ag/">BetOnline</Link>
          </li>
          <li>
            <Link href="https://www.888sport.de/">888Sport</Link>
          </li>
          <li>
            <Link href="https://www.mrgreen.com/at/">Mr. Green</Link>
          </li>
          <li>
            <Link href="https://de.unibet.com/betting/sports/home">Unibet</Link>
          </li>
          <li>
            <Link href="https://www.matchbook.com/">Matchbook</Link>
          </li>
          <li>
            <Link href="https://1xbet.com/de">1xBet</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
