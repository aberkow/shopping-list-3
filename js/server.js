var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//debugger;

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
  //debugger;
  var item = {
    name: name,
    id: this.id
  };
  this.items.push(item);
  this.id += 1;
  console.log(item);
  //console.log("item list " + this.items[item.name] + " " + this.items[item.id]);
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
  //debugger;
  if (hasFoundItem){
    console.log(this.items);
    this.items = this.items.slice(0, indexOfIDToRemove).concat(this.items.slice(indexOfIDToRemove + 1));
    debugger;
  }
  return hasFoundItem;
  //return this.items;
};

// Storage.prototype.delete = function(array, key, idToRemove){
//   for (var i = 0; i < this.items.length; i++){
//     if (array[i][key] === idToRemove){
//       return i;
//     }
//   }
//   return null;
//
//   //this.items[index]
//
//
//
//   //this.items.includes(idOfItem);
//   //code below slices out an item from the array at an index supplied as an argument.
//   //return this.items = this.items.slice(0, idOfItem).concat(this.items.slice(idOfItem + 1));
// };

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

//this function uses storage.delete as a callback. storage.delete wants an id as
//an argument. maybe use the hello server model to get the value of the id property?
//right now this deletes the first item in the list but not any random item selected.... getting closer.
app.delete('/items/:id', jsonParser,
function(request, result){
  if (!request.body){
    return result.sendStatus(400);
  }
  //debugger;
  var idOfItem = request.params.id;
  console.log("id of item " + idOfItem);
  //this.items = storage.delete(idOfItem);
  
  //result.status(201).json(idOfItem);
  return result.status(storage.delete(idOfItem) ? 200 : 404);


  // var itemToDelete = storage.delete(idOfItem);
  // result.status(200).json(itemToDelete);
});

app.listen(4000, 'localhost', function(){
  console.log('Exress listening on port 4000');
});
