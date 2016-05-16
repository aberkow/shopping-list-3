var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function(){
  this.items = [];
  console.log(this.items);
  this.id = 0;
};

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
    //console.log(newName);
  } else {
    this.items[indexOfIDToChange].id = idToChange;
    this.items[indexOfIDToChange].name = "Please add an item";
  }
  return newName;
}

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

//GET a full list of all items
app.get('/items', function(request, result){
  result.json(storage.items);
});

//GET an individual item by id
app.get('/items/:id', function(request, result){
  var idToCheck = request.params.id;
  for (var i = 0; i < storage.items.length; i++){
    if (storage.items[i].id == idToCheck){
      //console.log("matched " + storage.items[i]);
      result.status(201).json(storage.items[i]);
    }
  }
});

//POST (add) an item to the list.
app.post('/items', jsonParser, function(request, result){
  if (!request.body){
    return result.sendStatus(400);
  }

  var item = storage.add(request.body.name);
  result.status(201).json(item);
});

//DELETE an item from the list (by id)
app.delete('/items/:id', function(request, result){
  var idOfItem = request.params.id;
  console.log("DELETE id of item " + idOfItem);
  return result.status(storage.delete(idOfItem) ? 200 : 404).json({});
});

//PUT (change/add?) an item in the list by id
app.put('/items/:id', jsonParser, function(request, result){
  var idOfItem = request.params.id;
  if (!request.body){
    return result.sendStatus(400);
  }
  // console.log("PUT id of item " + idOfItem + "new name " + request.body.name);
  return result.status(storage.put(idOfItem, request.body.name) ? 200 : 404).json({}); //what does the empty json object do here?
});

//show which port the app is listening on
app.listen(4000, 'localhost', function(){
  console.log('Exress listening on port 4000');
});
