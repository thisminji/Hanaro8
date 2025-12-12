import type { LoginFunction, Session } from '../App';
import Login from './Login';
import Profile from './Profile';
import Small from './ui/Small';

type Prop = {
  session: Session;
  logout: () => void;
  login: LoginFunction;

  removeCart:(id:number)=> void;
};

export default function My({ session, logout, login, removeCart }: Prop) {
  return (
    <>
      {session?.loginUser ? (
        <Profile loginUser={session.loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <hr />
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            <Small>{id}.</Small> {name}
            <Small>{price.toLocaleString()}원</Small>

          <button
              className="ml-2 text-xs text-red-500 hover:bg-red-600 
              hover: shadow-lg
              active:scale-105
              transition duration-300"
              onClick={() => removeCart(id)}
            >
              삭제
            </button>

          </li>
        ))}
      </ul>
    </>
  );
}