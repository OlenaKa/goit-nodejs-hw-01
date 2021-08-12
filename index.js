const fns = require("./contacts")

const { Command } = require("commander")
const program = new Command()
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      fns.listContacts()
      break

    case "get":
      fns.getContactById(id)
      break

    case "add":
      fns.addContact(name, email, phone)
      break

    case "remove":
      fns.removeContact(id)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(argv)
