import { useState, useRef } from "react";
import { useHistory } from "react-router";
import Modal from "../Modal";


const MessageList = () => {

    const [showModal, setShowModal] = useState(false);

    const history = useHistory()

    const openModal = () => {
        console.log("show")
        setShowModal(true)

    }


    // const toggleDropdown = () => {
    //     console.log("show");
    //     //se clicar no botão, modal aparece
    //     setDropdown("show");
    //     document.body.addEventListener("click", closeDropdown);
    //   }

    //   const closeDropdown = event => {
    //     event.stopPropagation(); //impede de executar listeners dos filhos
    //     const contain = modalRef.current.contains(event.target);
    //     if (!contain) { //se clicar fora do modal, ele DESaparece
    //       console.log("hidden");
    //       setDropdown("");
    //       document.body.removeEventListener("click", closeDropdown);
    //     }
    //   };

    return (
        <>

            <div className="message-list-top-container">
                <h1 className="body-title">Mensagens</h1>
                <span>
                    <button>Pesquisar</button>
                    <button onClick={() => history.push("/message")}>Nova Mensagem</button>
                </span>
            </div>

            <div className="message-list-filter-container">
                <div className="message-filter-item">
                    <label htmlFor="trigger">Gatilho:</label><br />
                    <input type="text" id="trigger" name="trigger" />
                </div>
                <div className="message-filter-item">
                    <label htmlFor="channel">Canal:</label><br />
                    <input type="text" id="channel" name="channel" />
                </div>
                <div className="message-filter-item">
                    <label htmlFor="timer">Timer:</label><br />
                    <input type="text" id="timer" name="timer" />
                </div>
            </div>

            <div>
                <table border="1" id="message-list-table">
                    <tbody>
                        <tr>
                            <th>Gatilho</th>
                            <th>Canal</th>
                            <th>Tempo</th>
                            <th>Ações</th>
                        </tr>
                        <tr>
                            <td>abertura_conta</td>
                            <td>sms</td>
                            <td>15:00</td>
                            <td><button onClick={openModal}>Ver mensagem</button></td>
                        </tr>
                        <tr>
                            <td>fez_pix</td>
                            <td>sms</td>
                            <td>5:00</td>
                            <td><button onClick={openModal}>Ver mensagem</button></td>
                        </tr>
                        <tr>
                            <td>abertura_conta</td>
                            <td>whatsapp</td>
                            <td>73:00</td>
                            <td><button onClick={openModal}>Ver mensagem</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="portal"></div>

            {showModal ? <Modal setShowModal={setShowModal} /> : null}





        </>
    );
}

export default MessageList;




