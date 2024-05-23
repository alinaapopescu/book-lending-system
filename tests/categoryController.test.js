jest.mock('../models/Category', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));
jest.mock('../models/Book', () => ({
  update: jest.fn()
}));

const Category = require('../models/Category');
const Book = require('../models/Book');
const categoryController = require('../controller/categoryController');

// Helper functions to mock Express request and response objects
const mockRequest = (params = {}, body = {}) => ({ params, body });
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('Category Controller', () => {
  describe('addCategory', () => {
    it('should add a category successfully', async () => {
      const req = mockRequest({}, { category_name: 'Science', rating: 5 });
      const res = mockResponse();
      Category.create.mockResolvedValue({
        id: 1,
        category_name: 'Science',
        rating: 5
      });

      await categoryController.addCategory(req, res);

      expect(Category.create).toHaveBeenCalledWith({ category_name: 'Science', rating: 5 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Category added successfully',
        category: { id: 1, category_name: 'Science', rating: 5 }
      });
    });

    it('should handle errors when adding a category', async () => {
      const req = mockRequest({}, { category_name: 'Science', rating: 5 });
      const res = mockResponse();
      const error = new Error('Database error');
      Category.create.mockRejectedValue(error);

      await categoryController.addCategory(req, res);

      expect(Category.create).toHaveBeenCalledWith({ category_name: 'Science', rating: 5 });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Error adding category', error });
    });
  });

  // Further tests for deleteCategory and updateCategory
});

describe('deleteCategory', () => {
  it('should delete a category and unset its association in books', async () => {
    const req = mockRequest({ id: '1' });
    const res = mockResponse();
    const categoryInstance = {
      destroy: jest.fn().mockResolvedValue({})
    };
    Category.findByPk.mockResolvedValue(categoryInstance);

    await categoryController.deleteCategory(req, res);

    expect(Category.findByPk).toHaveBeenCalledWith('1');
    expect(Book.update).toHaveBeenCalledWith({ category_id: null }, { where: { category_id: '1' } });
    expect(categoryInstance.destroy).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
  });

  it('should return 404 if the category does not exist', async () => {
    const req = mockRequest({ id: '1' });
    const res = mockResponse();
    Category.findByPk.mockResolvedValue(null);

    await categoryController.deleteCategory(req, res);

    expect(Category.findByPk).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: 'Category not found' });
  });
});





