import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const FattureFilter = ({ onFilter }) => {
    const token = useSelector(state => state.token.token)
    const [cliente, setCliente] = useState('');
    const [anno, setAnno] = useState('');
    const [statoFattura, setStatoFattura] = useState('');
    const [dataEmissione, setDataEmissione] = useState('');
    const [importoMin, setImportoMin] = useState('');
    const [importoMax, setImportoMax] = useState('');
    const [sortBy, setSortBy] = useState('numero');
    const [listaClienti, setListaClienti] = useState([])
    const [listaStatiFattura, setListaStatiFattura] = useState([])
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
    const retrieveStatiFauttra = async () => {
        try {
            const response = await fetch("http://localhost:3001/statofatture", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setListaStatiFattura(data)
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
        retrieveClienti()
        retrieveStatiFauttra()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            anno: anno ? parseInt(anno) : null,
            importoMin: importoMin ? parseInt(importoMin) : null,
            importoMax: importoMax ? parseInt(importoMax) : null,
            statoFattura: statoFattura || null,
            cliente: cliente || null,
            dataEmissione: dataEmissione || null,
            sortBy,
        });
    };

    return (
        <form onSubmit={handleSubmit} className='mx-2'>
            <div className='mb-2'>
                <label>Anno fattura: </label>
                <input
                    className='ms-2 py-0'
                    type="number"
                    value={anno}
                    onChange={(e) => setAnno(e.target.value)}
                    placeholder="Inserisci fatturato"
                />
            </div>
            <div className='mb-2'>
                <label>Cliente:</label>
                <select value={cliente} onChange={(e) => setCliente(e.target.value)} className='ms-2'>
                    <option value="">Seleziona il cliente</option>
                    {listaClienti.map((cliente) => (
                        <option key={cliente.clienteId} value={cliente.clienteId}>
                            {cliente.ragioneSociale}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-2'>
                <label>Data Emissione:</label>
                <input
                    className='ms-2'
                    type="date"
                    value={dataEmissione}
                    onChange={(e) => setDataEmissione(e.target.value)}
                />
            </div>
            <div className='mb-2'>
                <label>Stato fattura:</label>
                <select value={statoFattura} onChange={(e) => setStatoFattura(e.target.value)} className='ms-2'>
                    <option value="">Seleziona lo stato della fattura</option>
                    {listaStatiFattura.map((statoFattura) => (
                        <option key={statoFattura.statoFatturaId} value={statoFattura.statoFatturaId}>
                            {statoFattura.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-2'>
                <label>Importo minimo: </label>
                <input
                    className='ms-2 py-0'
                    type="number"
                    value={importoMin}
                    onChange={(e) => setImportoMin(e.target.value)}
                    placeholder="Inserisci fatturato"
                />
            </div>
            <div className='mb-2'>
                <label>Importo massimo: </label>
                <input
                    className='ms-2 py-0'
                    type="number"
                    value={importoMax}
                    onChange={(e) => setImportoMax(e.target.value)}
                    placeholder="Inserisci fatturato"
                />
            </div>
            <div className='mb-2'>
                <label>Ordina per:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='ms-2'>
                    <option value="numero">Numero Fattura</option>
                    <option value="data">Data di emissione</option>
                    <option value="importo">Importo</option>
                </select>
            </div>
            <Button type="submit">Filtra</Button>
        </form>
    );
};

export default FattureFilter;