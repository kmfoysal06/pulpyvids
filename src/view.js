document.addEventListener('DOMContentLoaded', function() {
    const { createRoot } = require('@wordpress/element');
    const { createPlayer } = require( '@videojs/react' );
    const { MinimalVideoSkin, Video, videoFeatures } = require( '@videojs/react/video' );
    
    const Player = createPlayer({ features: videoFeatures });
    
    // Look for our blocks on the live page
    const playerContainers = document.querySelectorAll('.pulpyvids-player-wrapper');
    
    playerContainers.forEach((container) => {
        const videoUrl = container.getAttribute('data-video-url');
    
        if (videoUrl) {
            const root = createRoot(container);
            root.render(
                <Player.Provider>
                    <MinimalVideoSkin>
                        <Video src={videoUrl} playsInline />
                    </MinimalVideoSkin>
                </Player.Provider>
            );
        }
    });
});
