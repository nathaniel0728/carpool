
module.exports = function Carpool(fn, ln, dsc, em, phn, l1, l2, d){
    this._fname = fn;
    this._lname = ln;
    this._desc = dsc;
    this._email = em;
    this._phone = phn;
    this._loc = [l1, l2];
    this._days = d;
    this._participants = {};
    this.fname = function(){
        return this._fname;
    }
    this.addParticipant = function(fname, lname, email, phn, d){
        var info = [fname, lname, email, phn];
        this._participants.push({
            key: info,
            value: d
        })
    }
}

