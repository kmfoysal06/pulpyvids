/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
  MediaPlaceholder = _wp$blockEditor.MediaPlaceholder,
  useBlockProps = _wp$blockEditor.useBlockProps;
var Button = wp.components.Button;
var __ = wp.i18n.__;
registerBlockType('pulpyvids/test-block', {
  title: __('PulpyVids', 'pulpyvids'),
  description: __('Different Varient of Video Players in Gutenberg', 'pulpyvids'),
  attributes: {
    videoId: {
      type: 'number'
    },
    videoUrl: {
      type: 'url'
    }
  },
  icon: 'video',
  category: 'media',
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      className = _ref.className;
    var changeHandler = function changeHandler(content) {
      return setAttributes({
        content: content
      });
    };
    var blockProps = useBlockProps();
    var videoUrl = attributes.videoUrl,
      videoId = attributes.videoId;
    return /*#__PURE__*/React.createElement(React.Fragment, null, "attributes.videoUrl ? ", /*#__PURE__*/React.createElement(MediaPlaceholder, {
      className: className,
      onSelect: function onSelect(el) {
        setAttributes({
          videoUrl: el.url
        });
      },
      allowedTypes: ['video'],
      multiple: false,
      labels: {
        title: "The Video"
      }
    }), " : ", /*#__PURE__*/React.createElement("video", {
      src: videoUrl,
      controls: true,
      width: "100%"
    }), /*#__PURE__*/React.createElement(Button, {
      isDestructive: true,
      onClick: function onClick() {
        return setAttributes({
          videoUrl: null
        });
      }
    }, __("Remove Video", "pulpyvids")));
  },
  save: function save(props) {
    return false;
    // removed by dead control flow
 var attributes; 
    // removed by dead control flow
 var blockProps; 
  }
});
/******/ })()
;
//# sourceMappingURL=index.js.map