import { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { login, user } = useAuth();
  // const login = (params: { username: string, password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(params)
  //     }).then(async res => {
  //       if (res.ok) {
  //         console.log(await res.json())
  //       }
  //     })
  // }

  const submitAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={submitAction}>
      {user ? <div>{user.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" />
      </div>
      <button type="submit">登陆</button>
    </form>
  );
};
