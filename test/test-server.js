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
          res.should.have.status(200);
        });
  });
  it('should list an individual item on GET by id');
  it('should add an item on POST');
  it('should edit an item on PUT');
  it('should delete an item on DELETE');
  it('should return 404 if you DELETE an item that doesn\'t exist');
});
