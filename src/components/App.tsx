import { routes } from './routes'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { useRoutes } from "react-router-dom"

function App() {
  const routing = useRoutes(routes)

  return (
    <div className="App">
      <Provider store={store}>
        {routing}
      </Provider>
    </div>
  );
}

export default App;
