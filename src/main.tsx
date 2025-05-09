import ReactDOM from 'react-dom/client'
import {Container, Theme} from "@radix-ui/themes"
import './index.css'
import App from './App.tsx'

const root_element = document.getElementById('root');

if (root_element != null){
  const root = ReactDOM.createRoot(root_element);
  root.render(
    <Theme>
      <Container>
        <App/>
      </Container>
    </Theme>
  )
}
