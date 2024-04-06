import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  }

  handleAddContacts = e => {
    e.preventDefault();
    const { name, number } = this.state;
    //fac verificare daca inputul nu este gol
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }));
    }
    console.log(this.state);
  };

  handleInputChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  };

  handleSearch = event => {
    const searchValue = event.target.value;
    this.setState({ filter: searchValue });
  };

  render() {
    console.log('Ma randez...'); //sa vad cum functioneaza randarea
    return (
      <>
        <form className={styles.formContainer}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleInputChange} //(event) => this.handleInputChange(event) pot face asa fara a mai pune functia, dar e recomandat cu functie
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number">Number:</label>
          <input
            type="tel"
            id="number"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="button" onClick={this.handleAddContacts}>
            Add contact
          </button>
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <input
            type="text"
            name="search"
            onChange={this.handleSearch}
          />
          <ul>
            {this.state.contacts
              .filter(contact => {
                return (
                  this.state.filter.toLowerCase() === '' ||
                  contact.name
                    .toLowerCase()
                    .includes(this.state.filter.toLowerCase())
                );
              })
              .map(contact => (
                <li key={contact.id}>
                  {contact.name}: {contact.number}
                </li>
              ))}
          </ul>
        </form>
      </>
    );
  }
}
export default App;
