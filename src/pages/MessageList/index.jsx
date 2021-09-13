
const MessageList = () => {
    return (
        <>
            <div>
                <div className="list-container">
                    <div>
                        <h1 className="body-title">Mensagens</h1>
                        <button>Pesquisar</button>
                        <button>Nova Mensagem</button>
                    </div>
                    <div>
                        <label for="gatilho">Gatilho:</label>
                        <input type="text" id="gatilho" name="gatilho" />
                        <label for="canal">Canal:</label>
                        <input type="text" id="canal" name="canal" />
                        <label for="timer">Timer:</label>
                        <input type="text" id="timer" name="timer" />
                    </div>
                    <div>
                        <table border="1">
                            <tr>
                                <td>Gatilho</td>
                                <td>Canal</td>
                                <td>Tempo</td>
                                <td>Ações</td>
                            </tr>
                            <tr>
                                <td>abertura_conta</td>
                                <td>sms</td>
                                <td>15:00</td>
                                <td><button>Ver mensagem</button></td>
                            </tr>
                            <tr>
                                <td>fez_pix</td>
                                <td>sms</td>
                                <td>5:00</td>
                                <td><button>Ver mensagem</button></td>
                            </tr>
                            <tr>
                                <td>abertura_conta</td>
                                <td>whatsapp</td>
                                <td>73:00</td>
                                <td><button>Ver mensagem</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
}

export default MessageList;
