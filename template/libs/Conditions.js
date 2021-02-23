function Cnd(FEILDNAME, OPERATION, VALUE, LOGICOPT) {
  this.FEILDNAME = FEILDNAME;
  this.OPERATION = OPERATION;
  this.VALUE = VALUE;
  this.LOGICOPT = LOGICOPT;
}

function Cnds() {
  this.cond = [];
  this.order = []
};
function Oder(FEILDNAME, SORTMETHOD) {
  this.FEILDNAME = FEILDNAME
  this.SORTMETHOD = (typeof (SORTMETHOD) === 'undefined' ? 'STRING' : SORTMETHOD);
}

Cnds.prototype.addCnd = function(FEILDNAME, OPERATION, VALUE, LOGICOPT) {
  this.cond.push(new Cnd(FEILDNAME, OPERATION, VALUE, LOGICOPT));
}
Cnds.prototype.addOrder = function(FEILDNAME, SORTMETHOD) {
  this.order.push(new Oder(FEILDNAME, SORTMETHOD));
}

export {Cnds}
