var GRID_SIZE = 10;
var UPDATE_TIMEOUT = 1000;
var CELL_DIV_CLASS = 'cell';
var cell_colors = {
	0: '#A30000',
	1: '#0404AD',
	2: '#0f6b16'
};

function init() {
	generate_grid();
	setTimeout(regenerate_cells_colors, UPDATE_TIMEOUT);
}

function generate_grid() {
	for (var row = 0; row < GRID_SIZE; row++) {
		for (var col = 0; col < GRID_SIZE; col++) {
			var random_color = pick_random_color_for_cell();
			var cell = generate_cell('tile_' + row + 'x' + col, random_color);
			$('#grid').append(cell);
		}
	}
}

function generate_cell(cell_id, cell_background_color) {
	var cell = $("<div>", {id: cell_id, class: CELL_DIV_CLASS});
	cell.css('background-color', cell_background_color);
	return cell;
}

function regenerate_cells_colors() {
	$('.' + CELL_DIV_CLASS).each(function(i) {
		var random_color = pick_random_color_for_cell();
	    $(this).css('background-color', random_color);
	});
	setTimeout(regenerate_cells_colors, UPDATE_TIMEOUT);
}

function pick_random_color_for_cell() {
	var random_color_idx = pick_random_element_from_array(Object.keys(cell_colors));
	return cell_colors[random_color_idx];
}

function pick_random_element_from_array(array) {
	return array[Math.floor(Math.random() * array.length)];
}

// window.addEventListener("load", init);
$(document).ready(function() {
	init();
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 38: // up
			UPDATE_TIMEOUT -= 100;
        	break;
        case 40: // down
			UPDATE_TIMEOUT += 100;
        	break;
        default:
			return;
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
