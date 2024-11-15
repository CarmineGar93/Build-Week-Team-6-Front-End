import { useSelector } from "react-redux"
import OurNavbar from "./OurNavbar"
import { useEffect, useState } from "react"
import { Card, Row, Col, Button } from 'react-bootstrap'
import AddRuolo from "./AddRuolo"
import { useNavigate } from "react-router-dom"

function UtenteComponent() {
    const token = useSelector(state => state.token.token)
    const [utenti, setUtenti] = useState([])
    const [ruoliDb, setRuoliDb] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
    const retrieveUtenti = async () => {
        try {
            const response = await fetch("http://localhost:3001/utenti?size=1000", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setUtenti(data.content)
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    const cancellaRuolo = async (utenteSelezionato, ruolo) => {
        const ruoloDaEliminare = {
            nome: ruolo
        }
        const answer = window.confirm('Sei sicuro?')
        if (answer) {
            try {
                const response = await fetch(`http://localhost:3001/utenti/${utenteSelezionato}/ruolo`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ruoloDaEliminare)
                })
                if (response.ok) {
                    alert("Ruolo cencellato con successo")
                    retrieveUtenti()

                } else {
                    const error = await response.json()
                    alert(error.message)
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    const retrieveRuoli = async () => {
        try {
            const response = await fetch("http://localhost:3001/ruoloUtenti", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setRuoliDb(data)
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
        retrieveRuoli()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (!show) {
            retrieveUtenti()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])
    return (
        <>
            <OurNavbar />
            <h1 className="text-center mb-3">Lista Utenti</h1>
            <div className="text-center">
                <Button onClick={() => handleShow()} className="me-3">Aggiungi ruolo</Button>
                <Button onClick={(e) => { navigate("/register") }}>Registra nuovo utente</Button>
            </div>
            <AddRuolo show={show} handleClose={handleClose} listaRuoli={ruoliDb} listaUtenti={utenti} />

            {
                utenti.map(utente => {
                    return (
                        <Card key={utente.utenteId} className="m-2">
                            <Row className="p-1">
                                <Col xs={'auto'}>
                                    <img src={utente.avatarUrl} alt="" width={100} height={100} />
                                </Col>
                                <Col xs={9} xl={10}>
                                    <h4>{utente.nome} {utente.cognome}</h4>
                                    <p>Email: {utente.email}</p>
                                    <ul>
                                        {utente.ruoli.map(ruolo => {
                                            return <li key={ruolo.ruoloId} className="mb-2">{ruolo.nome} {utente.ruoli.length > 1 && <Button variant="danger" onClick={(e) => cancellaRuolo(utente.utenteId, ruolo.nome)}>Cancella ruolo</Button>} </li>
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default UtenteComponent