import { routes } from './routes'
import store from './store'
import { Provider } from 'react-redux'
import { useRoutes } from "react-router-dom"
import { CssBaseline } from '@material-ui/core'

function App() {
  const routing = useRoutes(routes)

  return (
    <div className="App">
      <CssBaseline />
      <Provider store={store}>
        {routing}
      </Provider>
    </div>
  );
}

export default App;
