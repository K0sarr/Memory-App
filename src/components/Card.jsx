import React, {useEffect, useState} from "react"
import { getPokemons, GET_POKEMONS } from "../api/PokemonApi"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../styles/card.css'

export default function Card({ score, setScore, bestScore, setBestScore }) {
    const [cards, setCards] = useState([]);
    const [selectedId, setSelectedId] = useState(new Set());
    const [message, setMessage] = useState(null);
    const capitalizeName = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        // Fetch pokemons and initialize cards
        const fetchData = async () => {
          try {
            const response = await getPokemons(GET_POKEMONS);
    
            const pokemonData = response.data.results;
            const initialCards = pokemonData.map((pokemon, index) => ({
              id: index,
              name: capitalizeName(pokemon.name),
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            }));
            
            setCards(initialCards);
          } catch (error) {
            console.error("Error fetching pokemons:", error); // Log any errors
          }
        };
    
        fetchData();
      }, []);
  
      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#98d6a9',
        padding: 8,
        textAlign: 'center',
        color: 'black',
        [theme.breakpoints.down('sm')]: {
            padding: 4,
        },
        [theme.breakpoints.down('xs')]: {
          backgroundColor: '#ffffff',
          padding: 2,
        },
    }));


      function handleClick(cardId) {
        if (selectedId.has(cardId)) {
          setMessage(`Game Over! You selected the same card twice. \nScore: ${score}`);
          setTimeout(() => {
            setMessage(null);
          }, 3500);
          if (bestScore <= score) { // Update bestscore only if the score is higher than bestScore.
            setBestScore(score);
          }
          setScore(0);
          setSelectedId(new Set()); // Reset both score and users selectedIds.
        } else {
          const newSelectedId = new Set(selectedId);
          newSelectedId.add(cardId);
          setSelectedId(newSelectedId);
          const shuffledCards = [...cards.sort(() => Math.random() - 0.5)];
          setCards(shuffledCards);
          setScore(score +1);
        }
      }


    return (
      <>
        {message && <p style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>{message}</p>}
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={6} sm={6} md={3} key={card.id}>
            <Item elevation={3}>
            <button className="card_button" onClick={() => handleClick(card.id)}>
              <img src={card.image} alt={card.name} />
            </button>
              <p className="poke-text">{card.name}</p>
            </Item>
            </Grid>
        ))}
      </Grid>
      </>
    )
}