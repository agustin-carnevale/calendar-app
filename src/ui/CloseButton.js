import React from 'react'
import styled from 'styled-components'
import CloseIcon from 'react-material-icon-svg/dist/CloseCircle'

const Container = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid white;
  background: white;
  transition: border-color 0.2s linear, background 0.2s linear;
  transform: translate3d(0, 0, 0);
  cursor: pointer;

  &:hover {
    fill: gray;
    border: 1px solid gray;
    background: light-gray;
  }
`

const CloseIconStyled = styled(CloseIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  fill: gray;
  cursor: pointer;
  transition: fill 0.2s linear;
  transform: translate3d(-50%, -50%, 0);

 &:hover {
    fill: gray;
  }
`

const CloseButton = (props) => (
  <Container>
    <CloseIconStyled onClick={props.onClick} />
  </Container>
)

export default CloseButton
