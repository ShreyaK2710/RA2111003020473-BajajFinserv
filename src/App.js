// src/App.js
import React, { useState, useEffect } from 'react';
import { getOperationCode, processData } from './services/api';
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Box,
} from '@mui/material';
import './App.css';

const filterOptions = ['Numbers', 'Alphabets', 'Highest Alphabet'];

function App() {
  const [operationCode, setOperationCode] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [alphabets, setAlphabets] = useState([]);
  const [inputData, setInputData] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    getOperationCode().then((response) => {
      setOperationCode(response.data.operation_code);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = inputData.split(",").map(item => item.trim());
    processData(data).then((response) => {
      setNumbers(response.data.numbers);
      setAlphabets(response.data.alphabets);
    });
  };

  const handleFilterChange = (event) => {
    setSelectedFilters(event.target.value);
  };

  const displayFilteredResults = () => {
    return (
      <Box mt={2}>
        <Typography variant="h6">Filtered Response</Typography>
        {selectedFilters.includes('Numbers') && (
          <Typography>Numbers: {numbers.join(',')}</Typography>
        )}
        {selectedFilters.includes('Alphabets') && (
          <Typography>Alphabets: {alphabets.join(',')}</Typography>
        )}
        {selectedFilters.includes('Highest Alphabet') && (
          <Typography>Highest Alphabet: {alphabets.length ? alphabets[alphabets.length - 1] : ''}</Typography>
        )}
      </Box>
    );
  };

  return (
    <Container className="App">
      <Typography variant="h4" gutterBottom>Operation Code: {operationCode}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter data (comma-separated)"
          variant="outlined"
          fullWidth
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <FormControl fullWidth margin="normal">
        <InputLabel>Multi Filter</InputLabel>
        <Select
          multiple
          value={selectedFilters}
          onChange={handleFilterChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {filterOptions.map((filter) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {displayFilteredResults()}
    </Container>
  );
}

export default App;
