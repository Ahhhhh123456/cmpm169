$(document).ready(function(){
    var words = {
        story: {
            "origin": ["#beginning# #middle#"],
            "beginning": [
                "I leveled up to the max level", 
                "I got transported into another world", 
                "Who would've thought I would become part of a #character#'s cult",
                "How I ended up becoming a #character#", 
                "I became the most infamous #character# of this new world", 
                "I became the best #noun# detective", 
                "My new life as the #character# comes to a turn" 
            ],
            "middle": [ 
                "by killing #character#'s all day", 
                "through sheer willpower",
                "by eradicating all of the #character#'s",
                "after killing the #character#",
                "after figuring out how #character#'s live",
                "after utilizing a #noun# to my advantage",
                "through the use of 100 #character#'s'",
                "after finding the most wanted #noun# "
            ],
            "character": ["#adjective# #noun#"],
            "adjective": ["insane", "corrupt", "sadistic", "popular",
                "sleepy", "hungry", "strongest", "weakest", "smartest"],
            "noun": ["slime", "ruler", "goblin", "hero", "mage", 
                "bear", "ant", "bird", "doctor", "criminal"],
            "images": [ 
                "slime.jpg", "king.jpg", "goblin.jpg", "robber.jpg", "ant.png", "bird.jpg"
            ] // List of images in your folder
        }
    };

    $('#buttonTrigger').click(function(){
        loadGrammar();
    });

    function loadGrammar(){
        var grammar = tracery.createGrammar(words["story"]);
        var storyText = grammar.flatten('#origin#');
        var randomImage = words.story.images[Math.floor(Math.random() * words.story.images.length)];

        $('#output').html(`
            <div>${storyText}</div>
            <img src="./js/images/${randomImage}" alt="Generated Story Image" style="width:300px; height:auto; margin-top:10px;">
        `);
        console.log("Story and image generated!");
    }

    setTimeout(function() {
        loadGrammar();
    }, 10);
});
