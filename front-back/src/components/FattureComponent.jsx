import { useSelector } from "react-redux"
import OurNavbar from "./OurNavbar"
import { useEffect, useState } from "react"
import { Table } from 'react-bootstrap'

const FattureComponent = () => {
    const token = useSelector(state => state.token.token)
    const ruoli = useSelector(state => state.ruoli.ruoli)
    const [fatture, setFatture] = useState([])
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
    useEffect(() => {
        retrieveFatture()
    }, [])
    return (
        <>
            <OurNavbar />
            <h1 className="text-center mb-3">Lista Fatture</h1>
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