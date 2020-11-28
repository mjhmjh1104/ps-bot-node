const Util = require('./Util.js');

const tier = ['unranked', 'bronze5', 'bronze4', 'bronze3', 'bronze2', 'bronze1',
    'silver5', 'silver4', 'silver3', 'silver2', 'silver1',
    'gold5', 'gold4', 'gold3', 'gold2', 'gold1',
    'platinum5', 'platinum4', 'platinum3', 'platinum2', 'platinum1',
    'diamond5', 'diamond4', 'diamond3', 'diamond2', 'diamond1',
    'ruby5', 'ruby4', 'ruby3', 'ruby2', 'ruby1'];

module.exports = {
    randomProblem(query, body){
        if(body === -1 || body === '-1') return 'None';
        return 'http://icpc.me/' + body;
    },
    searchProblem(query, body){
        let json = JSON.parse(body);
        if(!json.hasOwnProperty('problems')) return `[[${decodeURI(query)}]]\nNone`;
        if(json.problems === undefined) return `[[${decodeURI(query)}]]\nNone`;
        
        let ret = `[[${decodeURI(query)}]]\nSpoiler Alert!${Util.BLANK_CHAR_500}+\n`;
        for(let i in json.problems){
            if(!json.problems.hasOwnProperty(i)) continue;
            ret += `${json.problems[i].title} http://icpc.me/${json.problems[i].id}\n`;
        }
        return ret;
    },
    __getClassString(lv, deco){
        if(deco === 1) return lv + '+';
        if(deco === 2) return lv + '++';
        return lv;
    },
    getUser(id, body){
        let json = JSON.parse(body);
        if(json.user_id === undefined){
            return `[[${id}]]\nsolved ac에 등록되지 않은 유저입니다. BOJ 설정에서 정보 제공 동의를 해주세요.`
        }
        let ret = `[[${json.user_id}]]\n`;
        ret += `Solved : ${json.solved}\n`;
        ret += `Tier : ${tier[json.level]} (${Util.numberCut(json.exp)})\n`;
        ret += `Class : ${this.__getClassString(json.class, json.class_decoration)}\n`;
        ret += `Contribute : ${json.vote_count}\n`;
        ret += `\nhttps://solved.ac/profile/${id}`;
        return ret;
    },
    getProblemTag(prob, body){
        if(body === '[]') return 'None';
        let json = JSON.parse(body);
        let arr = [], cnt = {};
        for(let i in json){
            if(!json.hasOwnProperty(i)) continue;
            for(let j in json[i].algorithms){
                if(!json[i].algorithms.hasOwnProperty(j)) continue;
                let now = json[i].algorithms[j].short_name_en;
                if(arr.indexOf(now) === -1) { arr.push(now); cnt[now] = 0; }
                cnt[now]++;
            }
        }
        arr.sort((a, b) => { return cnt[b] - cnt[a]; });
        const link = 'http://icpc.me/' + prob;
        let ret = `[[${prob}'s tag]]\nlink : ${link}\nSpoiler Alert!${Util.BLANK_CHAR_500}\n`;
        for(let i in arr) if(arr.hasOwnProperty(i)) ret += arr[i] + '\n';
        return ret;
    }
};

/*
solvedac API
문제 정보 : https://api.solved.ac/problem_level.php?id=17469
난이도 투표 정보 : https://api.solved.ac/question_level_votes.php?id=17469
유저 정보 : https://api.solved.ac/user_information.php?id=jhnah917
문제 난이도 별 경험치 : https://api.solved.ac/exp_table.php
문제 랜덤 검색 : https://api.solved.ac/search/random_search.json?query=트리
문제 검색 : https://api.solved.ac//search/search_recommendations.json?query=트리
*/