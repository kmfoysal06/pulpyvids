const { registerBlockType } = require( '@wordpress/blocks' );
const {
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} = require( '@wordpress/block-editor' );
const {
	Button,
	PanelBody,
	SelectControl,
	ToggleControl,
} = require( '@wordpress/components' );
require( '@videojs/react/video/minimal-skin.css' );
// WordPress provides this package as an editor global.
// eslint-disable-next-line import/no-extraneous-dependencies
const { __ } = require( '@wordpress/i18n' );
const { createPlayer } = require( '@videojs/react' );
const {
	MinimalVideoSkin,
	Video,
	videoFeatures,
} = require( '@videojs/react/video' );

const Player = createPlayer( { features: videoFeatures } );

const Edit = ( { attributes, setAttributes } ) => {
	const blockProps = useBlockProps();
	const {
		autoplay,
		controls,
		loop,
		muted,
		playsInline,
		posterUrl,
		preload,
		videoUrl,
	} = attributes;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Video settings', 'pulpyvids' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( { posterUrl: media.url } )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<>
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ posterUrl
											? __(
													'Replace poster image',
													'pulpyvids'
											  )
											: __(
													'Choose poster image',
													'pulpyvids'
											  ) }
									</Button>
									{ posterUrl && (
										<Button
											variant="link"
											isDestructive
											onClick={ () =>
												setAttributes( {
													posterUrl: '',
												} )
											}
										>
											{ __(
												'Remove poster image',
												'pulpyvids'
											) }
										</Button>
									) }
								</>
							) }
						/>
					</MediaUploadCheck>
					<ToggleControl
						label={ __( 'Show controls', 'pulpyvids' ) }
						checked={ controls }
						onChange={ ( value ) =>
							setAttributes( { controls: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'pulpyvids' ) }
						checked={ autoplay }
						onChange={ ( value ) =>
							setAttributes( { autoplay: value } )
						}
						help={
							autoplay && ! muted
								? __(
										'Autoplay may be blocked unless the video is muted.',
										'pulpyvids'
								  )
								: undefined
						}
					/>
					<ToggleControl
						label={ __( 'Loop', 'pulpyvids' ) }
						checked={ loop }
						onChange={ ( value ) =>
							setAttributes( { loop: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Muted', 'pulpyvids' ) }
						checked={ muted }
						onChange={ ( value ) =>
							setAttributes( { muted: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Play inline on mobile', 'pulpyvids' ) }
						checked={ playsInline }
						onChange={ ( value ) =>
							setAttributes( { playsInline: value } )
						}
					/>
					<SelectControl
						label={ __( 'Preload', 'pulpyvids' ) }
						value={ preload }
						options={ [
							{
								label: __( 'Metadata', 'pulpyvids' ),
								value: 'metadata',
							},
							{
								label: __( 'Entire video', 'pulpyvids' ),
								value: 'auto',
							},
							{
								label: __( 'None', 'pulpyvids' ),
								value: 'none',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { preload: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			{ ! videoUrl ? (
				<MediaPlaceholder
					onSelect={ ( media ) =>
						setAttributes( { videoUrl: media.url } )
					}
					allowedTypes={ [ 'video' ] }
					multiple={ false }
					labels={ {
						title: __( 'Upload the video', 'pulpyvids' ),
					} }
					icons="video-alt3"
				/>
			) : (
				<>
					<Player.Provider>
						<MinimalVideoSkin>
							<Video
								src={ videoUrl }
								poster={ posterUrl || undefined }
								controls={ controls }
								autoPlay={ autoplay }
								loop={ loop }
								muted={ muted }
								playsInline={ playsInline }
								preload={ preload }
							/>
						</MinimalVideoSkin>
					</Player.Provider>
					<Button
						style={ { marginTop: '6px' } }
						variant="secondary"
						onClick={ () => setAttributes( { videoUrl: '' } ) }
					>
						{ __( 'Remove video', 'pulpyvids' ) }
					</Button>
				</>
			) }
		</div>
	);
};

registerBlockType( 'pulpyvids/video', {
	title: __( 'PulpyVids', 'pulpyvids' ),
	description: __( 'Show Better Video Player UI', 'pulpyvids' ),
	attributes: {
		videoUrl: { type: 'url' },
		posterUrl: { type: 'url', default: '' },
		controls: { type: 'boolean', default: true },
		autoplay: { type: 'boolean', default: false },
		loop: { type: 'boolean', default: false },
		muted: { type: 'boolean', default: false },
		playsInline: { type: 'boolean', default: true },
		preload: { type: 'string', default: 'metadata' },
	},
	icon: 'video-alt3',
	category: 'media',
	edit: Edit,
	save: ( { attributes } ) => {
		const {
			autoplay,
			controls,
			loop,
			muted,
			playsInline,
			posterUrl,
			preload,
			videoUrl,
		} = attributes;
		return (
			<div
				{ ...useBlockProps.save() }
				className="pulpyvids-player-wrapper"
				data-video-url={ videoUrl }
				data-poster-url={ posterUrl }
				data-controls={ controls }
				data-autoplay={ autoplay }
				data-loop={ loop }
				data-muted={ muted }
				data-plays-inline={ playsInline }
				data-preload={ preload }
			>
				{ videoUrl && (
					<noscript>
						<video
							src={ videoUrl }
							poster={ posterUrl || undefined }
							controls={ controls }
							autoPlay={ autoplay }
							loop={ loop }
							muted={ muted }
							playsInline={ playsInline }
							preload={ preload }
						/>
					</noscript>
				) }
			</div>
		);
	},
} );
