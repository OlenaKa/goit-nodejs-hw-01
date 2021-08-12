const fs = require("fs").promises
const path = require("path")

const contactsPath = path.resolve("db/contacts.json")

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data.toString())))
    .catch((err) => console.log(err.message))
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      JSON.parse(data.toString()).find(
        (contact) => contact.id === Number(contactId) && console.table(contact)
      )
    )
    .catch((err) => console.log(err.message))
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data).filter(
        (contact) => contact.id !== Number(contactId)
      )
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then(() =>
          console.log(`contact ${contactId} was successfully deleted`)
        )
        .catch((err) => console.log(err.message))
    })
    .catch((err) => console.log(err.message))
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data)
      const id = contacts.length + 1
      const newContact = { id, name, email, phone }
      contacts.push(newContact)
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then(() => console.log(`contact was successfully added`))
        .catch((err) => console.log(err.message))
    })
    .catch((err) => console.log(err.message))
}

// const fns = { listContacts }

module.exports = { listContacts, getContactById, addContact, removeContact }
