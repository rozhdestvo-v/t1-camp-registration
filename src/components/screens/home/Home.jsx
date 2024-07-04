import { useState } from 'react';
import styles from './Home.module.css'
import stylesBtn from '../home/forms/Form.module.css'
import RegistrationForm from './forms/RegistrationForm';
import ChangeStatus from './forms/ChangeStatus';

function Home() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);

  const handleShowRegistration = (e) => {
    e.preventDefault();
    setShowRegistration(true)
  }

  const handleHideRegistration = (e) => {
    e.preventDefault();
    setShowRegistration(false)
  }

  

  const handleShowChangeStatus = (e) => {
    e.preventDefault();
    setShowChangeStatus(true);
  }

  const handleHideChangeStatus = (e) => {
    e.preventDefault();
    setShowChangeStatus(false);
  }

  return (
    <div className={styles.all}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>ИТ лагерь</h1>
          <img src="/T1.png" alt="Флаг лагеря Т1" className={styles.img} />
        </div>
        <h3 className={styles.author} >Разработал: Рождественский Владислав (vrozhdestvog@gmail.com)</h3>
      </div>
      {(showRegistration || showChangeStatus) ? null :
        <div className={styles.startBtn} >
          <button className={stylesBtn.btn}
            onClick={handleShowRegistration}
          >Зарегистрироваться</button>
          <button className={stylesBtn.btn}
            onClick={handleShowChangeStatus}
          >Изменить статус</button>
        </div>
      }


      {showRegistration ? (<RegistrationForm handleHideRegistration={handleHideRegistration} />) : null}
      {showChangeStatus ? (<ChangeStatus handleHideChangeStatus={handleHideChangeStatus} />) : null}
    </div>
  )
}

export default Home
