const hash = require('../../module/hash');

module.exports = {
    new : function(body) {
        let newUser = {
            id: body.id,
            name : body.name,
            password: hash.encoding(body.password)
        };
        return newUser;
    }
}