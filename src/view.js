document.addEventListener('DOMContentLoaded', function() {
    const { createRoot } = require('@wordpress/element');
    const { createPlayer } = require( '@videojs/react' );
    const { MinimalVideoSkin, Video, videoFeatures } = require( '@videojs/react/video' );
    const initialPlayStylesId = 'pulpyvids-initial-play-styles';
    const initialPlayStyles = `
        .pulpyvids-player-wrapper.pulpyvids-pristine .media-controls {
            position: absolute;
            inset: 0;
            justify-content: center;
            background: transparent;
            backdrop-filter: none;
        }
        .pulpyvids-player-wrapper.pulpyvids-pristine .media-controls * {
            visibility: hidden;
        }
        .pulpyvids-player-wrapper.pulpyvids-pristine .media-controls .media-button--play,
        .pulpyvids-player-wrapper.pulpyvids-pristine .media-controls .media-button--play * {
            visibility: visible;
        }
        .pulpyvids-player-wrapper.pulpyvids-pristine .media-controls .media-button--play {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3.25rem;
            height: 3.25rem;
            color: oklch(1 0 0);
            background: oklch(0 0 0 / 0.45);
            border-radius: 9999px;
            transform: translate(-50%, -50%);
        }
    `;
    
    const Player = createPlayer({ features: videoFeatures });

    if (!document.getElementById(initialPlayStylesId)) {
        const styles = document.createElement('style');
        styles.id = initialPlayStylesId;
        styles.textContent = initialPlayStyles;
        document.head.append(styles);
    }
    
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
