import { useSelector } from "react-redux"
import OurNavbar from "./OurNavbar"
import { useEffect, useState } from "react"
import { Table, Button } from 'react-bootstrap'
import FattureFilter from "./FattureFilter"
import CreazioneFatture from "./CreazioneFatture"

const FattureComponent = () => {
    const token = useSelector(state => state.token.token)
    const ruoli = useSelector(state => state.ruoli.ruoli)
    const [listaClienti, setListaClienti] = useState([])
    const [fatture, setFatture] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const retrieveClienti = async () => {
        try {
            const response = await fetch("http://localhost:3001/clienti", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setListaClienti(data)
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    const retrieveFatture = async () => {
        try {
            const response = await fetch("http://localhost:3001/fatture?size=100", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setFatture(data.content)
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    const fetchFattureFiltered = async (filterParams) => {
        const stringaAnno = filterParams.anno ? `anno=${filterParams.anno}&` : ``;
        const stringaDataEmissione = filterParams.dataEmissione ? `data=${filterParams.dataEmissione}&` : ``;
        const stringaStatoFattura = filterParams.statoFattura ? `statoId=${filterParams.statoFattura}&` : ``;
        const stringaCliente = filterParams.cliente ? `clienteId=${filterParams.cliente}&` : ``;
        const stringaImportoMax = filterParams.importoMax ? `importoMax=${filterParams.importoMax}&` : ``;
        const stringaImportoMin = filterParams.importoMin ? `importoMin=${filterParams.importoMin}&` : ``;
        const stringaSortBy = filterParams.sortBy ? `sortBy=${filterParams.sortBy}&` : ``;
        try {
            const response = await fetch("http://localhost:3001/fatture?" + stringaAnno + stringaDataEmissione + stringaStatoFattura + stringaCliente + stringaImportoMax + stringaImportoMin + stringaSortBy, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data)
            setFatture(data.content)
        } catch (error) {
            console.error('Errore nel recupero dei clienti:', error);
        }
    };
    useEffect(() => {
        retrieveClienti()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (!show) {
            retrieveFatture()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])
    return (
        <>
            <OurNavbar />
            <FattureFilter onFilter={fetchFattureFiltered} listaClienti={listaClienti} />
            <h1 className="text-center mb-3">Lista Fatture</h1>
            {
                ruoli.some(ruolo => ruolo === "ADMIN" || ruolo === "CONTABILE") && (
                    <div className="text-center">
                        <Button className="mb-3" onClick={() => handleShow()}>Aggiungi una nuova fattura</Button>
                    </div>
                )
            }
            <CreazioneFatture show={show} handleClose={handleClose} listaClienti={listaClienti} />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Numero fattura</th>
                        <th>Cliente</th>
                        <th>Data emissione</th>
                        <th>Stato</th>
                        <th>Importo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fatture.map(fattura => {
                            return (
                                <tr key={fattura.fatturaId}>
                                    <td>{fattura.numero}</td>
                                    <td>{fattura.cliente.ragioneSociale}</td>
                                    <td>{fattura.data}</td>
                                    <td>{fattura.statoFattura.nome}</td>
                                    <td>€ {fattura.importo}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </>
    )
}

export default FattureComponent