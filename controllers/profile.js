const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    //on ES6, when an object has the same name of the property and the value,
    //you don't need to white id: id
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('no user found')
        }
    })
    .catch(() => res.status(404).json('error getting user'))
}

// export default handleProfileGet;

module.exports = {
    handleProfileGet: handleProfileGet
};
