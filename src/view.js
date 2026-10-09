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
    
        if (videoUrl) {
            const root = createRoot(container);
            root.render(
                <Player.Provider>
                    <MinimalVideoSkin>
                        <Video
                            src={videoUrl}
                            poster={posterUrl || undefined}
                            controls={toBoolean(container.getAttribute('data-controls'))}
                            autoPlay={toBoolean(container.getAttribute('data-autoplay'))}
                            loop={toBoolean(container.getAttribute('data-loop'))}
                            muted={toBoolean(container.getAttribute('data-muted'))}
                            playsInline={toBoolean(container.getAttribute('data-plays-inline'))}
                            preload={container.getAttribute('data-preload') || 'metadata'}
                        />
                    </MinimalVideoSkin>
                </Player.Provider>
            );
        }
    });
});
