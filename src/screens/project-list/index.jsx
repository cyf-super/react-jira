import { useState, useEffect } from 'react';
import { cleanObject, useMount, useDebounce } from '../../utils';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useHttp } from '../../utils/http';

console.log(process.env);

export const ProjectLIst = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const debounceParam = useDebounce(param, 1000);
  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });
  return (
    <div>
      <SearchPanel
        param={param}
        users={users}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
