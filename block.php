<?php

/**
 * Plugin Name: PulpyVids 
 * Author: kmfoysal06
 */

add_action("init", function() {
    /** register the block **/
    register_block_type(__DIR__);
});
