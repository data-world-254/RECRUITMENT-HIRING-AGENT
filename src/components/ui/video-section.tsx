'use client'

import { useRef, useState, useEffect } from 'react'

interface VideoSectionProps {
  videoSrc?: string
  poster?: string
  title?: string
  description?: string
}

export default function VideoSection({
  videoSrc = '/assets/videos/demo-video.mp4',
  poster,
  title = "See It in Action",
  description = "Watch how our AI-powered platform transforms your hiring process"
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)

  // Handle play button click
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false // Ensure sound is enabled
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        setShowPlayButton(false)
      }).catch((error) => {
        console.error('Error playing video:', error)
      })
    }
  }

  // Handle video end
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsPlaying(false)
      setShowPlayButton(true)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setShowPlayButton(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
      // Only show play button if video is not at the end
      if (video.currentTime < video.duration) {
        setShowPlayButton(true)
      }
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [videoSrc])

  return (
    <section className="relative w-full bg-black pt-4 pb-20 px-4 md:pt-12 md:pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight font-figtree leading-[1.05] tracking-tight text-white mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Video Container with Glow Effect */}
        <div className="relative">
          {/* Glow Effect - Outer Layer */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r opacity-75 blur-xl animate-pulse" style={{ background: 'linear-gradient(to right, rgba(74, 13, 186, 0.8), rgba(74, 13, 186, 0.6), rgba(74, 13, 186, 0.8))' }} />
          {/* Glow Effect - Inner Layer */}
          <div className="absolute -inset-0.5 rounded-[32px] bg-gradient-to-r opacity-50 blur-lg animate-pulse" style={{ animationDelay: '0.5s', background: 'linear-gradient(to right, rgba(74, 13, 186, 0.6), rgba(74, 13, 186, 0.4), rgba(74, 13, 186, 0.6))' }} />

          {/* Video Box */}
          <div className="relative rounded-[32px] overflow-hidden bg-black shadow-2xl border" style={{ borderColor: 'rgba(74, 13, 186, 0.3)' }}>
            <div className="aspect-video w-full relative group">
              {videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster={poster}
                    preload="auto"
                    playsInline
                  >
                    <source src={videoSrc} type="video/mp4" />
                    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom Play Button Overlay */}
                  {showPlayButton && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-all duration-300 cursor-pointer group/play"
                      onClick={handlePlay}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handlePlay()
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label="Play video"
                    >
                      <div className="relative">
                        {/* Play button circle */}
                        <div 
                          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(74, 13, 186, 0.95), rgba(74, 13, 186, 0.85))',
                            boxShadow: '0 0 40px rgba(74, 13, 186, 0.6), 0 0 80px rgba(74, 13, 186, 0.4)'
                          }}
                        >
                          {/* Play icon */}
                          <svg
                            className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video controls overlay (appears on hover when playing) */}
                  {isPlaying && (
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (videoRef.current) {
                              if (videoRef.current.paused) {
                                videoRef.current.play()
                              } else {
                                videoRef.current.pause()
                              }
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors pointer-events-auto"
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        >
                          {isPlaying ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="text-center p-8">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: '#4a0dba' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-white/60 text-sm md:text-base">
                      Video placeholder
                    </p>
                    <p className="text-white/40 text-xs mt-2">
                      Add your video to /public/assets/videos/
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

