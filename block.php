<?php

/**
 * Plugin Name: PulpyVids 
 * Author: kmfoysal06
 */

add_action("init", function() {
    $deps_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
    $dependencies = is_array($deps_file) && isset($deps_file['dependencies']) ? $deps_file['dependencies'] : ["wp-blocks", "wp-element", "wp-editor"];

    wp_register_script(
        "pulpyvids_gutenberg-block",
        plugins_url("build/index.js", __FILE__),
        $dependencies,
        filemtime(plugin_dir_path(__FILE__) . "build/index.js")
    );

    wp_register_style(
        "pulpyvids_gutenberg-block-editor",
        plugins_url("build/index.css", __FILE__),
        ["wp-edit-blocks"],
        filemtime(plugin_dir_path(__FILE__) . "build/index.css")
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
