import {Book} from "../Models/Books";
import {BooksRequest} from "../services/Books";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";


interface Props {
    mode: Mode;
    value: Book;
    isModalOpen: boolean; // открыто ли модальное окно
    handleCancel: () => void; // вызывается при закрытии модального окна
    handleCreate: (request: BooksRequest) => void; // вызывается при создании новой книги
    handleUpdate: (id: string, request: BooksRequest) => void; // вызывается при редактировании книги
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBook = ({mode, value, isModalOpen, handleCancel, handleCreate, handleUpdate}: Props) => {
    const [title, setTitle] = useState<string>(""); // название книги
    const [description, setDescription] = useState<string>(""); // описание книги
    const [price, setPrice] = useState<number>(0); // цена книги

    // Если value меняется, то обновляем title, description и price
    useEffect(() => {
        setTitle(value.title);
        setDescription(value.description);
        setPrice(value.price);
    }, [value])

    const handleOnOk = () => {
        const bookRequest = {title, description, price};
        mode === Mode.Create ? handleCreate(bookRequest) : handleUpdate(value.id, bookRequest);
    }

    return (<Modal
        title={mode === Mode.Create ? "Добавить книгу" : "Редактировать книгу"}
        open={isModalOpen}
        onOk={handleOnOk}
        onCancel={handleCancel}
        cancelText={"Отмена"}
    >
        <div className="book__modal">
            <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={"Название"}
            />
            <TextArea
                value={description}
                onChange={e => e.target.value}
                autoSize={{minRows: 3, maxRows: 3}}
                placeholder={"Описание"}
            />
            <Input
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder={"Цена"}
            />
        </div>
    </Modal>)
}