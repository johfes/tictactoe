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
        });

        function markCell() {
            var cell = event.target;

            if (!$(cell).hasClass("o") && !$(cell).hasClass("x")) {
                $(cell).addClass('x');
                $(cell).html('x');
            } else {
                console.log("Error! Already marked");
            }
        }
    }

    TicTacToe();
});
