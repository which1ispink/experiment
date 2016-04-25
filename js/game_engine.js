// Global variables to keep track of game state
var player_score = 0;
var player_target_color;
var GRID_SIZE = 10;
var UPDATE_TIMEOUT = 1000;
var cell_colors = {
	0: '#A30000',
	1: '#0404AD',
	2: '#0F6B16'
};

/* Initiates the game */
function init() {
	pick_player_color();
	generate_grid();
	setTimeout(regenerate_cells_colors, UPDATE_TIMEOUT);
}

/* Randomly picks one of the colors as the target color for the player */
function pick_player_color() {
	player_target_color = pick_random_color();
	write_out_player_target_color();
}

/* Writes out the html of the player target color on game load */
function write_out_player_target_color() {
	$('#target-color').text(get_readable_color_name(player_target_color));
	$('#target-color').css('color', player_target_color);
}

/* Maps cell colors' hex codes to human-readable names to write to the player */
function get_readable_color_name(player_color_hex) {
	var map = {
		'#A30000' : 'red',
		'#0404AD' : 'blue',
		'#0F6B16' : 'green'
	};
	return map[player_color_hex];
}

/* Initially generates the grid by adding the cells according to the grid size */
function generate_grid() {
	for (var row = 0; row < GRID_SIZE; row++) {
		for (var col = 0; col < GRID_SIZE; col++) {
			var random_color = pick_random_color();
			var cell = generate_cell('tile_' + row + 'x' + col, random_color);
			$('#grid').append(cell);
		}
	}
}

/* Generates the html of one cell */
function generate_cell(cell_id, cell_background_color) {
	var cell = $("<div>", {id: cell_id, class: 'cell'});
	var cell_size_ratio = 100 / GRID_SIZE;
	cell.css({
		'background-color': cell_background_color,
		'width': cell_size_ratio + '%',
		'height': cell_size_ratio + '%'
	});
	return cell;
}

/* Randomly shuffles cell colors. Called repeatedly using UPDATE_TIMEOUT as the interval */
function regenerate_cells_colors() {
	$('.cell').each(function(i) {
		var random_color = pick_random_color();
	    $(this).css({
			'background-color': random_color,
			'opacity': 1
		});
	});
	setTimeout(regenerate_cells_colors, UPDATE_TIMEOUT);
}

/* Picks one of the colors randomly */
function pick_random_color() {
	var random_color_idx = pick_random_element_from_array(Object.keys(cell_colors));
	return cell_colors[random_color_idx];
}

/* Updates the player score and changes its html representation */
function update_player_score(amount) {
	player_score += amount;
	$('#score').text(player_score);
}

/* The cell click event handler */
function process_cell_click(cell_obj) {
	cell_obj.css('opacity', '0.5');
	// Update player score based on whether the cell matches his target color
	var cell_color = cell_obj.css('background-color');
	if (rgb2hex(cell_color).toUpperCase() == player_target_color.toUpperCase()) {
		update_player_score(1);
	} else {
		update_player_score(-1);
	}
}

// Utility function
function pick_random_element_from_array(array) {
	return array[Math.floor(Math.random() * array.length)];
}

// Utility function
function rgb2hex(rgb) {
	if (rgb.search("rgb") == -1) {
		return rgb;
    } else {
		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
}

$(document).ready(function() {
	// Initialize game
	init();

	// Attach cell click event handler
	$('.cell').click(function() {
		var this_cell = $(this);
		process_cell_click(this_cell);
	});
});

// Keep this for when I add levels and it automatically gets quicker and harder
// $(document).keydown(function(e) {
//     switch(e.which) {
//         case 38: // up
// 			UPDATE_TIMEOUT -= 100;
//         	break;
//         case 40: // down
// 			UPDATE_TIMEOUT += 100;
//         	break;
//         default:
// 			return;
//     }
//     e.preventDefault(); // prevent the default action (scroll / move caret)
// });
