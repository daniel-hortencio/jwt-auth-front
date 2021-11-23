import Logo from '../../Logo'

const Dashboard = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
        }}>
            <div style={{
                background: 'white',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Logo />

                <h2
                    style={{
                        borderLeft: "solid 2px #eee",
                        marginLeft: '1rem',
                        paddingLeft: '1rem',
                        color: '#888'
                    }}
                >
                    Dashboard
                </h2>
            </div>

            <div style={{
                padding: '1rem'
            }}>
                {children}
            </div>
        </div>
    )
}

export default Dashboard