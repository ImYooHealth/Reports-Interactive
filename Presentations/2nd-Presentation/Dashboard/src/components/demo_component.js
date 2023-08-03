import React, { useState } from 'react';

function MyComponent() {
  const [name, setName] = React.useState("John");
  const [age, setAge] = React.useState(25);

  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>Age: {age}</h2>
      <button onClick={() => setAge(age + 1)}>Increase Age</button>
    </div>
  );
}

export default MyComponent