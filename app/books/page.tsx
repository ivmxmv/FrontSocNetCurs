"use client"

import Button from "antd/es/button/button";
import {Books} from "@/app/components/Books";
import {useEffect, useState} from "react";
import {BooksRequest, createBook, deleteBook, getAllBooks, updateBook} from "@/app/services/Books";
import {Book} from "@/app/Models/Books";
import Title from "antd/es/typography/Title";
import {CreateUpdateBook, Mode} from "@/app/components/CreateUpdateBook";

export default function BooksPage() {
    const defaultValue = {
        title: "",
        description: "",
        price: 0,
    } as Book;

    const [value, setValue] = useState<Book>(defaultValue);

    const [books, setBooks] = useState<Book []>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    // вызывется одни раз при инициализации текущего компонента
    useEffect(() => {
        // async и await в JavaScript используются для работы с ассинхронными операциями
        const getBooks = async () => {
            const receivedBooks = await getAllBooks(); // получаем объекты
            setLoading(false); // сообщаем стейту, что загрузка объектов завершена
            setBooks(receivedBooks); // устанаваливаем в стейте полученные объекты
        }

        getBooks(); // вызываем метод по получению объетов
    }, []);

    // Создать объект
    const handleCreateBook = async (request: BooksRequest) => {
        await createBook(request);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    // Изменить объект
    const handleUpdateBook = async (id: string, request: BooksRequest) => {
        await updateBook(id, request);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    // Удалить объект
    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);
        closeModal();

        const books = await getAllBooks();
        setBooks(books);
    }

    // Открыть модальное окно для создания нового объекта
    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    // Открыть модальное окно для редактирования объекта
    const openEditModal = (book: Book) => {
        setMode(Mode.Edit);
        setValue(book);
        setIsModalOpen(true);
    };

    // Закрыть модальное окно
    const closeModal = () => {
        setValue(defaultValue);
        setIsModalOpen(false);
    };

    return <div>
        <Button>Добавить книгу</Button>
        <CreateUpdateBook
            mode={mode}
            value={value}
            isModalOpen={isModalOpen}
            handleCreate={handleCreateBook}
            handleUpdate={handleUpdateBook}
            handleCancel={closeModal}
        />
        {loading ? <Title>Загрузка...</Title>
            : <Books
                books={books}
                handleOpen={openEditModal}
                handleDelete={handleDeleteBook}
              />}
    </div>
}