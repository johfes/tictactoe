$( document ).ready(function() {
    function TicTacToe () {
        var currentPlayerIndex = 0,
            players = ["x", "o"],
            grid = $("#grid"),
            cells = $("td"),
            message = $("#msg"),
            finished = false,
            winner,
            rows = [[0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 4, 8], [2, 4, 6]],
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

        function highlightCell (cell, index) {
            var element = $("<strong></strong>");
            $(element).html( "" + $(cell).text());
            $(cell).html("");
            $(cell).append(element);
            $(cell).addClass("highlighted");
        }

        function handleWin(winnerCells) {
            winner = $(winnerCells[0]).attr("class");
            winnerCells.forEach(highlightCell);
            return winner;
        }

        function checkForWinner() {
            for(i = 0; i < rows.length; i++) {
                if (cellIsMarked(cells[rows[i][0]])
                    && $(cells[rows[i][1]]).hasClass($(cells[rows[i][0]]).attr("class"))
                    && $(cells[rows[i][2]]).hasClass($(cells[rows[i][1]]).attr("class"))
                ) {
                    return handleWin([cells[rows[i][0]], cells[rows[i][1]], cells[rows[i][2]]]) ;
                }
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

        function aiGetRandomCell() {
            while (true) {
                var x = Math.round(Math.random() * 2),
                    y = Math.round(Math.random() * 2);
                console.log(y + "_" + x);

                var cell = $("#"+y+"_"+x);
                if (!cellIsMarked(cell)) {
                    console.log('is not marked');
                    return cell;
                }
                console.log('is marked');
            }
        }

        function aiGetCriticalCell() {
            var criticalCell = null;
            for(i = 0; i < rows.length; i++) {
                criticalCell = checkRowForCriticalCell([cells[rows[i][0]], cells[rows[i][1]], cells[rows[i][2]]]);
                if(criticalCell != null) {
                    return criticalCell;
                }
            }
        }

        function checkRowForCriticalCell(rowElements)
        {
            if($(rowElements[0]).hasClass("o")  || $(rowElements[1]).hasClass("o")
                || $(rowElements[2]).hasClass("o")) {
                return null;
            }

            var firstIsMarkedBxOpponent = $(rowElements[0]).hasClass("x");
            var secondIsMarkedByOpponent = $(rowElements[1]).hasClass("x");
            var thirdIsMarkedByOpponent = $(rowElements[2]).hasClass("x");

            if (firstIsMarkedBxOpponent || secondIsMarkedByOpponent || thirdIsMarkedByOpponent) {
                if(firstIsMarkedBxOpponent)
                {
                    if(secondIsMarkedByOpponent) {
                        return rowElements[2];
                    } else if(thirdIsMarkedByOpponent) {
                        return rowElements[1];
                    }
                } else if(secondIsMarkedByOpponent)
                {
                    if(thirdIsMarkedByOpponent) {
                        return rowElements[0];
                    }
                }
            }
        }

        function markCellByAi() {
            var cell = null; //aiGetCriticalCell();

            if(cell == null)
            {
                console.log("no critical cell found");
                cell = aiGetRandomCell();
            }

            if (!cellIsMarked(cell)) {
                $(cell).addClass('o');
                $(cell).html('o');
                console.log("marked");

                handleMark();
            } else {
                console.log("already marked");
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
