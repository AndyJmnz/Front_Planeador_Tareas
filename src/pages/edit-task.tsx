import { useParams } from "react-router-dom";

const EditTask = () => {
    const { taskId } = useParams();

    // Lógica para obtener y editar la tarea

    return (
        <div>
            <h2>Editar Tarea {taskId}</h2>
            {/* Formulario de edición de tarea */}
        </div>
    );
};

export default EditTask;