import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

type Item = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};
export type LoginUser = { id: number; name: string; age: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: Item[];
};
export type LoginFunction = (name: string, age: number) => void;

const DefaultSession = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong', age: 33 },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(DefaultSession);

  // plusCount(100)
  // const pc = () => setCount(count + 1);
  const plusCount = () => setCount((prevCount) => prevCount + 1);

  const logout = () => {
    session.loginUser = null; // fail!!
    setSession({ ...session, loginUser: null });
  };

  const login: LoginFunction = (name, age) => {
    if (!name || !age) return alert('Input Name and Age, plz!');

    setSession({ ...session, loginUser: { id: 1, name, age } });

    
  };

  //cart에서 상품 삭제하는ㄴ 함수 (id 기준)
  const removeCart = (id: number) => {
    if(!confirm('Are u sure?')) return;
    // setSession(()=>({
    //   //.이전 session을 복사해두고 
    //   //cart만 내가 삭제하고 싶은 id와 다른 것만 남기겠다!
    //   ...session, cart: session.cart.filter((item)=>item.id!==id),
    // }))

    //filter는 새로운 배열을 주기에 이렇게 하는 게 더 좋아욤!
    setSession({...session,
      cart: session.cart.filter((item)=>item.id !==id),
    });

  };

  return (
    <div className='grid place-items-center h-screen'>
      <h1 className='text-3xl'>count: {count}</h1>
      <My session={session} 
          logout={logout}
          login={login}
          removeCart={removeCart} />
      <Hello
        name={session.loginUser?.name}
        age={session.loginUser?.age}
        plusCount={plusCount}
      >
        반갑습니다
      </Hello>
    </div>
  );
}

export default App;