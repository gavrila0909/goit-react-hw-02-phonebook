import React, { Component } from 'react';

class ContactList extends Component {
  render() {
    return (
      <>
        <h4>Find contacts by name</h4>
        <input
          type="text"
          name="search"
          onChange={e => this.props.onSearch(e.target.value)}
        />

        <ul>
          {this.props.contacts
            .filter(contact => {
              return (
                this.props.filter.toLowerCase() === '' ||
                contact.name
                  .toLowerCase()
                  .includes(this.props.filter.toLowerCase())
              );
            })
            .map(contact => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
              </li>
            ))}
        </ul>
      </>
    );
  }
}
export default ContactList;
