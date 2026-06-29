<?php

/**
 * Plugin Name: PulpyVids 
 * Author: kmfoysal06
 */

add_action("init", function() {
    wp_register_script(
        "pulpyvids_gutenberg-block",
        plugins_url("build/index.js", __FILE__),
        ["wp-blocks", "wp-element", "wp-editor"],
        filemtime(plugin_dir_path(__FILE__) . "build/index.js")
    );

    wp_register_style(
        "pulpyvids_gutenberg-block-editor",
        plugins_url("editor.css", __FILE__),
        ["wp-edit-blocks"],
        filemtime(plugin_dir_path(__FILE__) . "editor.css")
    );
    wp_register_style(
        "pulpyvids_gutenberg-block-fe",
        plugins_url("block-fe.css", __FILE__),
        ["wp-edit-blocks"],
        filemtime(plugin_dir_path(__FILE__) . "block-fe.css")
    );
    register_block_type("pulpyvids/video", [
        "style" => "pulpyvids_gutenberg-block",
        "editor_script" => "pulpyvids_gutenberg-block",
        "editor_style" => "pulpyvids_gutenberg-block-editor",
    ]);


    wp_enqueue_style("pulpyvids_gutenberg-block-fe");


});
