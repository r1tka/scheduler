import React, { useState, useEffect } from "react";

export default function Counter(props) {

  const [times, setTimes] = useState(props.count)
  const [color, setColor] = useState("blue")
  const [array, setArray] = useState([])

  const handleClick = () => {
    setTimes(times + 1)
  }

  useEffect(() => {
    setArray([...array, times])
    if (times > 10) {
      setColor("red")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [times])

  useEffect(() => {
    console.log('this is array', array)
  }, [array])



  return (
    <>

      <button onClick={handleClick} type="button">Click ME</button>
      <br />
      <h1 style={{ color: color }}>You clicked {times}</h1>

    </>

  )
}
