import { Dashboard } from "./components/dashboard";
import styles from "./styles/dashboard.module.scss"
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from "react";
function App() {

  const [callFilter, setCallFilter] = useState('')
  return (
    <div className={styles.App}>

      <header>
        <div>
          <p><span>#</span>tecCall</p>
          <div>
            <input type='text' placeholder = "Pesquisar estado" onChange={(event)=>setCallFilter(event.target.value)}></input>
            <button><AiOutlineSearch/></button>
          </div>
        </div>

      </header>

      <Dashboard callFilter ={callFilter}></Dashboard>

    </div>

  );
}

export default App;
