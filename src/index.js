const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const {__} = wp.i18n;
//import ccreate player from react/videojs
const {createPlayer, videoFeatures} = require('@videojs/react');
const { VideoSkin, Video, videFeatures } = require('@videojs/react/video');
//require('@videojs/react/video/skin.css');

const Player = createPlayer({features: videoFeatures});

registerBlockType( 'pulpyvids/test-block', {
	title: __( 'PulpyVids', 'pulpyvids' ),
	description: __(
		'Different Varient of Video Players in Gutenberg',
		'pulpyvids'
	),
    attributes: {
        videoUrl: {type: 'url'}
    },
	icon: 'video',
	category: 'media',
	edit: ( {attributes, setAttributes, className} ) => {
        const changeHandler = ( content ) => setAttributes({content: content})
        const blockProps = useBlockProps()
        const {videoUrl} = attributes;

        return (
            <>

            {

                !attributes.videoUrl ? (
                    <>
                        <MediaPlaceholder 
                            className={className}
                            onSelect={(el) => {
                                setAttributes({videoUrl: el.url});
                            }}
                            allowedTypes={['video']}
                            multiple={false}
                            labels={{title: "The Video"}}
                        />
                    </>
                ) : (
                    <>
                        <Player.Provider> <Video src={videoUrl} playsInline /> </Player.Provider>
                        <Button isSecondary onClick={() => setAttributes({videoUrl: ''})}>Remove Video</Button>
                    </>
                )
            }
            </>
        )
    },
	save: ( {attributes} ) => {
        const {videoUrl} = attributes;
        return (
            <div { ...useBlockProps.save() }>
                { videoUrl && <video src={ videoUrl } controls width="100%" /> }
            </div>
        )


    },
} );
