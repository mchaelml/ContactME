import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import {
  fetchPersons,
  orderList,
  addNewPerson,
  deletePersonById
} from "../actions/index";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { MdPersonAdd } from "react-icons/md";

import PersonBox from "../components/PersonBox";
import Spinner from "../components/Spinner";
import ContactModal from "./ContactModal";

const FilterContainer = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2dede;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.div`
  padding: 0 20px 20px 20px;
`;

const SortableListStyle = styled.ul`
  list-style: none;
  list-style-type: none;
  padding-inline-start: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  background-color: white;
`;

const NewPerson = styled(MdPersonAdd)`
  font-size: 30px;
  padding: 0 20px;
  cursor: pointer;
`;

const Filter = styled.div`
  padding-top: 5px;
  text-align: center;
  height: ${props =>
    props.height
      ? `${props.height}px; display: flex; align-items: center;`
      : "auto"};
`;

const FilterInput = styled.input`
  width: 90%;
  height: 35px;
  margin-top: 5px;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  font-size: 15px;
  text-align: center;
`;
const InputButton = styled.button`
  width: 10%;
  height: 35px;
  margin-top: 5px;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  font-size: 15px;
  text-align: center;
  padding: 0px;
  cursor: pointer;
  background-color: white;
  color: ${props => (props.disabled ? "#d2d2d2" : "#484444")};
  ${props => (props.disabled ? "pointer-events: none; opacity: 0.6" : "")}
`;

const Pagination = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding-inline-start: 20px;
  justify-content: center;
  padding: 0 10px 10px 10px;
`;

const PageNumber = styled.li`
  margin-right: 5px;
  padding: 5px;
  border: 1px solid #e2dede;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? "#e6eefa" : null)};
  ${props => (props.disabled ? "pointer-events: none; opacity: 0.6" : "")}
`;

const FilterBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 33%;
`;

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  margin-top: 5px;
  & > div {
    height: 35px;
    display: flex;
    flex-direction: column;
    padding-top: 5px;
  }
  .Dropdown-menu {
    height: auto;
  }
`;

const Inline = styled.div`
  width: 100%;
`;
class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPersonModalOpen: false,
      person: null,
      isNewPersonModalOpen: false,
      filterByName: "",
      personsFiltered: null,
      currentPage: 1,
      personsPerPage: 5,
      sortBy: null
    };
  }
  componentDidMount() {
    this.props.fetchPersons();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.persons &&
      prevProps.persons.length !== this.props.persons.length
    ) {
      this.props.fetchPersons();
    }
  }

  openCloseModal = (person = null) => {
    this.setState({
      isPersonModalOpen: !this.state.isPersonModalOpen,
      person: person
    });
  };

  openCloseNewPersonModal = () => {
    this.setState({
      isNewPersonModalOpen: !this.state.isNewPersonModalOpen
    });
  };

  addNewPerson = person => {
    this.props.addNewPerson(person);
    this.openCloseNewPersonModal();
  };

  deletePerson = id => {
    this.props.deletePerson(id);
    this.openCloseModal();
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  filterByName = e => {
    const name = e.target.value;
    if (name && name.length > 0 && /\S/.test(name)) {
      this.setState({
        filterByName: name
      });
      const filter = this.props.persons.filter(personName =>
        personName.Name.toLowerCase().includes(name.toLowerCase())
      );
      this.setState({
        personsFiltered: filter
      });
    } else {
      this.setState({ filterByName: "", personsFiltered: null });
    }
  };

  initialSort = (data = []) => {
    return data.sort((a, b) => {
      return (
        (a.OrderId === null) - (b.OrderId === null) ||
        +(a.OrderId > b.OrderId) ||
        -(a.OrderId < b.OrderId)
      );
    });
  };

  sort = e => {
    const data = this.state.personsFiltered
      ? this.initialSort(this.state.personsFiltered)
      : this.initialSort(this.props.persons);
    if (!e) {
      return data || [];
    }
    switch (e) {
      case "Ascending":
        return data.sort((a, b) => {
          if (a.Name > b.Name) return 1;
          else return -1;
        });
      case "Descending":
        return data.sort((a, b) => {
          if (a.Name < b.Name) return 1;
          else return -1;
        });
      case "Recently Added":
        return data.sort((a, b) => {
          if (new Date(a["Person created"]) < new Date(b["Person created"]))
            return 1;
          else return -1;
        });
      case "Organization":
        return data.sort((a, b) => {
          if (a.org_name > b.org_name) return 1;
          else return -1;
        });
      default:
        return data;
    }
  };

  orderList = (oldIndex, newIndex) => {
    this.props.orderList(
      oldIndex,
      newIndex,
      this.props.persons,
      this.state.currentPage,
      this.state.personsPerPage
    );
  };

  render() {
    const { currentPage, personsPerPage, personsFiltered } = this.state;
    var { persons = [] } = this.props;
    const indexOfLastPerson = currentPage * personsPerPage;
    const indexOfFirstPerson = indexOfLastPerson - personsPerPage;

    const currentPersons = this.sort(this.state.sortBy).slice(
      indexOfFirstPerson,
      indexOfLastPerson
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <=
      Math.ceil(
        (personsFiltered
          ? personsFiltered.length
          : persons
          ? persons.length
          : 0) / personsPerPage
      );
      i++
    ) {
      pageNumbers.push(i);
    }

    var startPage, endPage;
    if (pageNumbers.length <= 10) {
      startPage = 1;
      endPage = pageNumbers.length;
    } else {
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 4 >= pageNumbers.length) {
        startPage = pageNumbers.length - 4;
        endPage = pageNumbers.length;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    const renderPageNumbers = () => (
      <>
        <PageNumber onClick={() => this.setState({ currentPage: 1 })}>
          First
        </PageNumber>
        <PageNumber
          disabled={currentPage === 1}
          onClick={() => this.setState({ currentPage: currentPage - 1 })}
        >
          &#60;
        </PageNumber>
        {pages.map((page, index) => (
          <PageNumber
            key={index}
            id={page}
            isActive={page === currentPage}
            onClick={this.handleClick}
          >
            {page}
          </PageNumber>
        ))}
        <PageNumber
          disabled={currentPage === pageNumbers.length}
          onClick={() => this.setState({ currentPage: currentPage + 1 })}
        >
          &#62;
        </PageNumber>
        <PageNumber
          onClick={() => this.setState({ currentPage: pageNumbers.length })}
        >
          Last
        </PageNumber>
      </>
    );

    const SortableItem = SortableElement(({ person }) => (
      <ListItem>
        <PersonBox
          key={person.id}
          person={person}
          openModal={this.openCloseModal}
        />
      </ListItem>
    ));

    const SortableList = SortableContainer(({ items }) => {
      return (
        <SortableListStyle>
          {items.map((person, index) => (
            <SortableItem person={person} key={index} index={index} />
          ))}
        </SortableListStyle>
      );
    });

    if (!this.props.persons) {
      return <Spinner />;
    }
    return (
      <>
        <Title>
          People's List
          <NewPerson onClick={() => this.openCloseNewPersonModal()} />
        </Title>
        <FilterContainer>
          <FilterBox>
            <Filter>Search Name</Filter>
            <Inline>
              <FilterInput
                value={this.state.filterByName}
                onChange={this.filterByName.bind(this)}
              />
              <InputButton
                disabled={!this.state.filterByName}
                onClick={e => this.filterByName(e)}
              >
                X
              </InputButton>
            </Inline>
          </FilterBox>
          <FilterBox>
            <Filter>N of People:</Filter>
            <Filter height="35">
              {personsFiltered ? personsFiltered.length : persons.length}
            </Filter>
          </FilterBox>
          <FilterBox>
            <Filter>Sort By</Filter>
            <StyledDropdown
              value={this.state.sortBy ? this.state.sortBy : "Select..."}
              options={[
                {
                  value: "Ascending",
                  label: "Ascending"
                },
                {
                  name: "Descending",
                  label: "Descending"
                },
                {
                  name: "Recently Added",
                  label: "Recently Added"
                },
                {
                  name: "Organization",
                  label: "Organization"
                }
              ]}
              onChange={e =>
                this.setState({ sortBy: e.value }, () => this.sort(e.value))
              }
            />
          </FilterBox>
        </FilterContainer>
        <List>
          <SortableList
            items={currentPersons}
            onSortEnd={({ oldIndex, newIndex }) =>
              this.orderList(oldIndex, newIndex)
            }
            axis="y"
            pressDelay={200}
            helperClass="test"
          />
        </List>
        {this.state.isPersonModalOpen && (
          <ContactModal
            person={this.state.person}
            closeModal={this.openCloseModal}
            deletePerson={id => this.deletePerson(id)}
          />
        )}
        {this.state.isNewPersonModalOpen && (
          <ContactModal
            closeModal={this.openCloseNewPersonModal}
            addNewPerson={this.addNewPerson}
            organizations={this.props.organizations}
          />
        )}
        <Pagination>{renderPageNumbers()}</Pagination>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    persons: state.persons.persons,
    user: state.persons.user,
    organizations: state.persons.organizations
  };
};

const mapDispatchToProps = dispatch => ({
  orderList: (oldIndex, newIndex, items, currentPage, personsPerPage) => {
    dispatch(orderList(oldIndex, newIndex, items, currentPage, personsPerPage));
  },
  fetchPersons: () => {
    dispatch(fetchPersons());
  },
  addNewPerson: person => {
    dispatch(addNewPerson(person));
  },
  deletePerson: id => {
    dispatch(deletePersonById(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
