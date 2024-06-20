import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tasks.css";

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

    const handleEditStatus = (taskId: string) => {
        navigate(`/edit-status/${taskId}`);
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

                if (response.status === 200) {
                    // Después de eliminar la tarea, vuelve a obtener la lista completa de tareas
                    fetchTask(user.token);
                } else {
                    console.log("Error deleting task");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <section className="dataContainer">
           <h2>Tareas</h2>
           <button onClick={handleAddTask}>Agregar Tarea</button>
            {user && dataTask.length > 0 ? (
                <div className="taskList">
                    {dataTask.map((task, index) => (
                        <section key={index} className="taskSection">
                            <div className="taskInfo">
                                <p><strong>Id:</strong> {task._id}</p>
                                <p><strong>Nombre:</strong> {task.name}</p>
                            </div>
                            <div className="taskActions">
                                <button onClick={() => handleEditTask(task._id)}>Modificar Tarea</button>
                                <button onClick={() => handleEditStatus(task._id)}>Modificar Estado</button>
                                <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <p>No hay tareas disponibles</p>
            )}
        </section>
    );
};

export default Tasks;

