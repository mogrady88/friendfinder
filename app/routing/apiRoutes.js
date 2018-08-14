var friendsData = require("../data/friends");

module.exports = function(app){

app.get("/api/survey", function(req, res){
    res.json(friendsData);
});

app.post("/api/survey", function(req,res){

    var newFriend = req.body;
    var match = null;
    var bestDiff = null;

    friendsData.forEach(function(element){

        var newDiff = 0;

        for(i = 0; i < element.scores.length; i++){
            var diff = Math.abs(newFriend.scores[i]-element.scores[i]);
            newDiff += diff;
        }

        if (bestDiff === null){
            bestDiff = newDiff;
            match = element;
            
        }else if(newDiff <= bestDiff){
            bestDiff = newDiff;
            match = element;
            console.log(match);
        }

    })

    friendsData.push(req.body);
    
    res.json(match);
})

}