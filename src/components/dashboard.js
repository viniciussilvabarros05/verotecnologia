
import styles from "../styles/dashboard.module.scss"
import { VscFilePdf } from 'react-icons/vsc'
import { BiRefresh } from 'react-icons/bi'

import { useState } from "react"
import Swal from 'sweetalert2'
import { makeRelatorio } from '../services/pdfMake'


export function Dashboard(props) {

    const [call, setCall] = useState([])

    let callFilted = call.filter(item => item.estado.toLowerCase().includes(props.callFilter))

    function setArrayCall() {
        setInterval(() => {
            fetch("http://191.252.93.122/desafio-front-end/api/index.php")
                .then((response) => response.json())
                .then(json => {
                    setCall(json)
                })

        }, 60000)
    }
    function updateState() {

        let icon = 'success'
        let text = 'Estado mudado'
        fetch("http://191.252.93.122/desafio-front-end/api/update.php",)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({ title: response.status, icon, text: text })
                }
                return response.json()
            })
            .then(json => {

                if (!(json.estado && json.id)) {
                    icon = 'error'
                    text = "Erro ao atualizar estado"
                    Swal.fire({ title: 500, icon, text: text })
                }

            })
    }


    useState(() => {
        setArrayCall()
    }, [call])

    useState(() => {
        fetch("http://191.252.93.122/desafio-front-end/api/index.php")
            .then((response) => response.json())
            .then(json => {
                setCall(json)
            })
    }, [])

    return (
        <>


            <main className={styles.dashboard}>

                <div className={styles.navBar}>
                    <button onClick={() => makeRelatorio(call)}>
                        <VscFilePdf size="24" />
                        Emitir relatório
                    </button>
                </div>
                <table>

                    <thead>
                        <th>ID</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Estado</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {callFilted.map((item) => {

                            return (

                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td> {item.origem}</td>
                                    <td> {item.destino}</td>
                                    <td className={
                                        item.estado === "chamando" ?
                                            styles.inChamando : item.estado === "em selecao de fluxo" ?
                                                styles.inSelecao : styles.inCurso}>
                                        <p>{item.estado}</p>
                                    </td>
                                    <td className={styles.contentTooltip}> <span onClick={updateState}><BiRefresh size="24" /></span><p className={styles.tooltip}>Atualizar estado</p></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </main>


        </>
    )
}