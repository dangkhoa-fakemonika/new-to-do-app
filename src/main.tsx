import ReactDOM from 'react-dom/client'
import App from '@/app.tsx'

const root_element = document.getElementById('root');

if (root_element != null){
  const root = ReactDOM.createRoot(root_element);
  root.render(
    <div className={"bg-white text-[clamp(3.5rem, 4vw + 1rem, 8rem)]"}>
      <App/>
    </div>
  )
}
