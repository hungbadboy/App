var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/playVideo', function(req, res, next) {
    if(req.session.passport === null || req.session.passport === undefined){
        res.redirect('/');
    } else {
        res.render('play_video',{urlVideo:'https://wms.shared.streamshow.it/carinatv/carinatv/playlist.m3u8'});
    }
});

module.exports = router;