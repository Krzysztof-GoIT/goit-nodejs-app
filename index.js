const { Command } = require("commander");
const {
    getContacts,
    getContactById,
    deleteContact,
    addContact,
} = require("./contacts");

const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const list = await getContacts();
            console.table(list);
            break;

        case "get":
            if (!id) {
                console.log("Missing argument: -i, --id <type>");
                break;
            }
            const contact = await getContactById(id);
            console.log(contact);
            break;

        case "add":
            if (!name || !email || !phone) {
                console.log(
                    "Missing argument:\n -n, --name <type>\n -e, --email <type>\n -p, --phone <type>"
                );
                break;
            }
            const newContact = await addContact(name, email, phone);
            console.log("newContact", newContact);
            break;

        case "del":
        case "remove":
            if (!id) {
                console.log("Missing argument: -i, --id <type>");
                break;
            }
            deleteContact(id);
            break;

        default:
            console.warn(
                "\x1B[31m Unknown action type!\n Please define: -a, --action <type>\n   list -display all contacts \n   get  -display contacts ByID\n   add  -add contacts\n   del  -delete contacts ByID "
            );
    }
}

invokeAction(argv);
