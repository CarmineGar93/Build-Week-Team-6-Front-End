import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CreazioneCliente({ show, handleClose }) {
    const token = useSelector(state => state.token.token)
    const [provinciaOpt, setProvinciaOpt] = useState([])
    const [provincia, setProvincia] = useState('')
    const [comuniOpt, setComuniOpt] = useState([])
    const [indirizzo, setIndirizzo] = useState({
        via: "",
        civico: "",
        localita: "",
        cap: "",
        comuneId: ""

    })
    const [cliente, setCliente] = useState({
        ragioneSociale: "",
        partitaIva: "",
        email: "",
        pec: "",
        telefono: "",
        emailContatto: "",
        nomeContatto: "",
        cognomeContatto: "",
        telefonoContatto: "",
        indirizzoSedeLegale: "",
        indirizzoSedeOperativa: "",
        tipoCliente: ""
    })
    const salvaIndirizzo = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/indirizzi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(indirizzo)
            })
            if (response.ok) {
                const data = await response.json()
                setCliente({
                    ...cliente,
                    indirizzoSedeLegale: data.indirizzoId,
                    indirizzoSedeOperativa: data.indirizzoId
                })
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    const salvaCliente = async () => {
        try {
            const response = await fetch("http://localhost:3001/clienti", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cliente)
            })
            if (response.ok) {
                alert("Cliente salvato con successo")
                setProvincia('')
                setIndirizzo({
                    via: "",
                    civico: "",
                    localita: "",
                    cap: "",
                    comuneId: ""
                })
                setCliente({
                    ragioneSociale: "",
                    partitaIva: "",
                    email: "",
                    pec: "",
                    telefono: "",
                    emailContatto: "",
                    nomeContatto: "",
                    cognomeContatto: "",
                    telefonoContatto: "",
                    indirizzoSedeLegale: "",
                    indirizzoSedeOperativa: "",
                    tipoCliente: ""
                })
                handleClose()
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    const retrieveProvince = async () => {
        try {
            const response = await fetch("http://localhost:3001/province", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setProvinciaOpt(data)
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    const retrieveComuni = async (prov) => {
        try {
            const response = await fetch("http://localhost:3001/comuni?provinciaNome=" + prov, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setComuniOpt(data)
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    useEffect(() => {
        retrieveProvince()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (cliente.indirizzoSedeLegale) {
            salvaCliente()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cliente.indirizzoSedeLegale])
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Form di Registrazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Ragione Sociale</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la ragione sociale" value={cliente.ragioneSociale} onChange={(e) => setCliente({
                            ...cliente,
                            ragioneSociale: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Partita IVA</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la partita IVA" value={cliente.partitaIva} onChange={(e) => setCliente({
                            ...cliente,
                            partitaIva: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo Cliente</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la partita IVA" value={cliente.tipoCliente} onChange={(e) => setCliente({
                            ...cliente,
                            tipoCliente: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Inserisci l'email" value={cliente.email} onChange={(e) => setCliente({
                            ...cliente,
                            email: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>PEC</Form.Label>
                        <Form.Control type="email" placeholder="Inserisci l'email PEC" value={cliente.pec} onChange={(e) => setCliente({
                            ...cliente,
                            pec: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="tel" placeholder="Inserisci il numero di telefono" value={cliente.telefono} onChange={(e) => setCliente({
                            ...cliente,
                            telefono: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email Contatto</Form.Label>
                        <Form.Control type="email" placeholder="Inserisci l'email del contatto" value={cliente.emailContatto} onChange={(e) => setCliente({
                            ...cliente,
                            emailContatto: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome Contatto</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il nome del contatto" value={cliente.nomeContatto} onChange={(e) => setCliente({
                            ...cliente,
                            nomeContatto: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cognome Contatto</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il cognome del contatto" value={cliente.cognomeContatto} onChange={(e) => setCliente({
                            ...cliente,
                            cognomeContatto: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Telefono Contatto</Form.Label>
                        <Form.Control type="tel" placeholder="Inserisci il telefono del contatto" value={cliente.telefonoContatto} onChange={(e) => setCliente({
                            ...cliente,
                            telefonoContatto: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Via</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la via" value={indirizzo.via} onChange={(e) => setIndirizzo({
                            ...indirizzo,
                            via: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Civico</Form.Label>
                        <Form.Control type="number" placeholder="Inserisci il civico" value={indirizzo.civico} onChange={(e) => setIndirizzo({
                            ...indirizzo,
                            civico: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>CAP</Form.Label>
                        <Form.Control type="number" placeholder="Inserisci il CAP" value={indirizzo.cap} onChange={(e) => setIndirizzo({
                            ...indirizzo,
                            cap: e.target.value
                        })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Località</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci la località" value={indirizzo.localita} onChange={(e) => setIndirizzo({
                            ...indirizzo,
                            localita: e.target.value
                        })} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Select
                                    value={provincia}
                                    onChange={(e) => {
                                        setProvincia(e.target.value)
                                        retrieveComuni(e.target.value);
                                    }}
                                >
                                    <option value="">Seleziona la provincia</option>
                                    {provinciaOpt.map((prov) => (
                                        <option key={prov.provinciaId} value={prov.nome}>
                                            {prov.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Comune</Form.Label>
                                <Form.Select
                                    value={indirizzo.comuneId}
                                    onChange={(e) => setIndirizzo({
                                        ...indirizzo,
                                        comuneId: e.target.value
                                    })}
                                    disabled={!provincia}
                                >
                                    <option value="">Seleziona il comune</option>
                                    {provincia && comuniOpt.map((com) => (
                                        <option key={com.comuneId} value={com.comuneId}>
                                            {com.nome}
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
                    setProvincia('')
                    setIndirizzo({
                        via: "",
                        civico: "",
                        localita: "",
                        cap: "",
                        comuneId: ""
                    })
                    setCliente({
                        ragioneSociale: "",
                        partitaIva: "",
                        email: "",
                        pec: "",
                        telefono: "",
                        emailContatto: "",
                        nomeContatto: "",
                        cognomeContatto: "",
                        telefonoContatto: "",
                        indirizzoSedeLegale: "",
                        indirizzoSedeOperativa: "",
                        tipoCliente: ""
                    })
                    handleClose()
                }}>
                    Chiudi
                </Button>
                <Button variant="primary" onClick={(e) => salvaIndirizzo(e)}>
                    Invia
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreazioneCliente