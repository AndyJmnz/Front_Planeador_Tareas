import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import "../styles/AddTask.css";

const API_URL = "http://localhost:3010";

const EditTask = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [token, setToken] = useState(""); // Estado para almacenar el token

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const userInStorageString = window.localStorage.getItem("user");
                if (!userInStorageString) {
                    console.log("User not logged in");
                    return;
                }

                const userInStorage = JSON.parse(userInStorageString);
                const fetchedToken = userInStorage.token;
                setToken(fetchedToken); // Guardar el token en el estado

                const response = await fetch(`${API_URL}/api/v1/tasks/findById/${taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${fetchedToken}`
                    }
                });

                if (response.status === 200) {
                    const task = await response.json();
                    setName(task.name);
                    setDescription(task.description);
                } else {
                    console.log("Error fetching task details");
                }
            } catch (error) {
                console.error("Error fetching task details:", error);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`${API_URL}/api/v1/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Utilizando el token almacenado en el estado
                },
                body: JSON.stringify({ name, description })
            });

            if (response.status === 200) {
                navigate('/tasks');
            } else {
                console.error("Error updating task:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="addTaskContainer">
            <h2>Editar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <button type="submit" className="submitButton">Guardar Cambios</button>
            </form>
        </div>
    );
}
export default EditTask;
