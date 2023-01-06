import { BrowserRouter } from "react-router-dom";
import Router from '@/router/index.js'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}