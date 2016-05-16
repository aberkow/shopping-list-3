var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function(){
  //creating one object suggested by Jim C. See note below
  // this.items = {
  //   0: "carrots",
  //   1: "something"
  // };
  this.items = [];
  console.log(this.items);
  this.id = 0;
};
//empty string might be needed here but not on line 18
// this.items[this.id + ''] = "something"
// delete this.items[id];

//var index = this.items[index]

//var list = [];


Storage.prototype.add = function(name){

  var item = {
    name: name,
    id: this.id
  };
  this.items.push(item);
  this.id += 1;
  console.log(item);
  return item;
};

//takes in the id of an item and uses splice to remove/return the new array.
Storage.prototype.delete = function(idToRemove){
  var indexOfIDToRemove;
  var hasFoundItem = false;
  this.items.some(function (item, index, array){
    if (item.id.toString() === idToRemove.toString()){
      indexOfIDToRemove = index;
      hasFoundItem = true;
      return true;
    }
  });

  if (hasFoundItem){
    console.log(this.items);
    this.items = this.items.slice(0, indexOfIDToRemove).concat(this.items.slice(indexOfIDToRemove + 1));
    debugger;
  }
  return hasFoundItem;
};
/*
FInd the item at the index and change the name property of this.item. If there is no id at that point, create a new ID and add the name to it ------- What's the difference between this and POST? Why use POST?
*/
Storage.prototype.put = function(idToChange, newName){
  var indexOfIDToChange;
  var hasFoundItem = false;
  var newName;
  this.items.some(function(item, index, array){
    if (item.id.toString() === idToChange.toString()){
      indexOfIDToChange = index;
      hasFoundItem = true;
      return true;
    }
  });
  if (hasFoundItem){

    this.items[indexOfIDToChange].name = newName;
    console.log(newName);
  }
  return newName;
}

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, result){
  result.json(storage.items);
});

//it looks like this returns a number = how many ids there are starting at 1.
app.get('/items/:id', function(request, result){
  result.json(storage.id);
});

app.post('/items', jsonParser, function(request, result){
  if (!request.body){
    return result.sendStatus(400);
  }

  var item = storage.add(request.body.name);
  result.status(201).json(item);
});

app.delete('/items/:id', function(request, result){
  var idOfItem = request.params.id;
  console.log("DELETE id of item " + idOfItem);
  return result.status(storage.delete(idOfItem) ? 200 : 404).json({});

});

app.put('/items/:id', jsonParser, function(request, result){
  var idOfItem = request.params.id;
  if (!request.body){
    return result.sendStatus(400);
  }
  //debugger;
  console.log("PUT id of item " + idOfItem + "new name " + request.body.name);
  debugger;
  return result.status(storage.put(idOfItem, request.body.name) ? 200 : 404).json({}); //what does the empty json object do here?
});

app.listen(4000, 'localhost', function(){
  console.log('Exress listening on port 4000');
});
