import ReactDOM from 'react-dom/client'
import App from '@/app.tsx'

const root_element = document.getElementById('root');

if (root_element != null){
  const root = ReactDOM.createRoot(root_element);
  root.render(
    <div className={"bg-white px-6 py-2 text-[clamp(3.5rem, 12vw + 1rem, 12rem)]"}>
      <App/>
    </div>
  )
}
