import { useState } from "react";
import "./App.css";
import Hello from "./components/Hello";
function App() {
  const [count, setCount] = useState(0);
  const x = count;
  console.log("🚀 ~ x:", x);

  // useState 에 대한 설명
  // if(x == undefined)
  // return x=0; << x는 이전에 갖던 값. 1로 바뀜
  // function setAction {
  // this.x = typeof y == 'func'?y(x) : y;
  // render();
  // }
  // return [x, setAction]

  return (
    <div className="grid place-items-center-safe">
      <h1 className="text-3xl">React{1 + 2}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* button 부분만 count 호출 시 바뀜 */}
        <Hello name="Jade">kkk</Hello>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
