import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [totalFat, setTotalFat] = useState('');
  const [sodium, setSodium] = useState('');
  const [sugar, setSugar] = useState('');
  const [protein, setProtein] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e, setInputFunction) => {
    setInputFunction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/', {
        totalFat,
        sodium,
        sugar,
        protein
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#00704A', // Starbucks green color
      color: 'white', // Text color
      padding: '20px' // Padding for content
    }}>
      <h1>Calories Prediction</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Total Fat:</label>
          <input type="text" value={totalFat} onChange={(e) => handleInputChange(e, setTotalFat)} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Sodium:</label>
          <input type="text" value={sodium} onChange={(e) => handleInputChange(e, setSodium)} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Sugar:</label>
          <input type="text" value={sugar} onChange={(e) => handleInputChange(e, setSugar)} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Protein:</label>
          <input type="text" value={protein} onChange={(e) => handleInputChange(e, setProtein)} style={{ marginLeft: '10px' }} />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
      </form>
      {output && <div style={{ marginTop: '20px' }}>{output}</div>}
    </div>
  );
}

export default App;
