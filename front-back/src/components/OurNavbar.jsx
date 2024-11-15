import { Navbar, Container, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const OurNavbar = () => {
    const ruoli = useSelector(state => state.ruoli.ruoli)
    return (
        <Navbar expand="lg" className="bg-black mb-3">
            <Container>
                <Link href="#home" className='text-white navbar-brand' to={"/home"}>EpiEnergia</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/clienti"} className='nav-link text-white'>Clienti</Link>
                        <Link to={"/fatture"} className='nav-link text-white'>Fatture</Link>
                        {
                            ruoli.some(ruolo => ruolo === 'ADMIN') && <Link to={"/register"} className='nav-link text-white'>Registra Utente</Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default OurNavbar