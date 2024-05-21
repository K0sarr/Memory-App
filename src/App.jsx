import React, {useState} from 'react'
import Card from './components/Card'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/header';


function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
     <CssBaseline />
      <Header score={score} bestScore={bestScore} />
      <Container>
        <Box sx={{ m: 2 }}>
          <Card  score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} />
        </Box>
      </Container>
    </>
  )
}

export default App
