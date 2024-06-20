import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tasks.css";
import taskImage from "../assets/todoList.png";

const API_URL = "http://localhost:3010";

const Tasks = () => {
    const [dataTask, setDataTask] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        if (userInStorageString) {
            const userInStorage = JSON.parse(userInStorageString);
            setUser(userInStorage);
            fetchTask(userInStorage.token);
        }
    }, []);

    const fetchTask = async (token: string) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setDataTask(data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleEditTask = (taskId: string) => {
        navigate(`/edit-task/${taskId}`);
    }

    const handleAddTask = () => {
        navigate('/add-task');
    }

    const handleDeleteTask = async (taskId: string) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
        if (confirmed) {
            try {
                const response = await fetch(`${API_URL}/api/v1/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });


                fetchTask(user.token);

            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleCompleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/tasks/${taskId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                fetchTask(user.token);
            } else {
                console.log("Error updating task status");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <section className="dataContainer">
            <div className="headerContainer">
                <h1>Tareas</h1>
            </div>
            <img src={taskImage} alt="Imagen de Tareas" className="taskImage" /><br></br>
            <button onClick={handleAddTask} className="botonAgregar">Agregar Tarea</button>
            {user && dataTask.length > 0 ? (
                <div className="taskGrid">
                    {dataTask.map((task, index) => (
                        <div key={index} className="taskCard">
                            <div className="taskInfo">
                                <p><strong>Id:</strong> {task._id}</p>
                                <p><strong>Nombre:</strong> {task.name}</p>
                                <p><strong>Descripción:</strong> {task.description}</p>
                                <p><strong>Estatus:</strong> {task.status}</p>
                            </div>
                            <div className="taskActions">
                                <button onClick={() => handleEditTask(task._id)}>Modificar</button>
                                <button onClick={() => handleCompleteTask(task._id)}>Completada</button>
                                <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay tareas disponibles</p>
            )}
        </section>
    );
};

export default Tasks;


