var hat = require('../');
var assert = require('assert');

function digits (bits, base) {
    return Math.ceil(
        Math.log(parseInt(Array(bits + 1).join('1'), 2)
    ) / Math.log(base));
}

describe('hat', function() {
  describe('lengths', function () {
      it("4 bits of randomness should return strings of length 1", function () {
        for (var i = 0; i < 10; i++) {
            assert.equal(hat(4).length, 1);
        }
      });
      
      it("3 bits of randomness should return strings of length 1", function () {
        for (var i = 0; i < 10; i++) {
            assert.equal(hat(3).length, 1);
        }
      });
      
      it("32 and and 33 bit return strings of expected length", function () {
          var d = digits(32, 16);
          for (var i = 0; i < 10; i++) {
              assert.equal(hat(32, 16).length, d);
              assert.equal(hat(33, 16).length, d + 1);
          }
      });
  });
  
  describe('range', function () {
      it("should produce values in expected range", function () {
        for (var base = 2; base < 32; base++) {
            for (var bits = 0; bits < 256; bits += base) {
                for (var k = 0; k < 10; k++) {
                    var id = hat(bits, base);
                    var iid = parseInt(id, base);
                    assert.ok(iid >= 0);
                    assert.ok(iid < Math.pow(2, bits));
                }
            }
        }
    });
  });
  
  describe('large bit sizes', function () {
      it("bit size of 1024 should produce length of 256", function () {
        var id = hat(1024);
        assert.equal(id.length, 256);
      });
  
      it("bit size of 2048 should produce length of 512", function () {
        var id = hat(2048);
        assert.equal(id.length, 512);
      });
  });
});
