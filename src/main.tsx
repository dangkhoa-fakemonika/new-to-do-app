import ReactDOM from 'react-dom/client'
import {Theme} from "@radix-ui/themes"
import './index.css'
import App from './app.tsx'

const root_element = document.getElementById('root');

if (root_element != null){
  const root = ReactDOM.createRoot(root_element);
  root.render(
    <Theme>
      <div className={"bg-white px-6 py-2 sm:text-[2vw] md:text-[2vw] lg:text-[1.25vw] xl:text-[1.5vw] 2xl:text-[1vw]"}>
        <App/>
      </div>
    </Theme>
  )
}
