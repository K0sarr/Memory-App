import React from 'react'
import Card from './components/Card'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


function App() {

  return (
    <>
     <CssBaseline />
      <Container>
        <Box sx={{ m: 2 }}>
          <Card />
        </Box>
      </Container>
    </>
  )
}

export default App
