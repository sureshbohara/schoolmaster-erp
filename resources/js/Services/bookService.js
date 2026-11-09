export const BOOK_INITIAL_VALUES = {
    category_id: '',
    book_no: '',
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publish_year: '',
    rack_no: '',
    price: '',
    total_quantity: '',
    cover_image: null,
    _method: 'POST',
};

export const mapBookToFormData = (book) => ({
    category_id: book?.category?.id || '',
    book_no: book?.book_no || '',
    isbn: book?.isbn || '',
    title: book?.title || '',
    author: book?.author || '',
    publisher: book?.publisher || '',
    publish_year: book?.publish_year || '',
    rack_no: book?.rack_no || '',
    price: book?.price || '',
    total_quantity: book?.total_quantity || '',
    cover_image: null,
    _method: 'PUT',
});