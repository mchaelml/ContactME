import React from "react";
import styled from "styled-components";
import { MdBusiness } from "react-icons/md";
import Avatar from "react-avatar";

const Box = styled.div`
  border: 1px solid #e2dede;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const BusinessIcon = styled(MdBusiness)`
  padding-right: 5px;
  font-size: 20px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Right = styled.div``;

const Left = styled.div``;

const PersonName = styled.div``;

const PersonCompany = styled.div`
  display: flex;
  font-size: 15px;
  align-items: center;
`;

const PersonCompanyName = styled.div`
  font-size: 15px;
  color: #a7a7a7f2;
`;

const PersonBox = ({ person, openModal }) => (
  <Box onClick={() => openModal(person)}>
    <Flex>
      <Left>
        <PersonName>{person.Name}</PersonName>
        <PersonCompany>
          <BusinessIcon />
          <PersonCompanyName>{person.org_name}</PersonCompanyName>
        </PersonCompany>
      </Left>
      <Right>
        <Avatar
          size="50"
          name={person.Name}
          round
          color="#e2ebf9"
          fgColor="#4f7ce0"
        />
      </Right>
    </Flex>
  </Box>
);

export default PersonBox;
