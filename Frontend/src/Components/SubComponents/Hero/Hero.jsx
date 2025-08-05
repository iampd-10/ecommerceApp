import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaShoppingBag, FaStar, FaTruck } from 'react-icons/fa';

function Hero() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative bg-gradient-to-r from-black to-gray-900 text-white overflow-hidden"
    >
   
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
     
          <div>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-4 font-medium"
              variants={itemVariants}
            >
              Welcome to Priyajit Debnath
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Discover <span className="text-yellow-400">Quality</span> Products <br />For Your <span className="text-yellow-400">Lifestyle</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-lg"
              variants={itemVariants}
            >
              We curate the finest products to elevate your everyday experience. 
              Shop with confidence knowing each item meets our high standards.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={itemVariants}
            >
              <Link
                to="/products"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                Shop Now <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full flex items-center justify-center transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="bg-white bg-opacity-10 p-2 rounded-full mr-3">
                  <FaStar className="text-yellow-400" />
                </div>
                <span>Premium Quality</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="bg-white bg-opacity-10 p-2 rounded-full mr-3">
                  <FaTruck className="text-green-400" />
                </div>
                <span>Fast Delivery</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="bg-white bg-opacity-10 p-2 rounded-full mr-3">
                  <FaShoppingBag className="text-blue-400" />
                </div>
                <span>Secure Checkout</span>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            variants={fadeInVariants}
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">

              <motion.div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-xl shadow-2xl w-32 h-32 flex flex-col justify-center items-center"
                initial={{ x: -50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="text-xs mb-1">Starting at</div>
                <div className="text-2xl font-bold text-yellow-600">₹499</div>
                <div className="text-xs mt-1 text-center">Best Sellers</div>
              </motion.div>
              
              <motion.div
                className="absolute -top-6 -right-6 bg-black text-white p-4 rounded-xl shadow-2xl w-32 h-32 flex flex-col justify-center items-center border border-gray-700"
                initial={{ x: 50, y: -50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="text-xs mb-1">New</div>
                <div className="text-2xl font-bold text-green-400">30% OFF</div>
                <div className="text-xs mt-1 text-center">Limited Time</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>


      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{
              y: [0, 4],
              opacity: [1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;