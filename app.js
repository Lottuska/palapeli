$( function () {
    // Pop up button for a new game
    $( ".container" ).append(`<div id="popup">
        <div id="popupContent">
            <p>Siirrä palat oikeille paikoilleen!</p>
            <button id="startBtn">Aloita peli</button>
        </div>
    </div>`
    );
    $( "#popup" ).css({
        "background":"rgba(0, 0, 0, 0.4)"
    });
    $( "#popup" ).on("click", "#startBtn", function () {
        $( "#popup" ).remove();
    });

    // Timer
    $(document).ready(function (){
        var i = 1;
        $( "#startBtn" ).click(function () {
            var timer = setInterval(function () {
                // Calculate time
                $( "#time" ).html(i + " sekuntia");
                i++;
                // Count correct placements
                var numItems = $( ".ui-draggable-disabled" ).length;
                // Stop timer when puzzle is completed
                if (numItems === 12) {
                    clearInterval(timer);
                    resultTime = i-1;
                    // Star ratings
                    if (resultTime <= 15 ) {
                        var response = "Erinomaista!";
                        var result = `<span class="material-icons md-48 yellow">star</span>
                        <span class="material-icons md-48 yellow">star</span>
                        <span class="material-icons md-48 yellow">star</span>`;
                    }
                    else if ((resultTime > 15) && (resultTime <= 30)) {
                        var response = "Hienoa!";
                        var result = `<span class="material-icons md-48 yellow">star</span>
                        <span class="material-icons md-48 yellow">star</span>
                        <span class="material-icons md-48 grey">star</span>`;
                    }
                    else {
                        var response = "Hyvä!";
                        var result = `<span class="material-icons md-48 yellow">star</span>
                        <span class="material-icons md-48 grey">star</span>
                        <span class="material-icons md-48 grey">star</span>`;
                    }
                    // Pop up, after completing the puzzle
                    $( ".container" ).append(`<div id="popupComplete">
                        <div id="popupContent">
                            <h1>` + response + `</h1>
                            <p>Aikasi: ` + resultTime + ` sekuntia</p>
                            <div id="starRating">` + result + `</div>
                            <button id="startBtnComplete">Uudelleen</button>
                        </div>
                    </div>`);
                    $( "#popupComplete" ).css({
                        "background":"rgba(0, 0, 0, 0.4)"
                    });
                    $( "#popupComplete" ).on("click", "#startBtnComplete", function () {
                        $( "#popupComplete" ).remove();
                        location.reload();
                    });
                }
            }, 1000);
        });
    });

    // Puzzle pieces and empty puzzle pattern
    $( "#game" ).html( `<div class="draggable 1"> <img src="images/1.png"> </div>
            <div class="draggable 2"> <img src="images/2.png"> </div>
            <div class="draggable 3"> <img src="images/3.png"> </div>
            <div class="draggable 4"> <img src="images/4.png"> </div>
            <div class="draggable 5"> <img src="images/5.png"> </div>
            <div class="draggable 6"> <img src="images/6.png"> </div>
            <div class="draggable 7"> <img src="images/7.png"> </div>
            <div class="draggable 8"> <img src="images/8.png"> </div>
            <div class="draggable 9"> <img src="images/9.png"> </div>
            <div class="draggable 10"> <img src="images/10.png"> </div>
            <div class="draggable 11"> <img src="images/11.png"> </div>
            <div class="draggable 12"> <img src="images/12.png"> </div>
            
            <table>
                <tr>
                    <td class="droppable 1"></td>
                    <td class="droppable 2"></td>
                    <td class="droppable 3"></td>
                </tr>
                <tr>
                    <td class="droppable 4"></td>
                    <td class="droppable 5"></td>
                    <td class="droppable 6"></td>
                </tr>
                <tr>
                    <td class="droppable 7"></td>
                    <td class="droppable 8"></td>
                    <td class="droppable 9"></td>
                </tr>
                <tr>
                    <td class="droppable 10"></td>
                    <td class="droppable 11"></td>
                    <td class="droppable 12"></td>
                </tr>
            </table>`
    );

    // Puzzle pieces
    $( ".draggable" ).draggable({
        stack: ".draggable",
        opacity: 0.7
    });

    // Place the pieces on the sides of the game
    $( ".draggable:nth-of-type(even)" ).each(function (index) {
        $(this).css({
            left: Math.random() * (($( "#game" ).width())/2 - (300) - $(this).width()),
            top: Math.random() * ($( "#game" ).height() - $(this).height())
        });
    });
    $( ".draggable:nth-of-type(odd)" ).each(function (index) {
        $(this).css({
            right: Math.random() * (($( "#game" ).width())/2 - (300) - $(this).width()),
            top: Math.random() * ($( "#game" ).height() - $(this).height())
        });
    });

    // Drop area
    $( ".droppable" ).droppable({
        tolerance: "intersect",
        drop: function(event, ui) {
            var drop = $(this).offset();
            var drag = ui.draggable.offset();
            var leftEnd = drop.left - drag.left + 1;
            var topEnd = drop.top - drag.top + 1;
            ui.draggable.animate({
                top: '+=' + topEnd,
                left: '+=' + leftEnd
            });
            // Disable moving after right placement
            ui.draggable.draggable( "disable" );
        }
    });

    // Accept correct puzzle piece
    $( ".droppable.1" ).droppable({ accept: ".draggable.1" });
    $( ".droppable.2" ).droppable({ accept: ".draggable.2" });
    $( ".droppable.3" ).droppable({ accept: ".draggable.3" });
    $( ".droppable.4" ).droppable({ accept: ".draggable.4" });
    $( ".droppable.5" ).droppable({ accept: ".draggable.5" });
    $( ".droppable.6" ).droppable({ accept: ".draggable.6" });
    $( ".droppable.7" ).droppable({ accept: ".draggable.7" });
    $( ".droppable.8" ).droppable({ accept: ".draggable.8" });
    $( ".droppable.9" ).droppable({ accept: ".draggable.9" });
    $( ".droppable.10" ).droppable({ accept: ".draggable.10" });
    $( ".droppable.11" ).droppable({ accept: ".draggable.11" });
    $( ".droppable.12" ).droppable({ accept: ".draggable.12" });
});