import React from 'react';
import ModalForm from '../ModalForm/ModalForm';
import UpdateUserInfo from '../UpdateUser/UpdateUserInfo';
import UpdatePassword from '../UpdateUser/UpdateUserPassword';
import LocalStorageService from '../../services/localStorageService';
import { Menu, Dropdown, notification } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const Setting = props => {
  const logout = () => {
      LocalStorageService.removeToken();
      props.setRole('guest');
      notification.success({
        message: `You were logout.`,
        placement: 'bottomRight'
      });
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <ModalForm form={<UpdateUserInfo username={props.username} firstName={props.firstName} lastName={props.lastName}/>} style2={true} title='Update profile' des='Update profile'/>
      </Menu.Item>
      <Menu.Item>
        <ModalForm form={<UpdatePassword />} style2={true} title='Update password' des='Update password'/>
      </Menu.Item>
      <Menu.Item onClick={logout} danger>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <SettingOutlined style={{fontSize: 20, color: 'black'}}/>
      </a>
    </Dropdown>
  );

}

export default Setting;