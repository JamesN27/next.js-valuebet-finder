import Link from 'next/link';
import React from 'react';
import OddsComponentArg from '../OddsComponentArg';
import OddsComponentATP from '../OddsComponentATP';
import OddsComponentWTA from '../OddsComponentWTA';
import Calculator from './calculator';
import styles from './page.module.css';

export default function ValueBets() {
  return (
    <div>
      <h1 className={styles.title}>
        {' '}
        Value Bet Filters for Tennis and Football
      </h1>
      <div>
        <div className={styles.container}>
          <OddsComponentATP />
          <OddsComponentWTA />
          <OddsComponentArg />
          <Calculator />
        </div>
      </div>

      <div className={styles.links}>
        <ul>
          <li>
            <Link href="https://www.pinnacle.com/de/" className={styles.link}>
              Pinnacle
            </Link>
          </li>
          <li>
            <Link href="https://williamhill.com/de" className={styles.link}>
              William Hill
            </Link>
          </li>
          <li>
            <Link
              href="https://www.betfair.com/exchange/plus/"
              className={styles.link}
            >
              Betfair Exchange
            </Link>
          </li>
          <li>
            <Link href="https://www.betfair.com/sport/" className={styles.link}>
              Betfair Sportsbook
            </Link>
          </li>
          <li>
            <Link href="https://www.betonline.ag/" className={styles.link}>
              BetOnline
            </Link>
          </li>
          <li>
            <Link href="https://www.888sport.de/" className={styles.link}>
              888Sport
            </Link>
          </li>
          <li>
            <Link href="https://www.mrgreen.com/at/" className={styles.link}>
              Mr. Green
            </Link>
          </li>
          <li>
            <Link
              href="https://de.unibet.com/betting/sports/home"
              className={styles.link}
            >
              Unibet
            </Link>
          </li>
          <li>
            <Link href="https://www.matchbook.com/" className={styles.link}>
              Matchbook
            </Link>
          </li>
          <li>
            <Link href="https://1xbet.com/de" className={styles.link}>
              1xBet
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
