import hangmanFramework from './hangmanframework.json';

interface IhangmanFramework {
  index: number,
  height: string,
  width: string,
  background: string,
  position?: any,
  top?: number,
  right?: number,
  marginLeft?: string
}

interface IHangmanDrawingProps {
  numberOfGuesses: number
}

const HEAD = (
  <div style={{ 
    width: '50px', 
    height: '50px', 
    borderRadius: '100%', 
    border: '10px solid black',
    position: 'absolute',
    top: '50px',
    right: '-30px'
  }}>
  </div>
)

const BODY = (
  <div style={{ 
    width: '10px', 
    height: '100px', 
    background: 'black', 
    position: 'absolute',
    top: '120px',
    right: 0
  }}>
  </div>
)

const RIGHTARM = (
  <div style={{ 
    width: '100px', 
    height: '10px', 
    background: 'black', 
    position: 'absolute',
    top: '150px',
    right: '-100px',
    transform: 'rotate(-30deg)',
    transformOrigin: 'left bottom'
  }}>
  </div>
)

const LEFTARM = (
  <div style={{ 
    width: '100px', 
    height: '10px', 
    background: 'black', 
    position: 'absolute',
    top: '150px',
    right: '10px',
    transform: 'rotate(30deg)',
    transformOrigin: 'right bottom'
  }}>
  </div>
)

const RIGHTLEG = (
  <div style={{ 
    width: '100px', 
    height: '10px', 
    background: 'black', 
    position: 'absolute',
    top: '210px',
    right: '-90px',
    transform: 'rotate(60deg)',
    transformOrigin: 'left bottom'
  }}>
  </div>
)

const LEFTTLEG = (
  <div style={{ 
    width: '100px', 
    height: '10px', 
    background: 'black', 
    position: 'absolute',
    top: '210px',
    right: 0,
    transform: 'rotate(-60deg)',
    transformOrigin: 'right bottom'
  }}>
  </div>
)

const BODY_PARTS = [HEAD, BODY, RIGHTARM, LEFTARM, RIGHTLEG, LEFTTLEG]

export function HangmanDrawing({ numberOfGuesses }: IHangmanDrawingProps) {
  return (
    <div style={{ position: 'relative' }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}

      { hangmanFramework.map(({ 
        index, 
        height, 
        width, 
        background, 
        position, 
        top, 
        right, 
        marginLeft 
      }: IhangmanFramework) => (
        <div key={index} style={{
          height,
          width,
          background,
          position,
          top,
          right,
          marginLeft
        }}/>
      ))}
    </div>
  )
}