import { Route, Routes } from 'react-router-dom';
import Layout from './layout/ingex';
import Home from './pages/Home';
import PostPage from './pages/PostPage/PostPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/posts/:id' element={<PostPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
