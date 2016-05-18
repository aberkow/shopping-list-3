var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../js/server.js');

var should = chai.should();
var assert = chai.assert;
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping list', function(){
  it('should list items on GET', function(done){
    chai.request(app)
        .get('/items')
        .end(function(err, res){
          res.should.have.status(200); //this works though...
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length(3);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].id.should.be.a('number');
          res.body[0].name.should.be.a('string');
          res.body[0].name.should.equal('Broad beans');
          res.body[1].name.should.equal('Tomatoes');
          res.body[2].name.should.equal('Peppers');
          done();
        });
  });
  it('should list an individual item on GET by id', function(done){
    chai.request(app)
        .get('/items/0')
        .end(function(err, res){
          console.log(res.body);
          debugger;
          res.should.have.status(200); //this is actually 304???
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.id.should.be.a('number');
          res.body.name.should.be.a('string');
          res.body.name.should.equal('Broad beans');
          done();
        });
  });

  it('should add an item on POST', function(done){
    chai.request(app)
        .post('/items')
        .send({'name': 'Kale'})
        .end(function(err, res){
          console.log(res.body);
          should.equal(err, null);
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('id');
          res.body.name.should.be.a('string');
          res.body.id.should.be.a('number');
          res.body.name.should.equal('Kale');
          storage.items.should.have.length(4)
          storage.items[3].should.be.a('object');
          storage.items[3].should.have.property('id');
          storage.items[3].should.have.property('name');
          storage.items[3].id.should.be.a('number');
          storage.items[3].name.should.be.a('string');
          storage.items[3].name.should.equal('Kale');
          done();
        });
  });
  it('should edit an item on PUT', function(){
    
  });
  it('should delete an item on DELETE');
  it('should return 404 if you DELETE an item that doesn\'t exist');
});
