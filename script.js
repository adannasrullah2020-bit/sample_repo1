document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactListTable = document.getElementById('contactList');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    const renderContacts = () => {
        contactListTable.innerHTML = '';
        contacts.forEach(contact => {
            const row = contactListTable.insertRow();
            row.innerHTML = `
                <td>${contact.id}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${contact.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${contact.id}">Delete</button>
                </td>
            `;
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    const addContact = (name, email, phone) => {
        const newContact = {
            id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
            name,
            email,
            phone
        };
        contacts.push(newContact);
        renderContacts();
    };

    const updateContact = (id, name, email, phone) => {
        const index = contacts.findIndex(contact => contact.id == id);
        if (index !== -1) {
            contacts[index] = { ...contacts[index], name, email, phone };
            renderContacts();
        }
    };

    const deleteContact = (id) => {
        contacts = contacts.filter(contact => contact.id != id);
        renderContacts();
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('contactId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (id) {
            updateContact(id, name, email, phone);
        } else {
            addContact(name, email, phone);
        }
        contactForm.reset();
        document.getElementById('contactId').value = ''; // Clear hidden ID
    });

    contactListTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            const contactToEdit = contacts.find(contact => contact.id == id);
            if (contactToEdit) {
                document.getElementById('contactId').value = contactToEdit.id;
                document.getElementById('name').value = contactToEdit.name;
                document.getElementById('email').value = contactToEdit.email;
                document.getElementById('phone').value = contactToEdit.phone;
            }
        } else if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this contact?')) {
                deleteContact(id);
            }
        }
    });

    renderContacts();
});