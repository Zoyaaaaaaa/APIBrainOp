import { motion } from 'framer-motion';

const TextSpan = ({ children}) => {
  return (
    <motion.span whileHover={{ scale: 1.7, color: 'purple' }} >
      {children}
    </motion.span>
  );
};

export default TextSpan;
