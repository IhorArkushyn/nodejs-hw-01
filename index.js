
const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --contactId <type>", "user contactId")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, contactId, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);


    case "get":
      const oneContact = await contacts.getContactById(contactId);
      return console.log(oneContact);


    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);


    case "remove":
      const deleteContact = await contacts.removeContact(contactId);
      return console.log(deleteContact);
  

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

