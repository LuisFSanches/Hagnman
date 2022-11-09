import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing/HagnmanDrawing";
import { HangmanWord } from "./components/HangmanWord/HagnmanWord";
import { Keyboard } from "./components/Keyboard/Keyboard";
import words from "./wordList.json";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord());

  const [guessedLetters, setGuesedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter( letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => 
    guessedLetters.includes(letter)
  )

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner ) return;
    setGuesedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== 'Enter') return;
      e.preventDefault();
      setGuesedLetters([])
      setWordToGuess(getWord());
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [])
  
  return (
    <div style={{
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      margin: '0 auto',
      alignItems: 'center',
    }}>
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Loser! - Nice try"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>

      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard 
          activeLetters={
            guessedLetters.filter(letter => 
              wordToGuess.includes(letter)
            )
          }
          inactiveLetters={
            incorrectLetters
          }
          addGuessedLetter={addGuessedLetter}
          disabled={isWinner || isLoser}
        />
      </div>
      
    </div>
  )
}

export default App
