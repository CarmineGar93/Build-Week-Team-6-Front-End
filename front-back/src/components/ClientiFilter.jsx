import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ClientiFilter = ({ onFilter }) => {
    const [fatturatoAnnuale, setFatturatoAnnuale] = useState('');
    const [inserimento, setInserimento] = useState('');
    const [ultimoContatto, setUltimoContatto] = useState('');
    const [ragioneSociale, setRagioneSociale] = useState('');
    const [sortBy, setSortBy] = useState('provincia');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            fatturatoAnnuale: fatturatoAnnuale ? parseFloat(fatturatoAnnuale) : null,
            inserimento: inserimento || null,
            ultimoContatto: ultimoContatto || null,
            ragioneSociale: ragioneSociale || null,
            sortBy,
        });
    };

    return (
        <form onSubmit={handleSubmit} className='mx-2'>
            <div className='mb-2'>
                <label>Fatturato Annuale:</label>
                <input
                    className='ms-2 py-0'
                    type="number"
                    value={fatturatoAnnuale}
                    onChange={(e) => setFatturatoAnnuale(e.target.value)}
                    placeholder="Inserisci fatturato"
                />
            </div>
            <div className='mb-2'>
                <label>Data di Inserimento:</label>
                <input
                    className='ms-2'
                    type="date"
                    value={inserimento}
                    onChange={(e) => setInserimento(e.target.value)}
                />
            </div>
            <div className='mb-2'>
                <label>Data Ultimo Contatto:</label>
                <input
                    className='ms-2'
                    type="date"
                    value={ultimoContatto}
                    onChange={(e) => setUltimoContatto(e.target.value)}
                />
            </div>
            <div className='mb-2'>
                <label>Ragione Sociale:</label>
                <input
                    className='ms-2 py-0'
                    type="text"
                    value={ragioneSociale}
                    onChange={(e) => setRagioneSociale(e.target.value)}
                    placeholder="Inserisci ragione sociale"
                />
            </div>
            <div className='mb-2'>
                <label>Ordina per:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='ms-2'>
                    <option value="provincia">Provincia</option>
                    <option value="fatturatoAnnuale">Fatturato Annuale</option>
                    <option value="dataInserimento">Data Inserimento</option>
                    <option value="dataUltimoContatto">Data Ultimo Contatto</option>
                    <option value="ragioneSociale">Ragione Sociale</option>
                </select>
            </div>
            <Button type="submit">Filtra</Button>
        </form>
    );
};

export default ClientiFilter;