document.addEventListener('DOMContentLoaded', function() {
    const { createRoot } = require('@wordpress/element');
    const { createPlayer } = require( '@videojs/react' );
    const { MinimalVideoSkin, Video, videoFeatures } = require( '@videojs/react/video' );
    
    const Player = createPlayer({ features: videoFeatures });
    
    // Look for our blocks on the live page
    const playerContainers = document.querySelectorAll('.pulpyvids-player-wrapper');
    
    playerContainers.forEach((container) => {
        const videoUrl = container.getAttribute('data-video-url');
        const posterUrl = container.getAttribute('data-poster-url');
        const toBoolean = (value) => value === 'true';
        const controls = toBoolean(container.getAttribute('data-controls'));

        const setupInitialPlayState = () => {
            container.classList.add('pulpyvids-pristine');

            requestAnimationFrame(() => {
                const videoElement = container.querySelector('video');

                if (!videoElement) {
                    return;
                }

                const markAsStarted = () => {
                    container.classList.remove('pulpyvids-pristine');
                };

                videoElement.addEventListener('play', markAsStarted, { once: true });

                if (!videoElement.paused || videoElement.currentTime > 0) {
                    markAsStarted();
                }
            });
        };
    
        if (videoUrl) {
            const root = createRoot(container);
            root.render(
                <Player.Provider>
                    <MinimalVideoSkin>
                        <Video
                            src={videoUrl}
                            poster={posterUrl || undefined}
                            controls={controls}
                            autoPlay={toBoolean(container.getAttribute('data-autoplay'))}
                            loop={toBoolean(container.getAttribute('data-loop'))}
                            muted={toBoolean(container.getAttribute('data-muted'))}
                            playsInline={toBoolean(container.getAttribute('data-plays-inline'))}
                            preload={container.getAttribute('data-preload') || 'metadata'}
                        />
                    </MinimalVideoSkin>
                </Player.Provider>
            );

            if (controls) {
                setupInitialPlayState();
            }
        }
    });
});
