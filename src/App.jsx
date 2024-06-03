

import React, { useState, useEffect } from 'react';
import Signup from './Sign';
import PostList from './PostList';
import './index.css';
import Login from './Login';
import ParticlesComponent from './particles';
import ForgotPassword from './ForgotPssword';
// function App() {
//   const [route, setRoute] = useState(window.location.pathname);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const navigate = (path) => {
//     window.history.pushState({}, '', path);
//     setRoute(path);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const calculateBackgroundColor = () => {
//     const shade = 41 - Math.min(scrollPosition / 10, 29);
//     return `rgb(12, 12, ${shade})`;
//   };

//   return (
//   <div class='app'>
//    <ParticlesComponent id="particles" />
//     <div style={{ backgroundColor: calculateBackgroundColor() }}>
//       {/* <button onClick={() => navigate('/signup')}>Signup</button>
//       <button onClick={() => navigate('/posts')}>Posts</button> */}

//       {route === '/signup' && <Signup />}
//       {route === '/login' && <Login />}
//       {route === '/posts' && <PostList />}
//       {route === '/forgot' && <ForgotPassword />}
//     </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';
// import Signup from './Signup';
// import PostList from './PostList';
// import './index.css';
// import Login from './Login';
// import ParticlesComponent from './particles';
// import ForgotPassword from './ForgotPassword';
// import React, { useState, useEffect } from 'react';
// import Signup from './Signup';
// import PostList from './PostList';
// import './index.css';
// import Login from './Login';
// import ParticlesComponent from './particles';
// import ForgotPassword from './ForgotPassword';
import { motion } from 'framer-motion';

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateBackgroundColor = () => {
    const shade = 41 - Math.min(scrollPosition / 10, 29);
    return `rgb(12, 12, ${shade})`;
  };

  return (<>
  
    <div className='app'>
     
      <div style={{ backgroundColor: calculateBackgroundColor() }} className="min-h-screen">
        <header className="flex justify-center py-4 space-x-4 bg-gray-900 bg-opacity-75 fixed top-0 w-full z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            onClick={() => navigate('/login')}
          >
            Log In
          </motion.button>
        </header>
       
        <div className="pt-20">
          {route === '/signup' && <Signup />}
          {route === '/login' && <Login />}
          {route === '/posts' && <PostList />}
          {route === '/forgot' && <ForgotPassword />}
        </div>
      </div>
    </div>
    
</>
  );
}

export default App;
