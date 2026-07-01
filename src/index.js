const { registerBlockType } = require("@wordpress/blocks")
const {useBlockProps, MediaPlaceholder} = require("@wordpress/block-editor")
const { Button } = require('@wordpress/components');
require("@videojs/react/video/minimal-skin.css")
const {__} = require( '@wordpress/i18n');
const {createPlayer} = require('@videojs/react')
const { MinimalVideoSkin, Video, videoFeatures } = require('@videojs/react/video');

const Player = createPlayer({features: videoFeatures});

registerBlockType( 'pulpyvids/video', {
	title: __( 'PulpyVids', 'pulpyvids' ),
	description: __(
		'Different Varient of Video Players in Gutenberg',
		'pulpyvids'
	),
    attributes: {
        videoUrl: {type: 'url'}
    },
	icon: 'video-alt3',
	category: 'media',
	edit: ( {attributes, setAttributes, className} ) => {
        const blockProps = useBlockProps()
        const {videoUrl} = attributes;

        return (
            <div { ...blockProps }>

            {

                !attributes.videoUrl ? (
                    <>
                        <MediaPlaceholder 
                            onSelect={(el) => {
                                setAttributes({videoUrl: el.url});
                            }}
                            allowedTypes={['video']}
                            multiple={false}
                            labels={{title: "Upload The Video"}}
                            icons={"video-alt3"}
                        />
                    </>
                ) : (
                    <>
                        <Player.Provider> 
                            <MinimalVideoSkin>
                                <Video src={videoUrl} playsInline />
                            </MinimalVideoSkin>
                        </Player.Provider>
                        <Button style={{marginTop: "6px"}} isSecondary onClick={() => setAttributes({videoUrl: ''})}>Remove Video</Button>
                    </>
                )
            }
            </div>
        )
    },
	save: ( {attributes} ) => {
        const {videoUrl} = attributes;
        return (
            <div 
                { ...useBlockProps.save() }
                className="pulpyvids-player-wrapper"
                data-video-url={videoUrl}
            >
                {videoUrl && <noscript><video src={videoUrl} controls /></noscript>}
            </div>
        )


    },
} );
