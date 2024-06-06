"use client";
import { useState } from 'react';
import axios from 'axios';

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');

  const calculateBmi = async () => {
    try {
      const response = await axios.post('http://localhost:5000/bmi_cal', {
        height,
        weight,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log(data, "data");
      setBmi(data.bmi);
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bmi_cal');
      const data = response.data;
      console.log(data, "data");
    } catch (error) {
      console.error('Error getting data:', error);
    }
  }

  return (
    <div>
      <h1>BMI Calculator</h1>
      <div>
        <label>Height (in cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label>Weight (in kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button className='bg-red-500 rounded-lg p-4' onClick={calculateBmi}>Calculate BMI</button>
      {bmi && <p>Your BMI is: {bmi}</p>}
    </div>
  );
}
