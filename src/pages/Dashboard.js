import { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GoCloudDownload, RiLogoutBoxLine } from 'react-icons/all'

import { api } from "../services/api";

import { useAuth } from '../contexts/Auth'
import { getNow } from '../utils/getNow'

import DashboardLayout from '../components/Layouts/Dashboard';
import Button from '../components/Button'

function Dashboard() {
  const { push } = useHistory()
  const { historicJWT, signOut, newHistoricEvent } = useAuth()
  const [sessionExpired, setSessionExpired] = useState(false)
  const [isfetchingData, setIsFetchingData] = useState(false)

  const listRef = useRef(null)

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.offsetHeight

  }, [historicJWT])

  function getUserInfos() {
    setIsFetchingData(true)

    api.get('/userData')
      .then((res) => {
        const { data = undefined } = res

        if (data) {
          newHistoricEvent({
            time: getNow(),
            data,
            message: "O backend retornou suas informações privadas com sucesso!"
          })
        } else {
          const { status } = res.response
          const { message } = res.response.data

          if (status === 401) {
            setSessionExpired(true)

            newHistoricEvent({
              time: getNow(),
              refreshTokenExpired: true,
              message
            })
          }
        }

      })
      .catch((err) => {
        const { status } = err.response
        const { message } = err.response.data

        if (status === 401) {
          newHistoricEvent({
            time: getNow(),
            message
          })
        }

      })
      .finally(() => {
        setIsFetchingData(false)
      })
  }

  function logout() {
    signOut()
    push('/')
  }

  return (
    <DashboardLayout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: '1rem'
      }}>
        <Button
          onClick={getUserInfos}
          style={{ marginRight: '1rem' }}
          disabled={sessionExpired}
          isLoading={isfetchingData}
        >
          <GoCloudDownload color="#fff" size={24} /> Obter suas informações privadas
        </Button>

        <Button onClick={logout}>
          <RiLogoutBoxLine color="#fff" size={24} /> Sair
        </Button>
      </div>

      <ul
        ref={listRef}
        style={{
          margin: '1rem 0',
          flex: 'auto',
          overflowY: 'scroll',
          paddingRight: '0.5rem',
          maxHeight: '80vh'
        }}
      >

        {historicJWT.map((event, index) => (
          <li key={index} style={{
            display: 'flex',
            marginBottom: '1rem',
            background: '#fff',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>

            <div style={{ width: '8rem' }}>
              <div>{event.time.day}/{event.time.month}</div>
              <div>{event.time.hours}:{event.time.minutes}:{event.time.seconds}</div>
            </div>

            <div style={{
              width: '100%',
              borderLeft: 'solid 2px #eee',
              paddingLeft: '1rem'
            }}>

              {!!event.data?.tokenWasRefreshed &&
                <h2 style={{
                  wordBreak: 'break-word',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  fontSize: '1.2rem',
                  color: "royalblue"
                }}>
                  Seu token foi atualizado!
                </h2>
              }

              {event.message &&
                <h2 style={{
                  wordBreak: 'break-word',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  fontSize: '1.2rem'
                }}>
                  {event.message}
                </h2>
              }

              {event.token && event.refreshToken &&
                <>
                  <p style={{ wordBreak: 'break-word' }}>
                    <strong>Token:</strong> {event.token}
                  </p>
                  <p style={{ wordBreak: 'break-word' }}>
                    <strong>RefreshToken:</strong> {event.refreshToken.id}
                  </p>
                </>
              }

              {event.data &&
                <div style={{ display: 'flex' }}>
                  <img
                    src={event.data.avatar}
                    style={{
                      objectFit: 'cover',
                      width: '6rem',
                      height: '6rem',
                      borderRadius: '50%',
                      marginRight: '1rem'
                    }}
                  />
                  <div style={{ wordBreak: 'break-word' }}>
                    <p><strong>Nome: </strong> {event.data.user}</p>
                    <p><strong>Email: </strong>{event.data.email}</p>
                    <p><strong>Tel: </strong>{event.data.tel}</p>
                    <p><strong>Salário: </strong>R$ {event.data.payment}</p>
                  </div>
                </div>
              }

              {event.refreshTokenExpired &&
                <Button onClick={logout}>
                  <RiLogoutBoxLine color="#fff" size={24} /> Voltar ao Login
                </Button>
              }
            </div>

          </li>
        ))}

      </ul>
    </DashboardLayout>
  );
}

export default Dashboard;
