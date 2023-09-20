export function saveToLocalStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
