import React, { useState } from 'react'

export type IApp = () => React.ReactElement;

const formatInput = (value: string) => {
  if (!value) return value;

  // check if string is not number reset
  const rawValue = value.replace(/[^\d]/g, "")

  // start format with length > 3
  if (rawValue.length < 4) return rawValue

  if (rawValue.length < 7) {
    return `(${rawValue.slice(0, 3)}) ${rawValue.slice(3)}`;
  }

  return `(${rawValue.slice(0, 3)}) ${rawValue.slice(
    3,
    6
  )}-${rawValue.slice(6, 10)}`;
}

const App: IApp = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(formatInput(e.target.value))
  }

  const handleClick = () => {
    console.log(inputValue.replaceAll(/[^\d]/g, ""))
  }
  
  return (
  <div style={{ height: '100vh', display: 'grid', placeContent: 'center' }}>
    <input type="text" value={inputValue} name="pid" id="pid" onChange={handleChange} />
    <button onClick={handleClick}>submit</button>
  </div>
)}

export default App;