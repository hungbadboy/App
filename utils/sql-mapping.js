module.exports = {
    'FIND_USER_BY_USERNAME':'SELECT * FROM user WHERE username = ?',
    'FIND_USER_BY_FBID':'SELECT * FROM user WHERE facebook_id = ?',
    'FIND_USER_BY_GOOGLEID':'SELECT * FROM user WHERE google_id = ?',
};

