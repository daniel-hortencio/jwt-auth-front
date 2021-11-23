import { useState } from 'react'

import { api } from '../services/api'

import { useAuth } from '../contexts/Auth'

import LoginLayout from '../components/Layouts/Login'
import InputGroup from '../components/InputGroup'
import Button from '../components/Button'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [singInError, setSignInError] = useState(false)

    const { signIn } = useAuth()

    function handleSubmit(e) {
        e.preventDefault()

        api.post('/signin', { email, password })
            .then(({ data }) => {
                signIn(data)
            })
            .catch((err) => {
                console.log(err)

                setSignInError(true)
            })
    }

    return (
        <LoginLayout>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <InputGroup
                    id="user"
                    label={'User'}
                    placeholder="user@mail.com"
                    name="user"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setSignInError(false)
                    }}
                    style={{
                        marginBottom: '1rem'
                    }}
                    required
                />
                <InputGroup
                    id="password"
                    label={'Password'}
                    placeholder="123"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setSignInError(false)
                    }}
                    style={{
                        marginBottom: '1rem'
                    }}
                    required
                />
                <div
                    style={{
                        paddingTop: '0.5rem',
                        width: '100%'
                    }}
                >
                    <Button
                        type="submit"
                        className="full-width"
                        disabled={email === "" || password === ""}
                    >
                        Entrar
                    </Button>
                </div>
                {singInError &&
                    <p style={{
                        color: "#e34",
                        fontWeight: 'bold',
                        paddingTop: '0.5rem',
                        textAlign: 'center'
                    }}>
                        Usuário ou senha incorretos
                    </p>
                }

            </form>
        </LoginLayout>
    );
}

export default SignIn;
