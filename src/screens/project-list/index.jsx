import { useState, useEffect } from 'react'
import { cleanObject, useMount, useDebounce } from '../../utils';
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL
console.log(process.env);

export const ProjectLIst = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])

  const [list, setList] = useState([])

  const debounceParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => { 
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => { 
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  })
  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam}></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}