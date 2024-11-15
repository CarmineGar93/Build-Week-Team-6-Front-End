import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Row, Col, Form, Button } from 'react-bootstrap'

function CreazioneFatture({ show, handleClose, listaClienti }) {
    const token = useSelector(state => state.token.token)
    const [fattura, setFattura] = useState({
        importo: "",
        clienteId: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3001/fatture', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fattura)
            })
            if (response.ok) {
                alert("Fattura salvata con successo")
                setFattura({
                    importo: "",
                    clienteId: ""
                })
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
                    <Form.Group className="mb-3">
                        <Form.Label>Importo</Form.Label>
                        <Form.Control type="number" placeholder="Inserisci l'importo" value={fattura.importo} onChange={(e) => setFattura({
                            ...fattura,
                            importo: e.target.value
                        })} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Select
                                    value={fattura.clienteId}
                                    onChange={(e) => {
                                        setFattura({
                                            ...fattura,
                                            clienteId: e.target.value
                                        });
                                    }}
                                >
                                    <option value="">Seleziona il cliente</option>
                                    {listaClienti.map((cliente) => (
                                        <option key={cliente.clienteId} value={cliente.clienteId}>
                                            {cliente.ragioneSociale}
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

export default CreazioneFatture