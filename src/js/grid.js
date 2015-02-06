/**
 * Grid Class
 */
CORE.Grid = function(opts) {
    opts = opts || {};
    this.width = opts.width || 30;
    this.height = opts.height || 30;
    this.nodes = [];
    this.currentPathIndex = 0;
    this.combinations = 0;
    this.paths = [];
    this.computingTime = 0;
    this.LS = new CORE.Storage();

    this.init();
};

CORE.Grid.CELL_BACKGROUND_COLOR = '#F4F4F4';

/**
 * Initialize the grid.
 */
CORE.Grid.prototype.init = function() {

    CORE.showLoading(true);

    for (var x = 0; x < this.width; x++) {
        this.nodes[x] = [];
        for (var y = 0; y < this.height; y++) {
            this.nodes[x][y] = new CORE.Node(x, y);
        }
    }


    // generate div grid
    this.createGrid(this.width, this.height);

    // precompute paths
    this.getPaths();

    CORE.showLoading(false);


};


CORE.Grid.prototype.createGrid = function(rows, cols) {
    var grid = document.getElementById("grid");

    if (!grid) {
        return;
    }

    var margin = 8;
    var cellWidth = 40; // 10px
    var cellHeight = 40; // 10px
    var rowWidth = cols * (cellWidth + margin);

    grid.setAttribute("style", "width:" + rowWidth + 'px;margin: 0 auto;');

    for (var i = 0; i < rows; i++) {
        var row = document.createElement("div");
        row.className = 'row';
        row.id = 'row-' + i;
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("div");
            cell.className = 'cell';
            cell.id = 'cell-' + j + '-' + i;
            cell.innerText = '[' + j + ',' + i + ']'
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
};

/**
 * Return neighbouring nodes of a node
 */
CORE.Grid.prototype.getNeighbours = function(node) {

    var neighbours = [];
    //neighbors.push(this.nodes[x][y-1]);

    return {
        top: this.nodes[x][y - 1],
        right: this.nodes[x + 1][y],
        bottom: this.nodes[x][y + 1],
        left: this.nodes[x - 1][y]
    };
};

CORE.Grid.prototype._displayPath = function(path) {
    var moves = path.split('');
    var cells = [];
    var x = 0,
        y = 0;

    // initial position
    cells.push({
            x: 0,
            y: 0
        });

    for (var i = 0, l = moves.length; i <= l; i++) {
        x += (moves[i] == 1) ? 1 : 0; // move right
        y += (moves[i] == 0) ? 1 : 0; // move down

        cells.push({
            x: x,
            y: y
        });
    }

    this.clearGrid();

    // display path
    for (var i = 0, l = cells.length; i < l; i++) {
        //this.setCellColour(cells[i].x, cells[i].y, 'rgba(0,0,0,' + 1 * (i / l) + ')');
        this.setCellColour(cells[i].x, cells[i].y, 'rgba(0,0,0,1');
    }

};


CORE.Grid.prototype.setCellColour = function(row, col, colour) {
    var cellId = 'cell-' + row + '-' + col;

    try {
        var cell = document.getElementById(cellId);
        cell.style.backgroundColor = colour;
    } catch (e) {
        console.log('Error: ' + cellId);
    }
};

CORE.Grid.prototype.clearGrid = function(row, col, colour) {
    // clear grid
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
            this.setCellColour(x, y, CORE.Grid.CELL_BACKGROUND_COLOR);
        }
    }
};

CORE.Grid.prototype.displayNextPath = function() {
    if (this.currentPathIndex == this.paths.length - 1) {
        return;
    }
    this.clearGrid();
    var path = this.paths[this.currentPathIndex++];
    setTimeout(this._displayPath(path), 200);
    this.updateInfo();
};

CORE.Grid.prototype.displayPreviousPath = function() {
    if (this.currentPathIndex < 1) {
        return;
    }
    this.clearGrid();
    var path = this.paths[this.currentPathIndex--];
    setTimeout(this._displayPath(path), 200);
    this.updateInfo();
};

CORE.Grid.prototype.getPaths = function() {
    var n = this.width - 1;
    var numerator = CORE.Util.factorial(2 * n);
    var demominator = CORE.Util.factorial(n);

    this.combinations = numerator / (demominator * demominator);


    var paths = [];
    var path = '';
    var index = 0;
    var stime = Date.now();
    this.getPathsRecursive(this.width-1, 0, 0, path, paths, index, '');
    this.paths = paths;
    var ftime = Date.now();
    var delta = ftime - stime;
    this.computingTime = CORE.Util.msToHHMMSS(delta);

};

CORE.Grid.prototype.updateInfo = function() {
    var html = [];
    html.push('Grid size: ' + this.width + 'x' + this.width + '<br>');
    html.push('Path possibilities: ' + this.combinations + '<br>');
    html.push('Computing Time: ' + this.computingTime + '<br>');
    html.push('Current Path: ' + (this.currentPathIndex + 1) + '<br>');
    html.push('Current Path (string): ' + this.paths[this.currentPathIndex] + '<br>');
    // html.push('<p>Paths: ' + JSON.stringify(this.paths) + '</p>');
    CORE.Util.printInfo(html.join(''));

};

// 0=down
// 1=right
CORE.Grid.prototype.getPathsRecursive = function(n, x, y, path, paths, index, move) {
    //path += ' [' + x + ',' + y + ']';
    path += move;
    var self = this;
    setTimeout(function() {
        var progress = (self.paths.length / self.combinations) * 100;
        //CORE.Util.printProgress(progress + ' %');
    }, 0)
    if (x == n && y == n) {
        paths.push(path);
        //var dec = parseInt(path, 2);
        //paths.push(dec);

        //if (paths.length >= 1000) {
        //var value = this._serialize(paths);

        //var key = 'bucket' + '_' + index + '_' + paths.length;
        //this.LS.set(key, value);
        //index++;
        //paths = [];
        //}
    } else if (x > n || y > n) {
        return;
    } else {
        setTimeout(this.getPathsRecursive(n, x + 1, y, path, paths, index, 1), 10);
        setTimeout(this.getPathsRecursive(n, x, y + 1, path, paths, index, 0), 10);
    }
};


CORE.Grid.prototype._serialize = function(str) {
    try {
        return JSON.stringify(str)
    } catch (ex) {}
};

CORE.Grid.prototype._deserialize = function(value) {
    try {
        return JSON.parse(value);
    } catch (ex) {
        return value;
    }
};