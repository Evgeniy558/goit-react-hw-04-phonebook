import { useEffect, useState } from "react";
import css from "./App.module.css";
import { nanoid } from "nanoid";
import Form from "./components/contactForm/ContactsForm";
import ContactList from "./components/contactList/ContactList";
import Filter from "./components/filter/Filter";
import { saveToLocalStorage } from "./components/serveces/saveToLocalStorage";
import { getFromLocalStorage } from "./components/serveces/getFromLocalStorage";
import { filterContacts } from "./components/serveces/filterContacts";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setfilter] = useState("");

  useEffect(() => {
    const contacts = getFromLocalStorage();
    if (contacts && contacts.length) {
      setContacts((prevState) => {
        const updateContacts = { ...prevState, ...contacts };
        return updateContacts;
      });
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(contacts);
    if (contacts.length === 0) {
      localStorage.removeItem("contacts");
    }
  }, [contacts]);

  const addNewContact = (formData) => {
    const { name, number } = formData;
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
  };

  const handleSearch = (SearchValue) => {
    // const { value } = event.target;
    setfilter(SearchValue);
  };

  const deleteContact = (id) => {
    const contactsAfterDel = getFromLocalStorage().filter((el) => {
      return el.id !== id;
    });
    setContacts(contactsAfterDel);
  };

  const displayedContacts = filter
    ? filterContacts(contacts, filter)
    : contacts;

  return (
    <div className="App">
      <header className={css.appheader}>
        <section className={css.section}>
          <h1>Phonebook</h1>
          <Form onSubmit={addNewContact} />
        </section>
        <section className={css.section}>
          <h2>Contacts</h2>
          <Filter onChange={handleSearch} />
          {displayedContacts.length > 0 ? (
            <ContactList
              displayedContacts={displayedContacts}
              onClick={deleteContact}
            />
          ) : (
            <p> No contacts </p>
          )}
        </section>
      </header>
    </div>
  );
};
