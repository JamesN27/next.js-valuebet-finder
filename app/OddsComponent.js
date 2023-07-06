'use client';

import axios from 'axios';
import React, { useState } from 'react';

const OddsComponent = () => {
  const [odds, setOdds] = useState(null);

  const handleButtonClick = async () => {
    try {
      // Make the API request to fetch the data
      const response = await axios.get(
        'https://api.the-odds-api.com/v4/sports/tennis_atp_wimbledon/odds/',
        {
          params: {
            apiKey: '2f42f78466de4f4fa0a9c6eff5ed85fa',
            bookmakers:
              'pinnacle,williamhill,betfair_ex_eu,betfair_sb_uk,betonlineag,sport888,mrgreen,unibet_eu,matchbook,onexbet',
            markets: 'h2h',
          },
        },
      );

      const data = response.data;

      // Extract the higher odds from other bookmakers compared to Pinnacle odds
      const extractedOdds = data.flatMap((event) => {
        const pinnacleBookmaker = event.bookmakers.find(
          (bookmaker) => bookmaker.key === 'pinnacle',
        );

        if (
          !pinnacleBookmaker ||
          !pinnacleBookmaker.markets ||
          !pinnacleBookmaker.markets[0]?.outcomes
        ) {
          // Skip the event if pinnacleBookmaker or necessary properties are undefined
          return [];
        }

        const pinnacleOutcomesMap =
          pinnacleBookmaker.markets[0].outcomes.reduce((map, outcome) => {
            map[outcome.name] = outcome.price;
            return map;
          }, {});

        const higherOdds = event.bookmakers
          .filter((bookmaker) => bookmaker.key !== 'pinnacle')
          .flatMap((bookmaker) => {
            if (!bookmaker.markets || !bookmaker.markets[0]?.outcomes) {
              // Skip the bookmaker if necessary properties are undefined
              return [];
            }

            return bookmaker.markets[0].outcomes
              .filter(
                (outcome) =>
                  outcome.name in pinnacleOutcomesMap &&
                  outcome.price > pinnacleOutcomesMap[outcome.name],
              )
              .map((outcome) => ({
                event: `${event.home_team} vs ${event.away_team}`,
                bookmaker: bookmaker.title,
                outcome: outcome.name,
                price: outcome.price,
                pinnaclePrice: pinnacleOutcomesMap[outcome.name], // Include the Pinnacle odds
              }));
          });

        return higherOdds;
      });

      // Set the extracted odds in the state
      setOdds(extractedOdds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Get Odds</button>
      {odds && (
        <ul>
          {odds.map((odd, index) => (
            <li key={odd.id}>
              Event: {odd.event}, Bookmaker: {odd.bookmaker}, Outcome:{' '}
              {odd.outcome}, Price: {odd.price}, Pinnacle Price:{' '}
              {odd.pinnaclePrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OddsComponent;
