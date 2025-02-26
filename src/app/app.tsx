import { ReactElement } from 'react';
import './app.css';

function App(props: { children: ReactElement }) {
  return <div className="app">{props.children}</div>;
}

export default App;
