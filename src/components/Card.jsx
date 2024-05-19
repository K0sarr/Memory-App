import React, {useEffect, useState} from "react"
import { getPokemons, GET_POKEMONS } from "../api/PokemonApi"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../styles/card.css'

export default function Card() {
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [selectedId, setSelectedId] = useState(new Set());
    


    useEffect(() => {
        // Log to check initial state
        console.log("Initial cards state:", cards);
    
        // Fetch pokemons and initialize cards
        const fetchData = async () => {
          try {
            const response = await getPokemons(GET_POKEMONS);
            console.log("API response:", response); // Log the API response
    
            const pokemonData = response.data.results;
            const initialCards = pokemonData.map((pokemon, index) => ({
              id: index,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            }));
            
            setCards(initialCards);
            console.log("Updated cards state:", initialCards); // Log the updated state
          } catch (error) {
            console.error("Error fetching pokemons:", error); // Log any errors
          }
        };
    
        fetchData();
      }, []);
  
      const Item = styled(Paper)(() => ({
        backgroundColor: '#98d6a9',
        padding: 8,
        textAlign: 'center',
        color: 'black',
      }));


      function handleClick(cardId) {
        if (selectedId.has(cardId)) {
          alert('Game Over! You selected the same card twice.');
          setScore(0);
          setSelectedId(new Set()); // Reset both score and users selectedIds.
          console.log('true')
        } else {
          const newSelectedId = new Set(selectedId);
          newSelectedId.add(cardId);
          setSelectedId(newSelectedId);
          const shuffledCards = [...cards.sort(() => Math.random() - 0.5)];
          setCards(shuffledCards);
          setScore(score +1);
          console.log('else')

        }

      }


    return (
      <>
        <p>Score: {score}</p>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={3} key={card.id}>
            <Item elevation={3}>
            <button className="card_button" onClick={() => handleClick(card.id)}>
              <img src={card.image} alt={card.name} />
            </button>
              <p>{card.name}</p>
            </Item>
            </Grid>
        ))}
      </Grid>
            </>
    )
}