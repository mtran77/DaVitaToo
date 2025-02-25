import React, { useEffect, useState } from 'react';
import { Text } from '@forge/react';
import { invoke } from '@forge/bridge';
//My Components
// import ChatboxForm from './chatForm.jsx'
//box styled
import StyledBox from './stylishBox.jsx';


const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <>
      <Text> 5:19 coming from app.jsx</Text>
      <Text>{data ? data : 'Loading...'}</Text>
      {/* <ChatboxForm/> */}
     
      <StyledBox/>
      
    </>
  );
};

export default App;
