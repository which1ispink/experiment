var GRID_SIZE = 10;
var GRID_DIV_ID = 'grid';
var GRID_UPDATE_INTERVAL = 1000;
var CELL_DIV_CLASS = 'cell';
var cell_colors = {
	0: '#A30000',
	1: '#0404AD',
	2: '#0b7913'
};

function init() {
	generate_grid();
	setInterval(regenerate_cells_colors, GRID_UPDATE_INTERVAL);
}

function generate_grid() {
	for (var row = 0; row < GRID_SIZE; row++) {
		for (var col = 0; col < GRID_SIZE; col++) {
			var random_color = pick_random_color_for_cell();
			var cell = generate_cell('tile_' + row + 'x' + col, random_color);
			$('#' + GRID_DIV_ID).append(cell);
		}
	}
}

function generate_cell(cell_id, cell_background_color) {
	var cell = $("<div>", {id: cell_id, class: CELL_DIV_CLASS});
	cell.css('background-color', cell_background_color);
	return cell;
}

function pick_random_element_from_array(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function pick_random_color_for_cell() {
	var random_color_idx = pick_random_element_from_array(Object.keys(cell_colors));
	return cell_colors[random_color_idx];
}

function regenerate_cells_colors() {
	$('.' + CELL_DIV_CLASS).each(function(i) {
		var random_color = pick_random_color_for_cell();
	    $(this).css('background-color', random_color);
	});
}

window.addEventListener("load", init);
