import Styles from './NavBar.module.css'

export default function NavBar() {

    return (
        <nav className={Styles.navMayor}>
            <img className={Styles.patita1} src='/assets/images/patita.svg' alt='patita2' />
            <h1> Luthien  Pet Travels
                < br /> Traslado de mascotas</h1>
            <img className={Styles.patita2} src='/assets/images/patita.svg' alt='patita1' />
        </nav>
    )
}