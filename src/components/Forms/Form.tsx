import {useState } from "react";
import "./Form.css"

function Form() {
    const [email, setEmail] =  useState<string>("");
    const [password, setPassword] =useState<string>("");
    const [showData, setshowData] =useState<boolean>(false);
    const [CorrectInfo, setCorrectInfo] = useState<boolean>(false);

    const handleInputChange = (stateUpdate: (arg0: any) => void) => {
        return (event: { target: { value: any; }; }) => {
            stateUpdate(event.target.value);
        }
    }

    const handleOnClickSend = () => {
        if (email == "a22110126@ceti.mx" && password =="1234"){
            setshowData(true)
            setCorrectInfo(false)
        } else {
            setshowData(false);
            setCorrectInfo(true)
        }
    }

        return(
        <>
            <section className="dataContainer">
                {
                    showData? (
                        <>
                        <p>Email: {email}</p>
                        <p>Password: {password}</p>
                        </>
                    ) :
                    CorrectInfo && (
                        <>
                        <p>Informacion Incorrecta</p>
                        </>
                    )
                }
            </section>
            <section className="formContainer">        
                <h2>Bienvenido</h2>
                <span className="inputContainer">
                    <label htmlFor="name">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)}/>
                </span>
                <button onClick={handleOnClickSend}>
                    Login
                </button>
            </section>
        </>

    );
}

export default Form;