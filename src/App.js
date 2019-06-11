import React from 'react';
import styled from 'styled-components'
import Calendar from './components/Calendar'

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  margin-bottom: 15px;
}
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
`

const App = () =>{
  return (
    <AppContainer>
      <AppHeader>
        ** Calendar App **
      </AppHeader>
      <Page>
        <Calendar />
      </Page>
    </AppContainer>
  );
}

export default App
