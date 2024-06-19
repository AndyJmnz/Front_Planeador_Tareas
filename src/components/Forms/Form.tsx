import {useEffect, useState } from "react";
import "./Form.css"

const API_URL="http://localhost:3010"

function Form() {
    const [email, setEmail] =  useState<string>("");
    const [password, setPassword] =useState<string>("");
    const [showData, setshowData] =useState<boolean>(false);
    const [CorrectInfo, setCorrectInfo] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [DataTask, setDataTask] = useState<any[]>([]);

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        if(userInStorageString){
            const userInStorage = JSON.parse(userInStorageString);
            setUser(userInStorage);
        }
    }, [])

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any; }; }) => {
            stateUpdate(event.target.value);
        }
    }

    const handleOnClickSend = () => {
        fetchTask();
        logIn({email,password});
        setshowData(!showData);
    }
    const logIn = async ({email, password}: {email: string, password: string}) =>{
        try{
            const response = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password})
            });

            if(response.ok){
                const data = await response.json();
                setUser(data);
                window.localStorage.setItem("user", JSON.stringify(data));
            } else {
                alert("Usuario o contraseña Incorrectos");
            }

        }catch(error) {
            console.error(error);
        }
    }

    const fetchTask = async () => {
            try{
                const response = await fetch(`${API_URL}/api/v1/tasks`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
                if(response.status === 200) {
                    const data = await response.json();
                    setDataTask(data);
                    //console.log(data);
                }
    
            }catch(error){
                console.log(error);
            }
        }
   
        return(
        <>
           {
                user && (
                    <section className="dataContainer">
                        {showData ? (
                            <table className="dataTable">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DataTask.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task._id}</td>
                                            <td>{task.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            CorrectInfo && <p>Información incorrecta</p>
                        )}
                    </section>
                )
            }
            <section className="formContainer">        
                <h2 className="Titulo">Taskify</h2>
                <section className="imgTitulo">
                <img src="../img/img-principal.png" alt="Imagen de Bienvenida" className="imagenBienvenida" />
                </section>
                <span className="inputContainer">
                    <label htmlFor="name">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)}/>
                </span>
                <button className="customButton" onClick={handleOnClickSend}>
                    Login
                </button>
            </section>
            
        </>

    );
}

export default Form;