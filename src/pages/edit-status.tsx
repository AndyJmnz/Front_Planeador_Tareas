import { useParams } from "react-router-dom";

const EditStatus = () => {
    const { taskId } = useParams();

    // Lógica para obtener y editar el estado de la tarea

    return (
        <div>
            <h2>Editar Estado de la Tarea {taskId}</h2>
            {/* Formulario de edición del estado de la tarea */}
        </div>
    );
};

export default EditStatus;