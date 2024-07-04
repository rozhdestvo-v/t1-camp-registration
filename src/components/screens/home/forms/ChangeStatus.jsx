import { useState } from 'react';
import styles from './Form.module.css'
import { getCodeService } from '../../../../services/getCode.service';
import { statusService } from '../../../../services/postStatus.service';
import { encode } from 'base-64';

const noData = {
  token: '',
  status: '',
}

const noEmail = {
  email: '',
  code: '',
}


const ChangeStatus = ({ handleHideChangeStatus }) => {
  const [userData, setData] = useState(noData);
  const [emailData, setEmail] = useState(noEmail);
  const [serverResponse, setServerResponse] = useState('');


  const getCode = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const data = await getCodeService(emailData.email)
      setEmail(prev => ({
        ...prev,
        code: data
      }))
      const codeToken = encode(`${emailData.email}:${data}`);
      setData(prev => ({
        ...prev,
        token: codeToken
      }))
    }
    fetchData();
  }

  const handleOk = (e) => {
    e.preventDefault();
    setServerResponse('');
  }

  const sendStatus = (e) => {
    e.preventDefault();
    const postData = async () => {
      const data = await statusService(userData);
      setServerResponse(data);
    }
    postData();
  }

  const maskedCode = `**************************${emailData.code.slice(-6)}`;
  const maskedToken = `**************************${userData.token.slice(-6)}`;

  return (
    <>
      <div className={styles.formBlock}>
        <form className={styles.formChangeStatus} >

          <input type="email" placeholder="Почта"
            onChange={e => setEmail(prev => ({
              ...prev,
              email: e.target.value
            }))}
            value={emailData.email}
          />

          <button className={styles.btn}
            disabled={emailData.email ? false : true}
            onClick={e => getCode(e)}
          >Узнать код и токен</button>
        </form>
        <form className={styles.formChangeStatus} >
          <label>Код:</label>
          <input type="text"
            placeholder={emailData.code ? maskedCode : 'Ожидание запроса'}
            disabled />
          <label>Токен (email:code):</label>
          <input type="text"
            placeholder={userData.token ? maskedToken : 'Ожидание запроса'}
            disabled />
          <input type="text"
            onChange={e => setData(prev => ({
              ...prev,
              status: e.target.value
            }))}
            value={userData.status}
            placeholder='Статус' />


          {serverResponse ?
            <>
            <span className={styles.response} >{serverResponse}</span>
            <button className={styles.btn}
              onClick={e => handleOk(e)}
            >Ок</button>
            </>
            :
            <button className={styles.btn}
              onClick={e => sendStatus(e)}
              disabled={(userData.status.length > 0 && userData.token.length > 0)? false : true}
            >Изменить статус</button>}
        </form >
      </div>
      <button className={styles.btnBack} onClick={handleHideChangeStatus}>Вернуться</button>
    </>
  )
}

export default ChangeStatus