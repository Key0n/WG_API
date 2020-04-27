const request = require('request-promise');
let express = require('express');
let router = express.Router();

let options = {
    method: 'GET',
    qs: {
        'application_id': process.env.APPLICATION_ID
    },
    json: true
};

const BASE_URL = 'https://api.worldoftanks.ru/wot/account/';


router.get('/info/:username', async function (req, res) {
    options.uri = BASE_URL + 'list/';
    options.qs.search = req.params.username;

    request(options).then(async function (response) {
        for (const user of response.data) {
            if (user.nickname.toLowerCase() === req.params.username) {
                options.uri = BASE_URL + 'achievements/';
                options.qs.account_id = user.account_id;
                var userId = user.account_id

                await request(options).then((respData) => {
                    return res.json(respData.data[userId])
                });
            }
        }
    }).error(function (err) {
        return res.json({error: 'Not fount'});
    });
});

module.exports = router;
