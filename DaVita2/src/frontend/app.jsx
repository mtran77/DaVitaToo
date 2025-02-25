import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import StyledBox from './stylishBox.jsx';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <> 
      <StyledBox/>
    </>
  );
};

export default App;
