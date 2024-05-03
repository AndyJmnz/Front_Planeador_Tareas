import { useEffect, useState } from "react";

function Clase() {
    const[task, setTask] = useState<any>(null)

    useEffect(() => {
        fetch("http://localhost:3010/api/v1/tasks/findSecond")
        .then((res) => res.json())
        .then((data) => setTask(data))
    },[])

    return(
        <div>
            {task && (
                <>
                <p>{task.name}</p>
                <p>{task.date}</p>
                <p>{task.status}</p>
                </>
            )}
        </div>
    )
}
export default Clase;