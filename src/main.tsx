import ReactDOM from 'react-dom/client'
import {Theme} from "@radix-ui/themes"
import './index.css'
import App from './App.tsx'

const root_element = document.getElementById('root');

if (root_element != null){
  const root = ReactDOM.createRoot(root_element);
  root.render(
    <Theme>
      <div className={"bg-white px-6 py-2"}>
        <App/>
      </div>
    </Theme>
  )
}
