
module.exports = function Carpool(fn, ln, l1, l2, d){
    this._fname = fn;
    this._lname = ln;
    this._loc = [l1, l2];
    this._days = d;
    this._participants = {};
    this.fname = function(){
        return this._fname;
    }
}

