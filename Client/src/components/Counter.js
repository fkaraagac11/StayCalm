import React, { useState } from 'react';

function Count(props) {
  // "count" diyeceğimiz yeni bir state değişkeni tanımlayın
  
  return (
    <div>
      <input onChange={props.submitHandler} type="text"/>
      <p>You entered {props.pass} </p>
     
    </div>
  );
}

export default Count;