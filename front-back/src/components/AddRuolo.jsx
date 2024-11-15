import { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function AddRuolo({ show, handleClose, listaRuoli, listaUtenti }) {
    const token = useSelector(state => state.token.token)
    const [utenteSelezionato, setUtenteSelezionato] = useState("")
    const [ruoloDaAggiungere, setRuoloDaAggiungere] = useState({
        nome: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3001/utenti/${utenteSelezionato}/ruolo`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ruoloDaAggiungere)
            })
            if (response.ok) {
                alert("Ruolo aggiunto con successo")
                setRuoloDaAggiungere({
                    nome: ""
                })
                setUtenteSelezionato("")
                handleClose()
            } else {
                const error = await response.json()
                alert(error.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Form di Registrazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Utente</Form.Label>
                                <Form.Select
                                    value={utenteSelezionato}
                                    onChange={(e) => {
                                        setUtenteSelezionato(e.target.value);
                                    }}
                                >
                                    <option value="">Seleziona l'utente</option>
                                    {listaUtenti.map((utente) => (
                                        <option key={utente.utenteId} value={utente.utenteId}>
                                            {utente.nome} {utente.cognome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Ruolo</Form.Label>
                                <Form.Select
                                    value={ruoloDaAggiungere.nome}
                                    onChange={(e) => {
                                        setRuoloDaAggiungere({
                                            ...ruoloDaAggiungere,
                                            nome: e.target.value
                                        });
                                    }}
                                >
                                    <option value="">Seleziona il ruolo</option>
                                    {listaRuoli.map((ruolo) => (
                                        <option key={ruolo.ruoloId} value={ruolo.nome}>
                                            {ruolo.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleClose()
                }}>
                    Chiudi
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    Invia
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddRuolo