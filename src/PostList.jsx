// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import TextSpan from './motion';
// import ParticlesComponent from './particles';
// const Expand = ({ children }) => {
//   return (
//     <motion.div whileHover={{ scale: 1.15 }}>
//       {children}
//     </motion.div>
//   );
// };

// const PostList = () => {
//   const sentence = " Posts ".split("");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`http://localhost:5000/api/posts?page=${page}`);
//         setPosts((prevPosts) => [...prevPosts, ...res.data]);
//         setHasMore(res.data.length > 0);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     if (hasMore && !loading) {
//       fetchPosts();
//     }
//   }, [page, loading]); 

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.1,
//     };

//     const callback = (entries) => {
//       const entry = entries[0];
//       if (entry.isIntersecting && hasMore && !loading) { 
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     observer.current = new IntersectionObserver(callback, options);

//     if (loading) return;

//     const target = document.querySelector('.loading');
//     if (target) observer.current.observe(target);

//     return () => {
//       if (target) observer.current.unobserve(target);
//     };
//   }, [loading, hasMore]);

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   };

//   return (
//     <div className="font-nunito sans-serif px-12 py-16">
//        <ParticlesComponent id="particles" className="fixed top-0 left-0 w-full h-full z-0" /> 
//       <div className="font-nunito sans-serif text-center text-3xl text-white">
//         {sentence.map((letter, index) => (
//           <TextSpan key={index} whileHover={{ color: 'red' }}>{letter}</TextSpan>
//         ))}
//       </div>
//       <h2 className="text-3xl font-bold mb-8 mx-auto text-center"></h2>
//       <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
//           {posts.map((post, index) => (
//             <Expand key={post._id}>
//               <div className="bg-white rounded-lg shadow-md p-6 relative transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray hover:text-black">
//                 <h3 className="font-semibold text-xl">{post.title}</h3>
//                 <p className="text-gray-700">{post.content}</p>
//                 <img src={post.imageUrl} alt="" className="absolute top-4 right-4 max-h-32" />
//                 {index === posts.length - 1 && <div className="loading"></div>}
//               </div>
//             </Expand>
//           ))}
//         </div>
//       </motion.div>
//       {loading && <p>Loading...</p>}
//       {!hasMore && <p>No more posts to load</p>}
//     </div>
//   );
// };

// export default PostList;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TextSpan from './motion';
import ParticlesComponent from './particles';

const Expand = ({ children }) => {
  return (
    <motion.div whileHover={{ scale: 1.15 }}>
      {children}
    </motion.div>
  );
};

const PostList = () => {
  const sentence = " Posts ".split("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/posts?page=${page}`);
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setHasMore(res.data.length > 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore && !loading) {
      fetchPosts();
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const callback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(callback, options);

    if (loading) return;

    const target = document.querySelector('.loading');
    if (target) observer.current.observe(target);

    return () => {
      if (target) observer.current.unobserve(target);
    };
  }, [loading, hasMore]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="font-nunito sans-serif px-12 py-16">
      <ParticlesComponent id="particles" className="fixed top-0 left-0 w-full h-full z-0" />
      <div className="font-nunito sans-serif text-center text-3xl text-white">
        {sentence.map((letter, index) => (
          <TextSpan key={index} whileHover={{ color: 'red' }}>{letter}</TextSpan>
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-8 mx-auto text-center"></h2>
      {initialLoad && loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Expand key={post._id}>
                <div className="bg-white rounded-lg shadow-md p-6 relative transition duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray hover:text-black">
                  <h3 className="font-semibold text-xl">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
                  <img src={post.imageUrl} alt="" className="absolute top-4 right-4 max-h-32" />
                  {index === posts.length - 1 && <div className="loading"></div>}
                </div>
              </Expand>
            ))}
          </div>
        </motion.div>
      )}
      {!loading && !hasMore && <p>No more posts to load</p>}
    </div>
  );
};

export default PostList;
