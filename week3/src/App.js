import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // the date is in the format: Sat, 14 Oct 2023 12:39:52 GMT
        'Request-Date': new Date().toUTCString(),
      },
      body: JSON.stringify(formData)
    };
    console.log(formData);

    fetch('http://3.105.119.250/users', request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert('Sign Up Success');
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>User Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} alignItems={'center'}>
          <TextField 
            type="text" 
            id="name"
            name="name" 
            label="Name" 
            variant="outlined" 
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ width: '60%'}} 
          />
          <TextField 
            type="email" 
            id="email" 
            name="email"
            label="Email" 
            variant="outlined" 
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ width: '60%'}} 
          />
          <TextField 
            type="password" 
            id="password" 
            name="password"
            label="Password" 
            variant="outlined" 
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ width: '60%'}} 
          />
        </Stack>
        <Button
          variant="contained"
          type="submit"
          sx={{ 
            marginTop: 5, 
            padding: '10px 30px',
            fontSize: '18px',
          }}
        > 
          SIGN UP 
        </Button>
      </form>
    </div>
  );
}

export default App;
