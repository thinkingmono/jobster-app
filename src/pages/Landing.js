import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt='Jobster Logo' className='logo' />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>I'm baby listicle poke tofu squid direct trade tote bag. Austin microdosing small batch, authentic cray lomo everyday carry tattooed fit master cleanse shoreditch.</p>
                    <button type="button" className='btn btn-hero'>Login/Register</button>
                </div>
                <img src={main} alt='Job Hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing