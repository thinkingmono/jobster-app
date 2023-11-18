import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>I'm baby listicle poke tofu squid direct trade tote bag. Austin microdosing small batch, authentic cray lomo everyday carry tattooed fit master cleanse shoreditch.</p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt='Job Hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing