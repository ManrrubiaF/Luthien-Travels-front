import Styles from './NavBar.module.css'

export default function NavBar() {

    return (
        <nav className={Styles.navMayor}>
            <img className={Styles.logo} src='/logo.jpg' alt='logo' />
            <h1> Luthien  Pet Travels
                < br /> Traslado de mascotas</h1>
        </nav>
    )
}