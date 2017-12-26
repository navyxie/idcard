var should = require('should');
var idCard = require('../lib/index');
describe('#idCard#', function() {
  describe('verify()', function() {
    it('it must be no ok', function() {
      idCard.verify('440882199102104190').should.be.false();
    });
    it('it must be ok', function() {
      idCard.verify('440882199102104195').should.be.true();
    });
    it('it must be ok', function() {
      idCard.verify('44522119901117536X').should.be.false();
    });
    it('it must be ok', function() {
      idCard.verify('44522119901117536').should.be.false();
    });
    it('it must be ok', function() {
      idCard.verify(440882199102104190).should.be.false();
    });
    it('it must be ok', function() {
      var randIdcard = idCard.generateIdcard();
      idCard.verify(randIdcard).should.be.true();
    });
    it('it must be ok', function() {
      var randIdcard = idCard.generateIdcard();
      idCard.verify(randIdcard).should.be.true();
    });
    it('it must be ok', function() {
      var randIdcard = idCard.generateIdcard();
      idCard.verify(randIdcard).should.be.true();
    });
    it('it must be ok', function() {
      var randIdcard = idCard.generateIdcard({
        year: '',
        monty: '',
        date: '',
        province: '',
        city: '',
        area: ''
      });
      idCard.verify(randIdcard).should.be.true();
    });
  });
  describe('info()', function() {
    it('it must be not ok', function() {
      var info = idCard.info('');
      info.valid.should.be.false();
    });
    it('it must be ok', function() {
      var info = idCard.info('440882199102104195');
      info.valid.should.be.true();
      info.province.code.should.be.equal("440000");
      // info.age.should.be.equal(25);
    });
    it('it must be ok', function() {
      var info = idCard.info('440882199102104195');
      info.valid.should.be.true();
      info.constellation.should.be.equal("水瓶");
    });
    it('it must be ok', function() {
      var info = idCard.info('44522119901117536X');
      info.valid.should.be.false();
      info.province.code.should.be.equal("440000");
    });
    it('it must be ok', function() {
      var info = idCard.info('14522119901117536X');
      info.valid.should.be.false();
      info.city.should.be.empty();
      info.province.code.should.be.equal("140000");
    });
    it('it must be not ok', function() {
      var info = idCard.info('04522119901117536X');
      info.valid.should.be.false();
      should.not.exist(info.province);
    });
    it('it must be not ok', function() {
      var info = idCard.info('440101199801218451');
      info.valid.should.be.true();
      info.constellation.should.be.equal('水瓶');
    });
    it('it must be not ok', function() {
      var info = idCard.info('220403199801042597');
      info.valid.should.be.true();
      info.constellation.should.be.equal('摩羯');
    });
    it('it must be not ok', function() {
      var info = idCard.info('152101199802202278');
      info.valid.should.be.true();
      info.constellation.should.be.equal('双鱼');
    });
    it('it must be not ok', function() {
      var info = idCard.info('220501199802016852');
      info.valid.should.be.true();
      info.constellation.should.be.equal('水瓶');
    });
    it('it must be not ok', function() {
      var info = idCard.info('220401199803214011');
      info.valid.should.be.true();
      info.constellation.should.be.equal('白羊');
    });
    it('it must be not ok', function() {
      var info = idCard.info('210601199803011619');
      info.valid.should.be.true();
      info.constellation.should.be.equal('双鱼');
    });
    it('it must be not ok', function() {
      var info = idCard.info('320501199804213933');
      info.valid.should.be.true();
      info.constellation.should.be.equal('金牛');
    });
    it('it must be not ok', function() {
      var info = idCard.info('310101199804017656');
      info.valid.should.be.true();
      info.constellation.should.be.equal('白羊');
    });
    it('it must be not ok', function() {
      var info = idCard.info('220301199805229617');
      info.valid.should.be.true();
      info.constellation.should.be.equal('双子');
    });
    it('it must be not ok', function() {
      var info = idCard.info('36060119980521413X');
      info.valid.should.be.true();
      info.constellation.should.be.equal('金牛');
    });
    it('it must be not ok', function() {
      var info = idCard.info('330501199806220493');
      info.valid.should.be.true();
      info.constellation.should.be.equal('巨蟹');
    });
    it('it must be not ok', function() {
      var info = idCard.info('320701199806218835');
      info.valid.should.be.true();
      info.constellation.should.be.equal('双子');
    });
    it('it must be not ok', function() {
      var info = idCard.info('220501199807231471');
      info.valid.should.be.true();
      info.constellation.should.be.equal('狮子');
    });
    it('it must be not ok', function() {
      var info = idCard.info('230501199807226754');
      info.valid.should.be.true();
      info.constellation.should.be.equal('巨蟹');
    });
    it('it must be not ok', function() {
      var info = idCard.info('210801199808236850');
      info.valid.should.be.true();
      info.constellation.should.be.equal('处女');
    });
    it('it must be not ok', function() {
      var info = idCard.info('320801199808228952');
      info.valid.should.be.true();
      info.constellation.should.be.equal('狮子');
    });
    it('it must be not ok', function() {
      var info = idCard.info('230801199809249294');
      info.valid.should.be.true();
      info.constellation.should.be.equal('天秤');
    });
    it('it must be not ok', function() {
      var info = idCard.info('341101199809231578');
      info.valid.should.be.true();
      info.constellation.should.be.equal('处女');
    });
    it('it must be not ok', function() {
      var info = idCard.info('331001199810243894');
      info.valid.should.be.true();
      info.constellation.should.be.equal('天蝎');
    });
    it('it must be not ok', function() {
      var info = idCard.info('320801199810238359');
      info.valid.should.be.true();
      info.constellation.should.be.equal('天秤');
    });
    it('it must be not ok', function() {
      var info = idCard.info('340701199811239730');
      info.valid.should.be.true();
      info.constellation.should.be.equal('射手');
    });
    it('it must be not ok', function() {
      var info = idCard.info('341001199811226799');
      info.valid.should.be.true();
      info.constellation.should.be.equal('天蝎');
    });
    it('it must be not ok', function() {
      var info = idCard.info('331001199812229914');
      info.valid.should.be.true();
      info.constellation.should.be.equal('摩羯');
    });
    it('it must be not ok', function() {
      var info = idCard.info('330801199812217019');
      info.valid.should.be.true();
      info.constellation.should.be.equal('射手');
    });
    it('it must be not ok', function() {
      var info = idCard.info('440882199100201232');
      info.valid.should.be.false();
      info.age.should.be.equal(0);
    });
  });
  describe('constellation()', function() {
    it('it must be ok', function() {
      idCard.constellation('19910210').should.be.equal("水瓶");
    });
    it('it must be ok', function() {
      idCard.constellation(19910210).should.be.equal("水瓶");
    });
    it('it must be ok', function() {
      idCard.constellation(19910120).should.be.equal("摩羯");
    });
    it('it must be ok', function() {
      idCard.constellation(19910121).should.be.equal("水瓶");
    });
    it('it must be ok', function() {
      idCard.constellation(19910220).should.be.equal("双鱼");
    });
    it('it must be ok', function() {
      idCard.constellation(19910219).should.be.equal("水瓶");
    });
    it('it must be ok', function() {
      idCard.constellation(19910321).should.be.equal("白羊");
    });
    it('it must be ok', function() {
      idCard.constellation(19910320).should.be.equal("双鱼");
    });
    it('it must be ok', function() {
      idCard.constellation(19910421).should.be.equal("金牛");
    });
    it('it must be ok', function() {
      idCard.constellation(19910420).should.be.equal("白羊");
    });
    it('it must be ok', function() {
      idCard.constellation(1991052245).should.be.equal("双子");
    });
    it('it must be ok', function() {
      idCard.constellation('1991-02-10', '-').should.be.equal("水瓶");
    });
    it('it must be ok', function() {
      idCard.constellation('1991/03/10', '/').should.be.equal("双鱼");
    });
  });
  describe('getAge()', function() {
    it('should be ok', function() {
      idCard.getAge('19910323').should.be.aboveOrEqual(25);
    })
  })
  describe('upgrade15To18()', function() {
    it('should be ok', function() {
      var result = idCard.upgrade15To18('422201720809227');
      result.card.should.be.equal('422201197208092274');
      result.code.should.be.equal(0);
    })
    it('should be not ok', function() {
      idCard.upgrade15To18('42220172080927').code.should.be.equal(-1)
    })
  })
})