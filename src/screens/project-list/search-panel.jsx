import { Form, Input, Select } from 'antd';
import { jsx } from '@emotion/react';

export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={e =>
            setParam({
              ...param,
              name: e.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId && parseInt(param.personId)}
          onChange={value =>
            setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}{' '}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
