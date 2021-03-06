const request = require('request');
const BOJ = require('../../modules/boj');

module.exports = {
    getUser(req, res){
        const handle = req.params[0];
        const url = 'https://api.solved.ac/v2/users/show.json?id=' + handle;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.getUser(handle, body));
        });
    },
    getRandomProblem(req, res){
        const query = encodeURI(req.params[0]);
        const url = 'https://api.solved.ac/search/random_search.json?query=' + query;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.randomProblem(query, body));
        });
    },
    searchProblem(req, res){
        const query = encodeURI(req.params[0]);
        const url = 'https://api.solved.ac/search/search_recommendations.json?query=' + query;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.searchProblem(query, body));
        });
    },
    getProblemTag(req, res){
        const prob = req.params[0];
        const url = 'https://api.solved.ac/v2/problems/show.json?id=' + prob;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.getProblemTag(prob, body));
        });
    },
    getProblemName(req, res) {
        const prob = req.params[0];
        const url = 'https://api.solved.ac/v2/problems/show.json?id=' + prob;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.getProblemName(prob, body));
        });
    }
};
