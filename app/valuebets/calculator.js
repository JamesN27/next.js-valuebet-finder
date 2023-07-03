'use client';

import React, { useState } from 'react';

const Calculator = () => {
  const [odds1, setOdds1] = useState('');
  const [odds2, setOdds2] = useState('');
  const [probability1, setProbability1] = useState('');
  const [probability2, setProbability2] = useState('');
  const [valueBetweenOdds, setValueBetweenOdds] = useState('');

  const parseOddsInput = (input) => {
    // Replace commas with dots
    const parsedInput = input.replace(',', '.');
    return parseFloat(parsedInput);
  };

  const calculateProbabilitiesAndValue = () => {
    // Convert odds to probability calculation
    const oddsDecimal1 = parseOddsInput(odds1);
    const oddsDecimal2 = parseOddsInput(odds2);

    const probabilityValue1 = (1 / oddsDecimal1) * 100;
    const probabilityValue2 = (1 / oddsDecimal2) * 100;

    // Round the probabilities to two decimal places
    const roundedProbability1 = probabilityValue1.toFixed(2);
    const roundedProbability2 = probabilityValue2.toFixed(2);

    setProbability1(roundedProbability1);
    setProbability2(roundedProbability2);

    // Calculate the expected value (EV)
    const ev =
      (parseFloat(roundedProbability2) / parseFloat(roundedProbability1) - 1) *
      100;
    const roundedEV = ev.toFixed(2) + '%';

    setValueBetweenOdds(roundedEV);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      calculateProbabilitiesAndValue();
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="odds1">My Odds:</label>
        <input
          id="odds1"
          value={odds1}
          onChange={(e) => setOdds1(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <label htmlFor="probability1">Probability:</label>
        <input id="probability1" value={probability1} readOnly />
      </div>
      <div>
        <label htmlFor="odds2">Closing Line Odds:</label>
        <input
          id="odds2"
          value={odds2}
          onChange={(e) => setOdds2(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <label htmlFor="probability2">Probability:</label>
        <input id="probability2" value={probability2} readOnly />
      </div>
      <button onClick={calculateProbabilitiesAndValue}>
        Calculate Probabilities and Value
      </button>
      <div>
        <label htmlFor="valueBetweenOdds">Value:</label>
        <input id="valueBetweenOdds" value={valueBetweenOdds} readOnly />
      </div>
    </div>
  );
};

export default Calculator;
