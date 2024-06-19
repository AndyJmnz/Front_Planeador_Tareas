import { useEffect, useState } from "react";
import "../styles/tasks.css";

const API_URL = "http://localhost:3010";

const Tasks = () => {
    const [dataTask, setDataTask] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

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

    return (
        <section className="dataContainer">
            <h2>Tareas</h2>
            {user && dataTask.length > 0 ? (
                <table className="dataTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTask.map((task, index) => (
                            <tr key={index}>
                                <td>{task._id}</td>
                                <td>{task.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay tareas disponibles</p>
            )}
        </section>
    );
};

export default Tasks;
