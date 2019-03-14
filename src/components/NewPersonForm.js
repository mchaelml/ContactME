import React from "react";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import { connect } from "react-redux";
import Media from "../responsive/MediaCss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${props => props.alignItems || "normal"};
`;

const FormBg = styled.div`
  background-color: #f5f3f4;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  padding: 10px;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${Media.Small.max`
    height: auto;
  `}
`;

const Error = styled.div`
  color: red;
  text-align: center;
`;

const Label = styled.label``;

const Input = styled.div`
  padding: 5px 0 10px 0;
  width: 100%;
`;

const InputBox = styled.input`
  width: inherit;
  box-sizing: border-box;
  border: 1px solid #ccc;
  height: 30px;
`;

const DropdownStyled = styled(Dropdown)`
  & > div {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const Form = styled.form`
  height: 100%;
`;

const Bottom = styled.div`
  background-color: #ecebeb;
  padding: 10px;
  border-top: 1px solid #e2dede;
  display: flex;
  justify-content: ${props => (props.align ? props.align : "flex-end")};
`;

const AddButton = styled.button`
  height: 40px;
  width: 100px;
  background-color: #11bd58;
  color: white;
  font-weight: bold;
  border-width: 2px;
  border-radius: 5px;
`;

class NewPersonForm extends React.Component {
  renderInput = ({ input, label, meta, mode, disabled, choices = [] }) => {
    return (
      <React.Fragment>
        {mode === "input" && (
          <Column>
            <Label>{label}</Label>
            <Input>
              <InputBox {...input} disabled={disabled} />
            </Input>
            {meta.error && meta.touched && <Error>{meta.error}</Error>}
          </Column>
        )}
        {mode === "dropdown" && (
          <Column>
            <Label>{label}</Label>
            <Input>
              <DropdownStyled
                {...input}
                disabled={disabled}
                options={Object.values(choices || []).map(option => ({
                  value: option.id,
                  label: option.name
                }))}
              />
            </Input>
            {meta.error && meta.touched && <Error>{meta.error}</Error>}
          </Column>
        )}
      </React.Fragment>
    );
  };

  onSubmit = person => {
    const newPerson = {
      name: person.name,
      owner_id: 8420982,
      org_id: person.organization.value,
      email: [
        {
          label: "work",
          primary: true,
          value: person.email
        }
      ],
      phone: [
        {
          label: "work",
          primary: true,
          value: person.phone
        }
      ],
      visible_to: person.visible.value,
      add_time: new Date()
    };
    this.props.onSubmit(newPerson);
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <FormBg>
            <Field
              name="name"
              component={this.renderInput}
              label="Full Name"
              mode="input"
              disabled={this.props.disabled}
            />
            <Field
              name="email"
              component={this.renderInput}
              label="Email"
              mode="input"
              disabled={this.props.disabled}
            />
            <Field
              name="phone"
              component={this.renderInput}
              label="Phone"
              mode="input"
              disabled={this.props.disabled}
            />
            <Field
              name="organization"
              component={this.renderInput}
              label="Organization"
              mode="dropdown"
              choices={this.props.organizations}
            />
            <Field
              name="visible"
              component={this.renderInput}
              label="Visible To"
              mode="dropdown"
              choices={[
                {
                  id: 1,
                  name: "Owner & followers (private)"
                },
                {
                  id: 3,
                  name: "Entire company (shared)"
                }
              ]}
              disabled={this.props.disabled}
            />
          </FormBg>
          <Bottom align="center">
            <AddButton>Add New Person</AddButton>
          </Bottom>
        </Form>
      </React.Fragment>
    );
  }
}

const validate = vals => {
  const errors = {};
  if (!vals.name) errors.name = "Name can not be empty";
  if (vals.visible === "Select...")
    errors.visible = "Have to select the visibility property";
  if (vals.organization === "Select...")
    errors.organization = "Have to select the organization";
  if (!vals.phone) errors.phone = "Phone can not be empty";
  if (!vals.email) errors.email = "Email can not be empty";
  if (
    vals.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(vals.email)
  )
    errors.email = "Invalid email address";
  if (isNaN(vals.phone)) errors.phone = "Phone must be a number";
  if (vals.phone && !/^(0|[1-9][0-9]{9})$/i.test(vals.phone))
    errors.phone = "Invalid phone number, must be 10 digits";
  return errors;
};

const mapStateToProps = state => {
  return {
    initialValues: {
      visible: "Select...",
      organization: "Select..."
    },
    organizations: state.persons.organizations
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "NewPerson",
    validate,
    enableReinitialize: true
  })(NewPersonForm)
);
