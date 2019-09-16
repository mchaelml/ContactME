import React from "react";
import styled from "styled-components";
import Avatar from "react-avatar";
import { MdClose } from "react-icons/md";
import NewPersonForm from "./NewPersonForm";

const Modal = styled.div`
  z-index: 1300;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Body = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  touch-action: none;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  z-index: -1;
  position: fixed;
`;

const Headline = styled.div`
  background-color: #ecebeb;
  padding: 10px;
  border-bottom: 1px solid #e2dede;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: ${props => (props.center ? "center" : "")};
`;

const Bottom = styled.div`
  background-color: #ecebeb;
  padding: 10px;
  border-top: 1px solid #e2dede;
  display: flex;
  justify-content: space-between;
`;

const ModalBody = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => (props.width ? props.width : "400px")};
  position: absolute;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background-color: white;

  @media (max-width: 400px) {
    width: 350px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2dede;
`;

const PersonName = styled.div`
  font-weight: bold;
`;

const PersonPhoneNumber = styled.div`
  color: #0bc50b;
`;

const Details = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-around;
  flex-direction: column;
`;

const Left = styled.div`
  text-align: right;
  width: 30%;
`;
const Right = styled.div`
  width: 70%;
  padding-left: 10px;
`;

const Title = styled.div`
  padding-bottom: 10px;
`;

const Value = styled.div`
  padding-bottom: 10px;
  color: #afadad;
  overflow: auto;
`;

const BackButton = styled.button`
  height: 40px;
  width: 100px;
  background-color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  height: 40px;
  width: 100px;
  background-color: #fb2133;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const CloseButton = styled(MdClose)`
  font-size: 20px;
  color: #7b7977;
  cursor: pointer;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
`;

class ContactModal extends React.Component {
  state = {
    modal: false
  };
  deletePerson = () => this.props.deletePerson(this.props.person.ID);

  openModal = () => {
    this.setState({
      modal: true
    });
  };

  closeDeleteModal = () => {
    this.setState({
      modal: false
    });
  };

  render() {
    const { closeModal, person, addNewPerson } = this.props;
    console.log(person);
    return (
      <Modal onClick={() => closeModal()}>
        <Body>
          <ModalBody onClick={e => e.stopPropagation()}>
            {person ? (
              <>
                <Headline>
                  Person Information
                  <CloseButton onClick={() => closeModal()} />
                </Headline>
                <Info>
                  <Avatar
                    size="100"
                    name={person.Name}
                    round
                    color="#e2ebf9"
                    fgColor="#4f7ce0"
                    style={{ margin: 20 }}
                  />
                  <PersonName>{person.Name}</PersonName>
                  <PersonPhoneNumber>
                    +{person.Phone[0].value}
                  </PersonPhoneNumber>
                </Info>
                <Details>
                  <Inline>
                    <Left>
                      <Title>Email</Title>
                    </Left>
                    <Right>
                      <Value>{person.Email[0].value}</Value>
                    </Right>
                  </Inline>
                  <Inline>
                    <Left>
                      <Title>Organization</Title>
                    </Left>
                    <Right>
                      <Value>{person.org_name}</Value>
                    </Right>
                  </Inline>
                  <Inline>
                    <Left>
                      <Title>Assistant</Title>
                    </Left>
                    <Right>
                      <Value>{person.Assistant}</Value>
                    </Right>
                  </Inline>
                  <Inline>
                    <Left>
                      <Title>Groups</Title>
                    </Left>
                    <Right>
                      <Value>{person.Groups}</Value>
                    </Right>
                  </Inline>
                  <Inline>
                    <Left>
                      <Title>Location</Title>
                    </Left>
                    <Value>
                      <Value>{person.Location}</Value>
                    </Value>
                  </Inline>
                </Details>
                <Bottom>
                  <DeleteButton
                    //onClick={this.deletePerson}
                    onClick={this.openModal}
                  >
                    Delete
                  </DeleteButton>
                  {this.state.modal && (
                    <Modal onClick={() => this.closeDeleteModal()}>
                      <Body>
                        <ModalBody
                          onClick={e => e.stopPropagation()}
                          width="300px"
                        >
                          <Headline center>
                            Are you sure you want to delete this person?
                          </Headline>
                          <Bottom>
                            <DeleteButton
                              //onClick={this.deletePerson}
                              onClick={this.deletePerson}
                            >
                              Delete
                            </DeleteButton>
                            <BackButton onClick={() => this.closeDeleteModal()}>
                              Back
                            </BackButton>
                          </Bottom>
                        </ModalBody>
                      </Body>
                    </Modal>
                  )}
                  <BackButton onClick={() => closeModal()}>Back</BackButton>
                </Bottom>
              </>
            ) : (
              <>
                <Headline>
                  New Person
                  <CloseButton onClick={() => closeModal()} />
                </Headline>
                <Info>
                  <Avatar
                    size="100"
                    round
                    skypeId="sitebase"
                    color="#e2ebf9"
                    fgColor="#4f7ce0"
                    style={{ margin: 20 }}
                  />
                </Info>
                <NewPersonForm onSubmit={addNewPerson} />
              </>
            )}
          </ModalBody>
        </Body>
      </Modal>
    );
  }
}

export default ContactModal;
