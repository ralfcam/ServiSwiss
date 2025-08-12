import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Zap } from 'lucide-react';

// Pexels video IDs for household services
const PEXELS_VIDEO_IDS = [
  { id: '4109209', title: 'Professional cleaning service' },
  { id: '4109210', title: 'Home maintenance work' },
  { id: '4109224', title: 'Professional service delivery' },
  { id: '4109356', title: 'Household work and organization' },
  { id: '4109498', title: 'Service completion and quality' }
];

const Hero = () => {
  const [videos, setVideos] = useState<{ url: string; id: string }[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Function to load videos from Pexels using direct download URLs
  const loadPexelsVideos = async () => {
    try {
      setLoadingVideos(true);
      console.log('🎬 Loading Pexels videos...');
      
      // Use Pexels video file URLs that are CORS-friendly
      const pexelsVideos = PEXELS_VIDEO_IDS.map(video => ({
        id: video.id,
        title: video.title,
        url: `https://videos.pexels.com/video-files/${video.id}/${video.id}-uhd_4096_2160_25fps.mp4`
      }));

      // Fallback URLs with different resolutions
      const fallbackVideos = PEXELS_VIDEO_IDS.map(video => ({
        id: video.id,
        title: video.title,
        url: `https://videos.pexels.com/video-files/${video.id}/${video.id}-hd_1920_1080_25fps.mp4`
      }));

      const validVideos: { url: string; id: string }[] = [];

      // Test primary URLs first
      for (const video of pexelsVideos) {
        try {
          const testVideo = document.createElement('video');
          testVideo.crossOrigin = 'anonymous';
          testVideo.preload = 'metadata';
          
          const canLoad = await new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(false), 5000); // 5 second timeout
            
            testVideo.onloadedmetadata = () => {
              clearTimeout(timeout);
              resolve(true);
            };
            
            testVideo.onerror = () => {
              clearTimeout(timeout);
              resolve(false);
            };
            
            testVideo.src = video.url;
          });

          if (canLoad) {
            validVideos.push(video);
            console.log('✅ UHD Video loaded successfully:', video.id);
          } else {
            console.log('❌ Video failed to load:', video.id);
          }
        } catch (error) {
          console.log('❌ Error testing video:', video.id, error);
        }
      }

      // If no UHD videos work, try HD fallbacks
      if (validVideos.length === 0) {
        console.log('🔄 Trying HD fallback videos...');
        for (const video of fallbackVideos) {
          try {
            const testVideo = document.createElement('video');
            testVideo.crossOrigin = 'anonymous';
            testVideo.preload = 'metadata';
            
            const canLoad = await new Promise((resolve) => {
              const timeout = setTimeout(() => resolve(false), 5000);
              
              testVideo.onloadedmetadata = () => {
                clearTimeout(timeout);
                resolve(true);
              };
              
              testVideo.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
              };
              
              testVideo.src = video.url;
            });

            if (canLoad) {
              validVideos.push(video);
              console.log('✅ HD Video loaded successfully:', video.id);
            }
          } catch (error) {
            console.log('❌ Error testing HD video:', video.id, error);
          }
        }
      }

      if (validVideos.length > 0) {
        setVideos(validVideos);
        console.log(`🎬 Successfully loaded ${validVideos.length} Pexels videos`);
      } else {
        console.log('⚠️ No Pexels videos could be loaded, using fallback');
        setVideos([]);
      }
    } catch (error) {
      console.error('Error loading Pexels videos:', error);
      // Set empty array to trigger fallback background
      setVideos([]);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    loadPexelsVideos();
  }, []);

  // Auto-rotate videos every 8 seconds
  useEffect(() => {
    if (videos.length > 1 && isVideoLoaded) {
      const interval = setInterval(() => {
        setCurrentVideoIndex((prevIndex) => 
          (prevIndex + 1) % videos.length
        );
      }, 16000);

      return () => clearInterval(interval);
    }
  }, [videos.length, isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    console.log('✅ Video loaded and ready to play');
  };

  const handleVideoError = (error: any) => {
    console.log('❌ Video failed to load:', videos[currentVideoIndex]?.id, error);
    // Try next video if available
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      // All videos failed, use fallback
      setVideos([]);
      setIsVideoLoaded(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Background Video from Pexels */}
      {videos.length > 0 && !loadingVideos ? (
        <div className="absolute inset-0">
          <video
            key={videos[currentVideoIndex]?.url}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src={videos[currentVideoIndex]?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-white/80" />
          
          {/* Video Navigation Dots */}
          {videos.length > 1 && isVideoLoaded && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex 
                      ? 'bg-red-600 scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  title={`Video ${index + 1}: ${PEXELS_VIDEO_IDS[index]?.title || 'Professional service footage'}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Fallback Background Image from Pexels */
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75)), url('https://images.pexels.com/photos/4109209/pexels-photo-4109209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`
          }}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-200/30 to-red-200/30 rounded-full blur-3xl"
        />
      </div>

      {/* Floating AI Icons */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div className="text-3xl mb-2 relative">
          🧹
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-red-500" />
        </div>
        <div className="text-sm text-gray-700 font-medium">AI Cleaning</div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 left-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div className="text-3xl mb-2 relative">
          🚚
          <Zap className="absolute -top-1 -right-1 w-4 h-4 text-blue-500" />
        </div>
        <div className="text-sm text-gray-700 font-medium">Smart Transport</div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 4, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-16 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div className="text-3xl mb-2 relative">
          🔧
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-red-500" />
        </div>
        <div className="text-sm text-gray-700 font-medium">Auto Repair</div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="text-sm text-gray-700 mb-4 font-medium tracking-wide">
            Willkommen | Bienvenue | Benvenuto | Welcome
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight"
        >
          Finally, One Platform for{' '}
          <span className="text-red-600 relative">
            All Your Household
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
            />
          </span>{' '}
          Needs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-blue-900 mb-6 max-w-4xl mx-auto font-semibold leading-relaxed"
        >
          Save up to <span className="text-red-600 font-bold">47%</span> on cleaning, transportation, and repairs with Geneva's AI-powered coordination platform – Swiss precision meets smart automation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Tired of high costs, scheduling hassles, and unreliable services? ServiSwiss AI handles it all seamlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(213, 43, 30, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-xl text-gray-900 px-8 py-4 rounded-full font-semibold text-lg border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span>See Reviews</span>
          </motion.button>
        </motion.div>

        {/* Loading indicator for Pexels videos */}
        {loadingVideos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-center"
          >
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading professional service videos from Pexels...</span>
            </div>
          </motion.div>
        )}

        {/* Video status indicator */}
        {/* !loadingVideos && videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-center"
          >
            <div className="inline-flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Professional service videos loaded from Pexels</span>
            </div>
          </motion.div>
        ) */}
      </div>
    </section>
  );
};

export default Hero;