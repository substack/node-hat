var hat = require('../');
var assert = require('assert');

describe('rack', function () {

    it("should avoid collisions and match expected pattern", function () {
      var rack = hat.rack(4);
      var seen = {};
      for (var i = 0; i < 8; i++) {
          var id = rack();
          assert.ok(!seen[id], 'seen this id');
          seen[id] = true;

          assert.ok(id.match(/^[0-9a-f]$/));
      }
    });

    it("should throw when there's a collision", function () {
      assert.throws(function () {
          for (var i = 0; i < 10; i++) rack()
      });
    });


  it("should set and get data as expected", function () {
      var rack = hat.rack(64);
      var a = rack('a!');
      var b = rack("it's a b!")
      var c = rack([ 'c', 'c', 'c' ]);

      assert.equal(rack.get(a), 'a!');
      assert.equal(rack.get(b), "it's a b!");
      assert.deepEqual(rack.get(c), [ 'c', 'c', 'c' ]);

      assert.equal(rack.hats[a], 'a!');
      assert.equal(rack.hats[b], "it's a b!");
      assert.deepEqual(rack.hats[c], [ 'c', 'c', 'c' ]);

      rack.set(a, 'AAA');
      assert.equal(rack.get(a), 'AAA');
  });


  describe('expandBy', function () {
    it("should work as expected", function () {
      var rack = hat.rack(4, 16, 4);
      var seen = {};
      
      for (var i = 0; i < 8; i++) {
          var id = rack();
          assert.ok(!seen[id], 'seen this id');
          seen[id] = true;
          assert.ok(id.match(/^[0-9a-f]$/));
      }
      
      for (var i = 0; i < 8; i++) {
          var id = rack();
          assert.ok(!seen[id], 'seen this id');
          seen[id] = true;
          assert.ok(id.match(/^[0-9a-f]{1,2}$/));
      }
      
      for (var i = 0; i < 8; i++) {
          var id = rack();
          assert.ok(!seen[id], 'seen this id');
          seen[id] = true;
          assert.ok(id.match(/^[0-9a-f]{2}$/));
      }
    });
  });
});
