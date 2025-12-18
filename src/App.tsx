import "./App.css";
import AuthCode from './AuthCode';

function App() {
  return <div>
    <AuthCode.Root>
      <AuthCode.Input index={0}/>
      <AuthCode.Input index={1}/>
    </AuthCode.Root>
  </div>;
}

export default App;
