import React from 'react';
import styled from 'styled-components'

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}
`

function App() {
  return (
    <AppContainer>
      <AppHeader>
       ** Calendar App **
      </AppHeader>
      <Page>
       CALENDAR []
      </Page>
    </AppContainer>
  );
}


export default App;
