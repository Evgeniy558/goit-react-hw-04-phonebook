export function filterContacts(contacts, filter) {
  const results = contacts.filter((el) => {
    return el.name.toLowerCase().includes(filter.toLowerCase());
  });
  return results;
}
