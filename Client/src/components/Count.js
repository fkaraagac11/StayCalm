import React, { useState } from 'react';

function Count(props) {
  // "count" diyeceğimiz yeni bir state değişkeni tanımlayın
   const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button  onClick={() =>{
      setCount(count + 1);

      }}>
        Click me up
      </button>
      <button onClick={() => {setCount(count - 1);

      }}>
        Click me down
      </button>
    </div>
  );
}

export default Count;