import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const token = useSelector(state => state.token.token)
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const retrieveUser = async () => {
        try {
            const response = await fetch("http://localhost:3001/utenti/me", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const userFromDb = await response.json();
                console.log(userFromDb)
                setUser(userFromDb)
            } else {
                alert("Errore");
            }
        } catch (error) {
            console.log("Errore:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else {
            retrieveUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {
                user && <div className=" text-center">
                    <h1>Welcome {user.nome} {user.cognome}</h1>
                    <img src={user.avatarUrl} alt="" className=" w-25"></img>
                </div>
            }

        </>


    )
}

export default Home