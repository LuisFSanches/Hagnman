import KEYS from './keys.json';
import styles from './keyboard.module.css';

interface IKeyboardProps {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled: boolean
}

export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter, disabled }: IKeyboardProps) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
      gap: '.5rem'
    }}>
      {
        KEYS.map((key, index) => {
          const isActive = activeLetters.includes(key);
          const isInactive = inactiveLetters.includes(key);
          return (
            <button
              disabled={isInactive || isActive || disabled}
              onClick={() => addGuessedLetter(key)} 
              className={`${styles.btn} ${isActive && styles.active} ${isInactive && styles.inactive} `} 
              key={index}
              >
                {key}
            </button>
          )
        })
      }
    </div>
  )
}