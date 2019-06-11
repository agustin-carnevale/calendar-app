import React from 'react'
import styled from 'styled-components'
import CloseButton from './CloseButton'

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 1000;

  border-radius: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;

  & .modal-content {
    position: relative;
    width: 100%;
    max-width: 1200px;
    max-height: 100vh;
    background: white;
    border-radius: 7px;
    padding: 16px;

    /* if the screen gets too small to display
     the modal's contents, allow scrolling
    */
    overflow-y: auto;
  }

  & .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  @media (max-height: 800px) {
    display: block;
    padding: 0;
    & .modal-content {
      position: absolute;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      width: auto;
    }
  }
`

const ContentSection = styled.div`
  margin: 40px 20px;
  padding: 10px;
`

const ModalHeader = (props) => (
  <div className="modal-header">
    {props.onClose ? (
      <div className="modal-close">
        <CloseButton onClick={props.onClose} />
      </div>
    ) : null}
  </div>
)

const Modal = (props) => (
  <ModalContainer {...props}>
    <div className="modal-content">
      <ModalHeader {...props} />
      <ContentSection>{props.content}</ContentSection>
    </div>
  </ModalContainer>
)

export default Modal
