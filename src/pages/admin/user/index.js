import React, { useState } from "react";
import { Table, Button, Icon, Popconfirm, notification } from 'antd';
import UserModal from './UserModal'

const dataUser = [
  {
    fullname: "Vũ Tuấn Anh",
    username: 'anh.vu',
    role: 'ADMIN',
    isLocked: false
  },
  {
    fullname: "Trương Lê Việt Danh",
    username: 'danh.trương',
    role: 'MANAGER',
    isLocked: false
  },
  {
    fullname: "vu.anh",
    username: 'vu.anh',
    role: 'USER',
    isLocked: false
  },
  {
    fullname: "Phùng Chú Cường",
    username: 'cuong.phung',
    role: 'USER',
    isLocked: false
  }
]

function Index() {
  const [users, setUsers] = useState(dataUser)
  const [visiableFormUserModal, setvisiableFormUserModal] = useState(false);
  const [userSelected, setUserSelected] = useState(null)
  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'role',
      render: (text) => {
        if (text === 'USER') return 'Người dùng';
        if (text === 'MANAGER') return 'Giáo lý';
        if (text === 'ADMIN') return 'Quản trị';
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isLocked',
      render: (text) => {
        // eslint-disable-next-line curly
        if (text === false) return <div>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          <span>{' '}</span>Hoạt động
        </div>;
        // eslint-disable-next-line curly
        if (text === true) return <div>
          <Icon type="minus-circle" theme="twoTone" twoToneColor="#f5222d" />
          <span>{' '}</span>Tạm khóa
        </div>;
      },
    },
    {
      title: 'Tắc vụ',
      key: 'action',
      // fixed: 'right',
      width: 200,
      render: (item) => (
        <>
          <Button type="primary" size="small" onClick={() => {
            setUserSelected(item);
            setvisiableFormUserModal(true);
          }}
          >
            <Icon type="edit" />
          </Button>{' '}
          <Popconfirm
            title="Bạn có muốn xóa không?"
            onConfirm={() => {
              setUsers(users.filter(user => user.username !== item.username));
              notification.success({
                message: 'Xóa tài khoản thành công',
              });
            }}
            // onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" size="small"><Icon type="delete" /></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <h3 style={{ padding: '10px', textAlign: 'center' }}>Tài khoản <Button type="primary" icon="plus" onClick={() => setvisiableFormUserModal(true)} style={{ float: 'right' }} /></h3>
      <Table
        columns={columns}
        dataSource={users}
        bordered
        rowKey='_id'
        scroll={{ y: 410 }}
      />
      <UserModal
        users={users}
        setUsers={setUsers}
        visiableFormUserModal={visiableFormUserModal}
        setvisiableFormUserModal={setvisiableFormUserModal}
        userSelected={userSelected}
      />
    </>
  );
}

export default Index;