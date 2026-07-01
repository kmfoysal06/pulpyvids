const { registerBlockType } = require("@wordpress/blocks")
const { MediaPlaceholder } = require("@wordpress/editor")
const {useBlockProps} = require("@wordpress/block-editor")
const { Button } = require('@wordpress/components');
require("@videojs/react/video/minimal-skin.css")
const {__} = require( '@wordpress/i18n');
const {createPlayer} = require('@videojs/react')
const { MinimalVideoSkin, Video, videoFeatures } = require('@videojs/react/video');

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
                        <Player.Provider> 
                            <MinimalVideoSkin>
                                <Video src={videoUrl} playsInline />
                            </MinimalVideoSkin>
                        </Player.Provider>
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
