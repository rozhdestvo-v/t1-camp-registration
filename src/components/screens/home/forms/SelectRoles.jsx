import styles from './Form.module.css'
import Select from 'react-select'
import { RolesService } from '../../../../services/registration.service';
import { useEffect, useState } from 'react';

const SelectRoles = ({ dataUser, setDataUser }) => {
  const [rolesData, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RolesService();
      setRoles(data)
    }
    fetchData();
  }, []);

  const getSelectValue = () => {
    if (dataUser.role.length > 0) {
      rolesData.find(r => r.value === dataUser.role);
    } else {
      return ''
    }
  }

  const onSelectChange = (newValue) => {
    setDataUser(prev => ({
      ...prev,
      role: newValue.value,
    })
    )
  }

  return (
    <Select className={styles.select}
      options={rolesData}
      value={getSelectValue()}
      onChange={onSelectChange}
      isLoading={!rolesData.length ? true : false}
      placeholder={rolesData.length ? 'Ваша роль' : 'Загрузка...'}
      isDisabled={rolesData.length ? false : true}
      required />
  )
}

export default SelectRoles