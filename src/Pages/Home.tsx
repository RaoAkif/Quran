import Layout from '../components/Layout';
import './Home.css';
import ReactPlayer from 'react-player/youtube'

export const Home = () => {
  return (
  <Layout title="This is my Home">
      <ReactPlayer url='https://www.youtube.com/watch?v=hCGVXMFVHCA' />
  </Layout>
  )};

export default Home;
