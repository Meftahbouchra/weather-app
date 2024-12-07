
import { Container } from 'react-bootstrap';
import './App.module.css';

import SearchBar from './components/SearchBar/SearchBar';
import WallPaper from './components/WallPaper/WallPaper';
import Weather from './components/Weather/Weather';
import { Provider } from 'react-redux';
import { store } from './store';
import {motion} from "framer-motion";
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <WallPaper/>
     
      <motion.Container
      nitial={{
        x: '100vw'
    }}
    animate={{
        x: 0
    }}
    transition={{
        duration: 1,
        ease: 'easeInOut'
    }}>
          <SearchBar/>
          <Weather/>

      </motion.Container>

    </div>
    </Provider>

  );
}

export default App;
