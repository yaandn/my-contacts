const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    // mostra todas as categorias
    const categories = await CategoryRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    // mostra uma categoria
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: "Category not found" });
    }

    response.json(category);
  }

  async store(request, response) {
    // Cadastra uma nova categoria
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const category = await CategoryRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    // atualiza uma categoia
    const { name } = request.body;
    const { id } = request.params;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    if (!id) {
      return response.status(404).json({ error: "Category not found" });
    }

    const category = await CategoryRepository.update(id, name);

    response.json(category);
  }

  async delete(request, response) {
    // exclui uma categoia
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: "Category not found" });
    }

    await CategoryRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
