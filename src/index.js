const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const {__} = wp.i18n;

registerBlockType( 'pulpyvids/test-block', {
	title: __( 'PulpyVids', 'pulpyvids' ),
	description: __(
		'Different Varient of Video Players in Gutenberg',
		'pulpyvids'
	),
    attributes: {
        videoId: {type: 'number'},
        videoUrl: {type: 'url'}
    },
	icon: 'video',
	category: 'media',
	edit: ( {attributes, setAttributes, className} ) => {
        const changeHandler = ( content ) => setAttributes({content: content})
        const blockProps = useBlockProps()
        const {videoUrl, videoId} = attributes;

        return (
            <>
                attributes.videoUrl ? <MediaPlaceholder 
                        className={className}
                        onSelect={(el) => {
                            setAttributes({videoUrl: el.url});
                        }}
                        allowedTypes={['video']}
                        multiple={false}
                        labels={{title: "The Video"}}
                /> : <video src={ videoUrl } controls width="100%" />
                <Button isDestructive onClick={() => setAttributes({videoUrl: null})}>
                {
                    __("Remove Video", "pulpyvids")
                }</Button>
            </>
        )
    },
	save: ( props ) => {
        return false;
        const { attributes } = props
        const blockProps = useBlockProps.save()

    },
} );
