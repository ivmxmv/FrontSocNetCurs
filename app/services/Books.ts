// Здесь будем вызывать запросы

// В такой структуре добавляемые книги будут отправляться на бэк
export interface BooksRequest {
    title: string;
    description: string;
    price: number;
}

// Методы CRUD-операций для книг

// Метод для получения всех книг
export const getAllBooks = async () => {
    // Отправялем GET-запрос на сервер с эндпоинтом "Books"
    // У метода fetch() по-умолчанию делается GET-запрос
    const response = await fetch("https://localhost:5079/Books");
    return response.json();
}

// Метод для создания новой книги
export const createBook = async (bookRequest: BooksRequest) => {
    // Отправялем POST-запрос на сервер с эндпоинтом "Books"
    // У метода fetch() по-умолчанию делается GET-запрос, поэтому добавляем методу дополнительные параметры
    const response = await fetch("https://localhost:5079/Books", {
        method: "POST",
        headers: {
            // Здесь, в заголовках, указываем, что данные будут передаваться в виде json-объекта
            "content-type": "application-json",
        },
        body: JSON.stringify(bookRequest), // здесь мы преобразовываем отправляемый объект в json-строку
    });
    return response.json();
}

// Метод для изменения существующей книги
export const updateBook = async (id: string, bookRequest: BooksRequest) => {
    // Отправялем PUT-запрос на сервер с эндпоинтом "Books"
    // У метода fetch() по-умолчанию делается GET-запрос, поэтому добавляем методу дополнительные параметры
    const response = await fetch(`https://localhost:5079/Books/${id}`, {
        method: "PUT",
        headers: {
            // Здесь, в заголовках, указываем, что данные будут передаваться в виде json-объекта
            "content-type": "application-json",
        },
        body: JSON.stringify(bookRequest), // здесь мы преобразовываем отправляемый объект в json-строку
    });
    return response.json();
}

// Метод для удаления книги
export const deleteBook = async (id: string) => {
    // Отправялем DELETE-запрос на сервер с эндпоинтом "Books"
    // У метода fetch() по-умолчанию делается GET-запрос, поэтому добавляем методу дополнительные параметры
    const response = await fetch(`https://localhost:5079/Books/${id}`, {
        method: "DELETE", // headers (заголовки) и body (тело запроса) не нужны, поскольку тело запроса (отправляемые объекты) отсутствует
    });
    return response.json();
}