import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {  
    return setValue('')     
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = () => {
  return -1
}

// export default { useField, useResource }