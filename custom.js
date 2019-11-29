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

        function handleWin(winnerCells) {
            winner = $(winnerCells[0]).attr("class");
            //TODO highlight cells
            return winner;
        }

        function checkForWinner() {
            for (i = 0; i < 3; i++) {
                // vertical
                if (cellIsMarked(cells[i])
                    && $(cells[3+i]).hasClass($(cells[i]).attr("class"))
                    && $(cells[6+i]).hasClass($(cells[3+i]).attr("class"))
                ) {
                    return handleWin([cells[i], cells[3+i], cells[6+i]]) ;
                }

                // horizontal
                if (cellIsMarked(cells[i*3])
                    && $(cells[i*3 + 1]).hasClass($(cells[i*3]).attr("class"))
                    && $(cells[i*3 + 2]).hasClass($(cells[i*3 + 1]).attr("class"))
                ) {
                    return handleWin([cells[i*3], cells[i*3+1], cells[i*3+2]]) ;
                }
            }

            // diagonal from top left to right bottom
            if (cellIsMarked(cells[0])
                && $(cells[4]).hasClass($(cells[0]).attr("class"))
                && $(cells[8]).hasClass($(cells[4]).attr("class"))
            ) {
                return handleWin([cells[0], cells[4], cells[8]]) ;
            }

            // diagonal from right top to left bottom
            if (cellIsMarked(cells[2])
                && $(cells[4]).hasClass($(cells[2]).attr("class"))
                && $(cells[6]).hasClass($(cells[4]).attr("class"))
            ) {
                return handleWin([cells[2], cells[4], cells[6]]) ;
            }
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
                    message.html(messages[players[currentPlayerIndex] + "-wins"]);
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
