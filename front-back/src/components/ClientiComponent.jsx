import { useEffect, useState } from "react"
import OurNavbar from "./OurNavbar"
import { useSelector } from "react-redux"
import { Card, Row, Col } from "react-bootstrap"
import ClientiFilter from "./ClientiFilter"

const ClientiComponent = () => {
    const token = useSelector(state => state.token.token)
    const [clienti, setClienti] = useState([])
    const retrieveClienti = async () => {
        const response = await fetch("http://localhost:3001/clienti", {
            headers: {
                /* "Content-Type": "application/json", */
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setClienti(data)
        }
    }
    const fetchClienti = async (filterParams) => {
        console.log(filterParams.dataInserimento)
        const stringaFatturatoAnnuale = filterParams.fatturatoAnnuale ? `?fatturatoAnnuale=${filterParams.fatturatoAnnuale}&` : ``;
        const stringaDataInserimento = filterParams.dataInserimento ? `?dataInserimento=${filterParams.dataInserimento}&` : ``;
        const stringaUltimoContatto = filterParams.dataUltimoContatto ? `?dataUltimoContatto=${filterParams.dataUltimoContatto}&` : ``;
        const stringaRagioneSociale = filterParams.ragioneSociale ? `?ragioneSociale=${filterParams.ragioneSociale}&` : ``;
        try {
            const response = await fetch("http://localhost:3001/clienti" + stringaFatturatoAnnuale + stringaDataInserimento + stringaUltimoContatto + stringaRagioneSociale, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data)
            setClienti(data)
        } catch (error) {
            console.error('Errore nel recupero dei clienti:', error);
        }
    };
    useEffect(() => {
        retrieveClienti()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <OurNavbar />
            <ClientiFilter onFilter={fetchClienti} />
            <h1 className="text-center mb-3">Lista clienti</h1>
            {
                clienti.map(cliente => {
                    return (
                        <Card key={cliente.clienteId} className="mb-2">
                            <Row className="p-1">
                                <Col xs={'auto'}>
                                    <img src={cliente.logoAziendale} alt="" width={100} height={100} />
                                </Col>
                                <Col xs={9} xl={10}>
                                    <h4>{cliente.ragioneSociale}</h4>
                                    <h6>Fatturato annuale: {cliente.fatturatoAnnuale} €</h6>
                                    <p className="m-0">Partita IVA: {cliente.partitaIva}</p>
                                    <p className="m-0">Email: {cliente.email} - Telefono: {cliente.telefono}</p>
                                    <p className="m-0">Indirizzo sede legale: {cliente.indirizzoSedeLegale.via} {cliente.indirizzoSedeLegale.civico}, {cliente.indirizzoSedeLegale.cap} {cliente.indirizzoSedeLegale.comune.nome}, {cliente.indirizzoSedeLegale.comune.provincia.sigla}</p>
                                    <p className="m-0">Data inserimento: {cliente.dataInserimento}</p>
                                    {cliente.dataUltimoContatto && <p className="m-0">Data ultimo contatto: {cliente.dataUltimoContatto}</p>}
                                </Col>
                            </Row>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default ClientiComponent