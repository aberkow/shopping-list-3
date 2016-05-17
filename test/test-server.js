var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../js/server.js');

var should = chai.should();
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
  /*
  it('should list an individual item on GET by id', function(done){
    chai.request(app)
        .get('/items/id')
        .end(function(err, res){
          res.should.have.status(200); //this is actually 304???
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('name');
          res.body[0].id.should.be.a('number');
          res.body[0].name.should.be.a('string');
          res.body[0].name.should.equal('Broad beans');
        });
  });
  */
  it('should add an item on POST'), function(done){
    chai.request(app)
        .post('/items')
        .send({name: 'Kale'});
        .end(function(err, res){
          should.equal(err, null);
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('id');
          res.body.name.should.be.a('string');
          res.body.id.should.be.a('number');
          res.body.name.should.equal('Kale');
          storage.items.should.have.length('4')
        });
  };
  it('should edit an item on PUT');
  it('should delete an item on DELETE');
  it('should return 404 if you DELETE an item that doesn\'t exist');
});
