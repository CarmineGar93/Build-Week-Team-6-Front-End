import { Button, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom'
import { SetTokenAction } from '../actions';

const FormR = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const userData = { username, password, email, nome, cognome };
        try {
            const response = await fetch("http://localhost:3001/utenti/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                alert("Registrazione avvenuta con successo!");
                const token = await response.json();
                dispatch(SetTokenAction(token.token))
                navigate("/login");
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center pb-3 vh-100">
            <Card className="p-4 shadow cardSign mb-3">
                <Card.Title className="mb-4 fs-2">Registrazione nuovo utente</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username (4-16 caratteri)"
                            required
                            minLength={4}
                            maxLength={16}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            pattern="^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&+=]).*$"
                            title="La password deve contenere almeno 8 caratteri, un numero, una lettera minuscola, una maiuscola e un carattere speciale"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNome">
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            required
                            minLength={2}
                            maxLength={40}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCognome">
                        <Form.Control
                            type="text"
                            placeholder="Cognome"
                            required
                            minLength={2}
                            maxLength={40}
                            value={cognome}
                            onChange={(e) => setCognome(e.target.value)}
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button
                            variant="primary"
                            type="submit"
                            className="btn-lg w-100 rounded-pill"
                        >
                            Registra
                        </Button>
                       </div>
                </Form>
            </Card>
        </Container>
    );
};

export default FormR;