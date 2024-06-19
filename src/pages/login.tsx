import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css"

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);
    const [correctInfo, setCorrectInfo] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [dataTask, setDataTask] = useState<any[]>([]);
    const navigate = useNavigate();
    const API_URL = "http://localhost:3010";

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        if (userInStorageString) {
            const userInStorage = JSON.parse(userInStorageString);
            setUser(userInStorage);
        }
    }, []);

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any; }; }) => {
            stateUpdate(event.target.value);
        };
    };

    const handleOnClickSend = () => {
        logIn({ email, password });
        setShowData(!showData);
    };

    const logIn = async ({ email, password }: { email: string, password: string }) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                window.localStorage.setItem("user", JSON.stringify(data));
                navigate("/tasks"); // Redirigir a la vista de tareas
            } else {
                alert("Usuario o contraseña Incorrectos");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="formContainer">
            <h2 className="Titulo">Taskify</h2>
            <section className="imgTitulo">
                <img src="../img/img-principal.png" alt="Imagen de Bienvenida" className="imagenBienvenida" />
            </section>
            <span className="inputContainer">
                <label htmlFor="name">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)} />
            </span>
            <span className="inputContainer">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)} />
            </span>
            <button className="customButton" onClick={handleOnClickSend}>
                Login
            </button>
        </section>
    );
};

export default Login;