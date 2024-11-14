import { Navbar, Container, Nav } from 'react-bootstrap'
const OurNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-black mb-3">
            <Container>
                <Navbar.Brand href="#home" className='text-white'>EpiEnergia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className='text-white'>Clienti</Nav.Link>
                        <Nav.Link href="#link" className='text-white'>Fatture</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default OurNavbar