import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddTask.css"; // Archivo CSS para los estilos 

const API_URL = "http://localhost:3010";

const AddTask = () => {
    const [name, setName] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [date, setDate] = useState(""); 
    const navigate = useNavigate();

    const handleAddTask = async (event: React.FormEvent) => {
        event.preventDefault();
        const userInStorageString = window.localStorage.getItem("user");
        if (userInStorageString) {
            const userInStorage = JSON.parse(userInStorageString);
            const token = userInStorage.token;

            try {
                const response = await fetch(`${API_URL}/api/v1/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name, descripcion, date })
                });

                if (response.status === 201) {
                    navigate('/tasks');
                } else {
                    console.log("Error adding task");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.value;
        setDate(dateValue); 
    }

    return (
        <div className="addTaskContainer">
            <h2>Agregar Nueva Tarea</h2>
            <form onSubmit={handleAddTask}>
                <div className="formGroup">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input
                        type="text"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="date">Fecha y Hora:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <button type="submit" className="submitButton">Agregar Tarea</button>
            </form>
        </div>
    );
};

export default AddTask;
