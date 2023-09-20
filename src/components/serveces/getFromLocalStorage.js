export function getFromLocalStorage() {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  return contacts;
}
