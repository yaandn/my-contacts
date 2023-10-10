const ContactsRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    return response.json(contacts);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExist = await ContactsRepository.findByEmail(email);

    if (contactExist) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExistById = await ContactsRepository.findById(id);

    if (!contactExistById) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const contactExistByEmail = await ContactsRepository.findByEmail(email);

    if (contactExistByEmail && id !== contactExistByEmail.id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();

/*
    Nossos controllers é onde vai existir as regras de negócio para cada entidade,
    ele vai se comunicar com as rotas retornando algum valor ou não

    Cada controller é uma classe que é exportada e importada no arquivo de rotas para utilizarmos
    os métodos dessas classes
*/
