import { useEffect, useState } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import Form from "./components/contactForm/ContactsForm";
import List from "./components/contactList/ContactList";
import Filter from "./components/filter/Filter";
import { saveToLocalStorage } from "./components/serveces/saveToLocalStorage";
import { getFromLocalStorage } from "./components/serveces/getFromLocalStorage";
import { filterContacts } from "./components/serveces/filterContacts";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setfilter] = useState("");

  useEffect(() => {
    const contactsFromLocalStorage = getFromLocalStorage();
    if (contactsFromLocalStorage && contactsFromLocalStorage.length) {
      setContacts([...contacts, ...contactsFromLocalStorage]);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(contacts);
  }, [contacts]);

  const addContact = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const number = event.target.elements.number.value;
    if (
      contacts.find((el) => {
        return el.name.toLocaleLowerCase() === name.toLowerCase();
      })
    ) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts((prevContacts) => {
        const updatedContacts = [
          ...prevContacts,
          { id: nanoid(), name: name, number: number },
        ];
        return updatedContacts;
      });
    }
    event.currentTarget.reset();
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setfilter(value);
  };

  const deleteContact = (id) => {
    const contactsAfterDel = getFromLocalStorage().filter((el) => {
      return el.id !== id;
    });
    setContacts(contactsAfterDel);
  };

  return (
    <div className="App">
      <header className={css.appheader}>
        <section className={css.section}>
          <h1>Phonebook</h1>
          <Form onSubmit={addContact} />
        </section>
        <section className={css.section}>
          <h2>Contacts</h2>
          <Filter onChange={handleSearch} />
          <List
            displayedContacts={
              filter ? filterContacts(contacts, filter) : contacts
            }
            onClick={deleteContact}
          />
        </section>
      </header>
    </div>
  );
};
