import './App.scss';
import Screeloader from './Components/Loader/Screeloader';
import { useAuthContext } from './Contexts/AuthContext';
import Routes from './Pages//Routes';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

function App() {
  const { isApploading } = useAuthContext()

  if (isApploading) return <Screeloader />
  else return <Routes />
  return (
    <>


    </>
  );
}

export default App;
