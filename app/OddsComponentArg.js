'use client';

import axios from 'axios';
import { addHours, format } from 'date-fns';
import React, { useState } from 'react';
import styles from './OddsComponentArg.module.css';

const OddsComponentArg = () => {
  const [odds, setOdds] = useState(null);
  const [threshold, setThreshold] = useState('');
  const [minOdds, setMinOdds] = useState('');
  const [maxOdds, setMaxOdds] = useState('');
  const [selectedBookmakers, setSelectedBookmakers] = useState([]);

  const bookmakers = [
    { key: 'pinnacle', title: 'Pinnacle' },
    { key: 'williamhill', title: 'William Hill' },
    { key: 'betfair_ex_eu', title: 'Betfair' },
    { key: 'betfair_sb_uk', title: 'Betfair Sportsbook UK' },
    { key: 'betonlineag', title: 'BetOnline.ag' },
    { key: 'sport888', title: '888sport' },
    { key: 'mrgreen', title: 'Mr Green' },
    { key: 'unibet_eu', title: 'Unibet' },
    { key: 'matchbook', title: 'Matchbook' },
    { key: 'onexbet', title: '1xBet' },
  ];

  const handleThresholdChange = (e) => {
    setThreshold(e.target.value);
  };

  const handleMinOddsChange = (e) => {
    setMinOdds(e.target.value);
  };

  const handleMaxOddsChange = (e) => {
    setMaxOdds(e.target.value);
  };

  const handleBookmakerChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setSelectedBookmakers(selectedOptions);
  };

  const handleButtonClick = async () => {
    try {
      // Make the API request to fetch the data
      const response = await axios.get(
        'https://api.the-odds-api.com/v4/sports/soccer_argentina_primera_division/odds/',
        {
          params: {
            apiKey: '2f42f78466de4f4fa0a9c6eff5ed85fa',
            bookmakers: selectedBookmakers.join(','),
            markets: 'h2h',
          },
        },
      );

      const data = response.data;

      // Extract the odds within the specified range and above the threshold
      const extractedOdds = data.flatMap((event) => {
        const pinnacleOdds = event.bookmakers.find(
          (bookmaker) => bookmaker.key === 'pinnacle',
        )?.markets[0]?.outcomes;

        // Skip the event if Pinnacle has no odds
        if (!pinnacleOdds) {
          return [];
        }

        const oddsInRange = event.bookmakers
          .filter(
            (bookmaker) => bookmaker.markets && bookmaker.markets[0]?.outcomes,
          )
          .flatMap((bookmaker) =>
            bookmaker.markets[0].outcomes
              .filter(
                (outcome) =>
                  outcome.price >= Number(minOdds) &&
                  outcome.price <= Number(maxOdds) &&
                  outcome.price -
                    (pinnacleOdds?.find((po) => po.name === outcome.name)
                      ?.price || 0) >
                    Number(threshold),
              )
              .map((outcome, index) => {
                const adjustedCommenceTime = format(
                  addHours(new Date(event.commence_time), 0),
                  'yyyy-MM-dd HH:mm:ss',
                );

                return {
                  ...outcome,
                  id: `${event.home_team}_${event.away_team}_${bookmaker.key}_${outcome.name}_${index}`,
                  event: `${event.home_team} vs ${event.away_team}`,
                  commenceTime: adjustedCommenceTime,
                  bookmaker: bookmaker.title,
                  outcome: outcome.name,
                  pinnaclePrice:
                    pinnacleOdds?.find((po) => po.name === outcome.name)
                      ?.price || '',
                };
              }),
          );

        return oddsInRange;
      });

      // Set the extracted odds in the state
      setOdds(extractedOdds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <label htmlFor="threshold" className={styles.label}>
          Minimum Difference from Pinnacle (e.g., 0.15):
        </label>
        <input
          type="number"
          id="threshold"
          value={threshold}
          onChange={handleThresholdChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputField}>
        <label htmlFor="minOdds" className={styles.label}>
          Minimum Odds:
        </label>
        <input
          type="number"
          id="minOdds"
          value={minOdds}
          onChange={handleMinOddsChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputField}>
        <label htmlFor="maxOdds" className={styles.label}>
          Maximum Odds:
        </label>
        <input
          type="number"
          id="maxOdds"
          value={maxOdds}
          onChange={handleMaxOddsChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputField}>
        <label htmlFor="bookmakers" className={styles.label}>
          Bookmakers:
        </label>
        <select
          multiple
          id="bookmakers"
          value={selectedBookmakers}
          onChange={handleBookmakerChange}
          className={styles.input}
        >
          {bookmakers.map((bookmaker) => (
            <option key={bookmaker.key} value={bookmaker.key}>
              {bookmaker.title}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleButtonClick} className={styles.button}>
        Get Argentina Football Odds
      </button>

      {odds && (
        <ul>
          {odds.map((odd) => (
            <li key={odd.id}>
              Event: {odd.event}, Commence Time: {odd.commenceTime} GMT+2,
              Bookmaker: {odd.bookmaker}, Outcome: {odd.outcome}, Price:{' '}
              {odd.price}, Pinnacle Price: {odd.pinnaclePrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OddsComponentArg;
