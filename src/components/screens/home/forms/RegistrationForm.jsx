import { useState } from 'react'
import styles from './Form.module.css'
import SelectRoles from './SelectRoles';
import { SignUpService } from '../../../../services/postSignUp.service';

const noData = {
  "last_name": '',
  "first_name": '',
  "email": '',
  "role": '',
};

const RegistrationForm = ({ handleHideRegistration }) => {
  const [dataUser, setDataUser] = useState(noData);
  const [serverResponse, setServerResponse] = useState('');


  const clearForm = (e) => {
    e.preventDefault();
    setDataUser(noData);
    setServerResponse('');
  }

  const sendDataForm = (e) => {
    e.preventDefault();
    const postData = async () => {
      const data = await SignUpService(dataUser);
      setServerResponse(data);
    }
    postData();
  }

  const checkParams = () => {
    return (dataUser.last_name.length && dataUser.first_name.length &&
      dataUser.email.length && dataUser.role.length) > 0
  }


  return (
    <>
      <form className={styles.form}>
        <input type="text"
          placeholder="Фамилия"
          onChange={e => setDataUser(prev => ({
            ...prev,
            last_name: e.target.value
          }))}
          value={dataUser.last_name}
          required={true}
          onKeyUp={checkParams}
        />
        <input type="text" placeholder="Имя"
          onChange={e => setDataUser(prev => ({
            ...prev,
            first_name: e.target.value
          }))}
          value={dataUser.first_name}
          required
          onKeyUp={checkParams}
        />
        <input type="email" placeholder="Почта"
          onChange={e => setDataUser(prev => ({
            ...prev,
            email: e.target.value
          }))}
          value={dataUser.email}
          required
          onKeyUp={checkParams}
        />

        <SelectRoles dataUser={dataUser} setDataUser={setDataUser} />

        {serverResponse
          ?
          <span className={styles.response} >{serverResponse}</span>
          :
          <button className={styles.btn}
            disabled={!checkParams()}
            onClick={e => sendDataForm(e)}>Зарегистрироваться</button>
        }
        <button className={styles.btn}
          onClick={e => clearForm(e)}>Очистить форму</button>

      </form>
      <button className={styles.btnBack} onClick={handleHideRegistration}>Вернуться</button>
    </>
  )
}

export default RegistrationForm