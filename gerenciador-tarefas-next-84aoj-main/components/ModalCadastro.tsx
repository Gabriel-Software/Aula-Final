//Ref
import { NextPage } from "next";
import {Modal} from 'react-bootstrap';
type UserModalProps = {
    name : string,
    email : string
    password : string
    setName(s : string) : void
    setEmail(s : string) : void
    setPassword(s : string) : void
    doSave() : void
    closeModal() : void
    showModal: boolean
    errorMsg : string
}

export const ModalCadastro : NextPage<UserModalProps> = ({ 
    showModal,
    name,
    email,
    password,
    errorMsg,
    closeModal,
    doSave,
    setName,
    setEmail,
    setPassword
}) => {
    return (
        <Modal
            show={showModal}
            onHide={() => closeModal()}
            className="container-modal">
            <Modal.Body>
                    <p>Cadastrar um novo usuário</p>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <input type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <input type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
            </Modal.Body>
            <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={doSave}>Cadastrar</button>
                        <span onClick={() => closeModal()}>Cancelar</span>
                    </div>
            </Modal.Footer>
        </Modal>
    );
}
