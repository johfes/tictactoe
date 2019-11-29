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

        function aiGetRandomCell() {
            while (true) {
                var x = Math.round(Math.random() * 2),
                    y = Math.round(Math.random() * 2);
                console.log(x + "_" + y);

                var cell = $("#"+y+"_"+x);
                if (!cellIsMarked(cell)) {
                    return cell;
                }
            }
        }

        function aiGetCriticalCell() {
            var criticalCell;

            for (i = 0; i < 3; i++) {

                //vertical
                criticalCell = checkRowForCriticalCell([cells[i], cells[3 + i], cells[6 + i]]);

                if(criticalCell != null) {
                    return criticalCell;
                }

                // horizontal
                criticalCell = checkRowForCriticalCell([cells[i*3], cells[i*3 + 1], cells[i*3 + 2]]);

                if(criticalCell != null) {
                    return criticalCell;
                }
            }

            // diagonal from top left to right bottom
            criticalCell = checkRowForCriticalCell([cells[0], cells[4], cells[8]]);

            if(criticalCell != null) {
                return criticalCell;
            }

            // diagonal from right top to left bottom
            criticalCell = checkRowForCriticalCell([cells[2], cells[4], cells[6]]);

            if(criticalCell != null) {
                return criticalCell;
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
            var cell = aiGetCriticalCell();

            if(cell == null)
            {
                console.log("no critical cell found");
                cell = aiGetRandomCell();
            }

            if (!cellIsMarked(cell)) {
                $(cell).addClass('o');
                $(cell).html('o');

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
