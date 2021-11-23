import Fade from 'react-reveal/Fade';

import Logo from '../../Logo'

import './styles.css'

const Login = ({ children }) => {
    return (
        <div className="login-wrapper">
            <Fade big>
                <div className="login-wrapper-background" />
            </Fade>
            <Fade bottom>
                <div
                    style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '1rem',
                        width: '100%',
                        maxWidth: '320px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Logo />

                    <h2
                        style={{
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            borderTop: 'solid 2px #eee',
                            paddingTop: '1rem',
                            margin: '1rem 0 2rem 0',
                            color: '#888'
                        }}
                        className="full-width"
                    >
                        Acesse seu painel
                    </h2>

                    <div className="full-width">
                        {children}
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default Login