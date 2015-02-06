CORE.Util.printOutput = function(str) {
    var node = document.getElementById("debug");
    for (var i = 0, l = str.length; i < l; i++) {
        node.innerHTML += "path [" + i + "]: " + str[i] + "</br>";
    }
};

CORE.Util.print = function(str) {
    var node = document.getElementById("debug");
    node.innerHTML = str;

};

CORE.Util.printInfo = function(str) {
    var node = document.getElementById("info");
    node.innerHTML = str;

};

CORE.Util.printProgress = function(str) {
    var node = document.getElementById("progress");
    node.innerHTML = str;

};

CORE.Util.msToHHMMSS = function(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};


CORE.Util.factorial = function(n) {
    var value = 1;
    for (var i = 2; i <= n; i++) {
        value = value * i;
    }
    return value;
};

CORE.showLoading = function(show) {
    if (show) {
        document.getElementById('progress').style.display = 'block';
    } else {
        document.getElementById('progress').style.display = 'none';
    }
};


CORE.initControls = function(grid) {
    var btnPrev = document.getElementById("btn-prev");
    var btnNext = document.getElementById("btn-next");
    var btnClear = document.getElementById("btn-clear");

    // attrach button events
    btnClear.onclick = function() {
        grid.clearGrid();
    };
    btnNext.onclick = function() {
        grid.displayNextPath();
    };
    btnPrev.onclick = function() {
        grid.displayPreviousPath();
    };
};

CORE.main = function() {
    var options = {
        width: 10,
        height: 10
    };
    CORE.showLoading(false);

    var grid = new CORE.Grid(options);
    CORE.initControls(grid);
    grid.updateInfo();

}


CORE.main();