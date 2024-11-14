import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Fatturato Annuale:</label>
                <input
                    type="number"
                    value={fatturatoAnnuale}
                    onChange={(e) => setFatturatoAnnuale(e.target.value)}
                    placeholder="Inserisci fatturato"
                />
            </div>
            <div>
                <label>Data di Inserimento:</label>
                <input
                    type="date"
                    value={inserimento}
                    onChange={(e) => setInserimento(e.target.value)}
                />
            </div>
            <div>
                <label>Data Ultimo Contatto:</label>
                <input
                    type="date"
                    value={ultimoContatto}
                    onChange={(e) => setUltimoContatto(e.target.value)}
                />
            </div>
            <div>
                <label>Ragione Sociale:</label>
                <input
                    type="text"
                    value={ragioneSociale}
                    onChange={(e) => setRagioneSociale(e.target.value)}
                    placeholder="Inserisci ragione sociale"
                />
            </div>
            <div>
                <label>Ordina per:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="provincia">Provincia</option>
                    <option value="fatturatoAnnuale">Fatturato Annuale</option>
                    <option value="dataInserimento">Data Inserimento</option>
                    <option value="dataUltimoContatto">Data Ultimo Contatto</option>
                    <option value="ragioneSociale">Ragione Sociale</option>
                </select>
            </div>
            <button type="submit">Filtra</button>
        </form>
    );
};

export default ClientiFilter;