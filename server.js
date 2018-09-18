var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(__dirname+'/public/dist/public'));

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }

var GameSchema = new mongoose.Schema({
    gold: {type: Number, default:0 ,required:false},
    activity: {type: [], required:false},
    name:{type: String, required:false}
    },{timestamps: true})

mongoose.model('Tony', GameSchema);
var Game = mongoose.model('Tony')

app.get('/new', function(req, res) {
    Game.create({}, function(err, game) {
        if(err) {
            console.log("Couldn't create", err);
            res.json({message: false, data: game});
        }
        else {
            console.log("New game!");

            res.json({message: true, data: game});
        }
    })
})

app.get('/getIt/:id', function(req, res){
    console.log(req.params.id)
    Game.findOne({_id: req.params.id}, function(err, result){
        if (err){
            console.log("Error finding in server")
            res.json({message:false, data:err})
        }
        else{
            console.log("Found result")
            console.log(result)
            res.json({message:true, data:result})
        }
    })
})

app.get('/add/:num/:id', function(req, res){
    console.log("In Server");
    if(req.params.num == 1) {
        var rand = Math.floor(Math.random() * 11)+10;
        console.log(rand); 
        Game.findOne({_id:req.params.id}, function(err, result){
            var sum = (result.gold += rand);
            var notify = `You got ${rand} from the Farm`;
               Game.updateOne({_id: req.params.id}, {$set: {gold:sum}}, function(err){
                if(err){
                    console.log("Update Error error", err);
                    res.json({message: false, data: err})
                }
                else {
                    Game.updateOne({_id: req.params.id}, {$push: {activity: notify}}, function(err){
                        if(err){
                            console.log("fucked up at second update")
                            res.json({message: false, data: err})
                        }
                        else{

                        
                        console.log('Updated Nicely')
                        res.json({message: true , data: result.gold})
                        }
                    })
                
                }
            })
        })
    }

    if(req.params.num == 2) {
        var rand = Math.floor(Math.random() * 6)+5;
        console.log(rand); 
        Game.findOne({_id:req.params.id}, function(err, result){
            var sum = (result.gold += rand);
            var notify = `You got ${rand} from the Cave`;
               Game.updateOne({_id: req.params.id}, {$set: {gold:sum}}, function(err){
                if(err){
                    console.log("Update Error error", err);
                    res.json({message: false, data: err})
                }
                else {
                    Game.updateOne({_id: req.params.id}, {$push: {activity: notify}}, function(err){
                        if(err){
                            console.log("fucked up at second update")
                            res.json({message: false, data: err})
                        }
                        else{

                        
                        console.log('Updated Nicely')
                        res.json({message: true , data: result.gold})
                        }
                    })
                
                }
            })
        })
    }
    if(req.params.num == 3) {
        var rand = Math.floor(Math.random() * 4)+2;
        console.log(rand); 
        Game.findOne({_id:req.params.id}, function(err, result){
            var sum = (result.gold += rand);
            var notify = `You got ${rand} from the House`;
               Game.updateOne({_id: req.params.id}, {$set: {gold:sum}}, function(err){
                if(err){
                    console.log("Update Error error", err);
                    res.json({message: false, data: err})
                }
                else {
                    Game.updateOne({_id: req.params.id}, {$push: {activity: notify}}, function(err){
                        if(err){
                            console.log("fucked up at second update")
                            res.json({message: false, data: err})
                        }
                        else{

                        
                        console.log('Updated Nicely')
                        res.json({message: true , data: result.gold})
                        }
                    })
                
                }
            })
        })

        
    }
    if(req.params.num == 4) {
        var random = Math.floor(Math.random() * 2) 
        if(random == 0) {
            var rand = Math.floor(Math.random() * 51);
            console.log(rand); 
            Game.findOne({_id:req.params.id}, function(err, result){
                var sum = (result.gold += rand);
                var notify = `You got ${rand} from the Casino`;
                   Game.updateOne({_id: req.params.id}, {$set: {gold:sum}}, function(err){
                    if(err){
                        console.log("Update Error error", err);
                        res.json({message: false, data: err})
                    }
                    else {
                        Game.updateOne({_id: req.params.id}, {$push: {activity: notify}}, function(err){
                            if(err){
                                console.log("fucked up at second update")
                                res.json({message: false, data: err})
                            }
                            else{
    
                            
                            console.log('Updated Nicely')
                            res.json({message: true , data: result.gold})
                            }
                        })
                    
                    }
                })
            })
        }
        else {
            var rand = Math.floor(Math.random() * 51);
            console.log(rand); 
            Game.findOne({_id:req.params.id}, function(err, result){
                var sum = (result.gold -= rand);
                var notify = `You lost ${rand} from the Casino`;
                   Game.updateOne({_id: req.params.id}, {$set: {gold:sum}}, function(err){
                    if(err){
                        console.log("Update Error error", err);
                        res.json({message: false, data: err})
                    }
                    else {
                        Game.updateOne({_id: req.params.id}, {$push: {activity: notify}}, function(err){
                            if(err){
                                console.log("fucked up at second update")
                                res.json({message: false, data: err})
                            }
                            else{
    
                            
                            console.log('Updated Nicely')
                            res.json({message: true , data: result.gold})
                            }
                        })
                    
                    }
                })
            })
        }

        
    }
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})