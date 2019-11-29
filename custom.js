$( document ).ready(function() {
    function TicTacToe () {
        var currentPlayerIndex = 0,
            players = ["x", "o"],
            grid = $("#grid"),
            cells = $("td"),
            message = $("#msg"),
            finished,
            winner,
            messages = {
                "o's-turn": "It's the computer's turn.",
                "x's-turn": "It's your turn.",
                "o-wins": "Computer wins.",
                "x-wins": "You win."
            };

        $("td").click(function() {
            markCell();

            if(!finished) {
                markCellByAi();
            }
        });

        function checkForWinner() {
            //TODO implement
        }
        function checkGrid() {
            var allCellsMarked = true, i, winner;

            // all cells marked?
            for (i = 0; i < cells.length; i++) {

                if (!cellIsMarked(cells[i])) {
                    allCellsMarked = false;
                }
            }

            winner = checkForWinner();

            // game finished?
            if (allCellsMarked || winner) {
                finished = true;
                grid.addClass("finished");

                if (winner) {
                    message.html(messages[players[current] + "-wins"]);
                } else {
                    message.html("The game finished with a draw.");
                }

                // remove game listener
                $("td").prop("onclick", null).off("click");

                // new game?
                var button = $("<button></button>");
                $(button).html("New Game");
                message.append(button);

                $(button).click(function() {
                    // reset game
                    location.reload();
                });
            }
        }

        function handleMark() {
            checkGrid();

            if (!finished) {
                currentPlayerIndex = 1 - currentPlayerIndex; // switch between 0 and 1
                $(message).html(messages[players[currentPlayerIndex] + "'s-turn"]);
            }
        }

        function markCellByAi() {
            var abort = false;
            while (!abort) {
                var x = Math.round(Math.random() * 2),
                    y = Math.round(Math.random() * 2);
                console.log(x + "_" + y);

                var cell = $("#"+y+"_"+x);
                if (!cellIsMarked(cell)) {
                    $(cell).addClass('o');
                    $(cell).html('o');
                    handleMark();
                    abort = true;
                } else {
                    console.log("already marked");
                }
            }
        }

        function cellIsMarked(cell) {
            return $(cell).hasClass("o") || $(cell).hasClass("x");
        }

        function markCell() {
            var cell = event.target;

            if (!cellIsMarked(cell)) {
                $(cell).addClass('x');
                $(cell).html('x');
                handleMark();
            } else {
                console.log("Error! Already marked");
            }
        }
    }

    TicTacToe();
});
