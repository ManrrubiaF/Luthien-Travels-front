import Styles from './Home.module.css'
import Comments from '../Comments/Comments';
import { useEffect, useLayoutEffect, useState } from 'react';

export default function Home() {

    const [imageContainer, setImageContainer] = useState<HTMLDivElement>();

    useLayoutEffect(()=>{
        const getDiv = document.querySelector(`.${Styles.imagesContainer}`) as HTMLDivElement;
        if(getDiv){
            setImageContainer(getDiv)
        }
    },[])

    useEffect(()=>{
        handleCarousel();
    },[imageContainer])

    const handleCarousel = () => {
        
        if (imageContainer) {
            const images = Array.from(imageContainer.querySelectorAll('img')) as HTMLImageElement[];
            let currentIndex = 0;

            function updateSlider() {
                images.forEach((image, imgIndex) => {
                    if (imgIndex === currentIndex) {
                        image.style.display = 'block';
                        image.style.transform = 'translateX(0)';
                    } else {
                        image.style.display = 'none';
                        image.style.transform = 'translateX(100%)';
                    }
                });
            }

            function nextImage() {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlider();
            }

            updateSlider();
            setInterval(nextImage, 4000);
        }
    }

    return (
        <div className={Styles.divMayor}>
            <div className={Styles.imagesContainer}>
                <img src='/assets/images/greta.webp' alt='image1' />
                <img src='/assets/images/camioneta.webp' alt='image2' />
                <img src='/assets/images/camioneta-abierta.webp' alt='image3' />
                <img src='/assets/images/camioneta-ab-2.webp' alt='image4' />
            </div>
            <div className={Styles.allContainer}>
                <div className={Styles.detailsContainer}>
                    <div className={Styles.detail}>
                        <h1>¿Quiénes Somos?</h1>
                        <p>Somos una empresa dedicada exclusivamente al transporte de mascotas. Nuestra pasión por los animales nos impulsa a brindar un servicio seguro y cómodo para que tus queridos compañeros peludos viajen con tranquilidad, al igual que sus dueños. Por qué dedicarnos al traslado de mascotas de forma exclusiva? Simplemente porque amamos a los animales tanto como seguramente vos lo haces.</p>
                    </div>
                    <div className={Styles.detail}>
                        <h1>¿Nuestro Propósito?</h1>
                        <p>Nuestro propósito es garantizar que tus mascotas reciban el mejor cuidado durante sus desplazamientos. Nos enorgullece ofrecer un servicio confiable y amigable que se adapta a las necesidades de perros de todas las razas y temperamentos, siempre priorizando su bienestar.</p>
                    </div>
                    <div className={Styles.detail}>
                        <h1>Lo Que Te Ofrecemos</h1>
                        <p>En Luthien Pet Travels, ofrecemos un servicio exclusivo con unidades equipadas con doble puerta lateral y asientos traseros triplaza. Aceptamos perros de todos los tamaños, razas y personalidades, siempre y cuando sean amigables. Para perros que puedan mostrar agresividad, exigimos el uso de correa y bozal por razones de seguridad del conductor.</p>
                    </div>
                </div>
                <Comments />                
            </div>
            <div className={Styles.whatsappContainer}>
                <a href='https://wa.me/541153365187' target='Blank'><img src='/assets/icons/whatsapp.svg' alt='gmail icon' className={Styles.whatsapp} /></a>
            </div>
        </div>
    )
}
