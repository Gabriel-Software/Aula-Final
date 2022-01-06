import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { LoginRequest } from "../types/LoginRequest";
import { LoginResponse } from "../types/LoginResponse";
import { ModalCadastro } from '../components/ModalCadastro';


type LoginProps = {
    setToken(s: string) : void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userMsgError, setUserError] = useState('');
    const [msgUserSuccess, setMsgUserSuccess] = useState('');
    const closeModal = () => {
        setShowModal(false);
        setUserName('');
        setEmail('');
        setUserPassword('');
        setUserError('');
    }



    const doLogin = async () => {
        try {
            if (!login || !password) {
                setError('favor preencher os dados');
                return;
            }

            setError('');

            const body = {
                login,
                password
            };

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
                const loginResponse = result.data as LoginResponse;
                localStorage.setItem('accessToken', loginResponse.token);
                localStorage.setItem('userName', loginResponse.name);
                localStorage.setItem('userEmail', loginResponse.email);
                setToken(loginResponse.token);
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar login, tente novamenete');
        }
    }



    const doSave = async () => {
        try {
            if (!userName || !userEmail || !userPassword) {
                setUserError('favor preencher os dados');
                return;
            }

            setUserError('');

            const body = {
                name: userName,
                email: userEmail,
                password: userPassword
            };

            const result = await executeRequest('user', 'POST', body);
            if(result && result.data){
                setMsgUserSuccess('Usuário cadastrado com sucesso!')
                closeModal();
            }

        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setUserError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setUserError('Ocorreu erro ao cadastrar um usuário, tente novamenete');
        }
    }

    const ShowmodalTrue = async () => {
        setShowModal(true);
    }
    

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {msgError && <p>{msgError}</p>}
                {msgUserSuccess && <p>{msgUserSuccess}</p>}

                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={login} onChange={evento => setLogin(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button onClick={doLogin}>Login</button>
                <button onClick={ShowmodalTrue}>Criar um usuário</button>
            </div>
                <ModalCadastro 
                showModal={showModal}
                name={userName}
                email={userEmail}
                password={userPassword}
                errorMsg={userMsgError}
                closeModal={closeModal}
                doSave={doSave}
                setName={setUserName}
                setEmail={setEmail}
                setPassword={setUserPassword}
                />
        </div>

    )
}