const PORT  = 8080;
const TOKEN_TTL = 1440;
const BCRYPT_SALT_ROUNDS = 10;
const BCRYPT_TOKEN_SALT_ROUNDS = 5;

const USERS_FILE = './data/users.json';
const TOKEN_FILE = './data/tokens.json';
const TOOLS_FILE = './data/tools.json';
const ID_LOOKUP_FILE = './data/id_lookup.json';

const fs = require('fs');
const bcrypt = require('bcrypt');
const express = require('express');
const process = require('process');
const crypto = require('crypto');


// LOGGING
function log(message) {
    const d = new Date();
    const log_path = 'logs/'+d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()+'.log';
    const log_message = '['+d.getHours()+':'+d.getMinutes()+':'+(d.getSeconds()<10?'0':'')+ d.getSeconds()+'] '+message;
    console.log(log_message);
    fs.appendFileSync(log_path, log_message+'\n');
}


function setup_fs() {
    if (!fs.existsSync('./data')) fs.mkdir('./data', (e) => process.exit());
    if (!fs.existsSync('./logs')) fs.mkdir('./logs', (e) => process.exit());
}

setup_fs();

// USEFUL FUNCTIONS
function hashSync(string, rounds=BCRYPT_SALT_ROUNDS) {
    return bcrypt.hashSync(string, bcrypt.genSaltSync(rounds));
}

// DATA STRUCTURES

class User {
    constructor(username, password) {
        this.username = username;
        this.password = hashSync(string);
    }
}

class Tool {
    constructor(manufacturer, label, quality) {
        this.manufacturer = manufacturer;
        this.label = label;
        this.quality = quality;
    }
}

// FUNCTIONS CORRESPONDING TO DATA STRUCTURES
// ID HANDLING
function get_id_lookup() {
    if(!fs.existsSync(ID_LOOKUP_FILE)) return {};
    return JSON.parse(fs.readFileSync(ID_LOOKUP_FILE));
}

function id_lookup(keyword) {
    const lookup_table = get_id_lookup();
    if(lookup_table[keyword] === undefined) {
        const values = Object.values(lookup_table).sort((a, b) => a-b);
        if(values.length == 0) lookup_table[keyword] = 1000;
        else lookup_table[keyword] = values[values.length - 1] + 1000;
        fs.writeFileSync(ID_LOOKUP_FILE, JSON.stringify(lookup_table));
    }
    return lookup_table[keyword];
}

function new_id(objects, keyword) {
    const ids = [];
    for (var i = 0; i < objects.length; i++)
        ids.push(objects[i].id);
    var id = id_lookup(keyword);
    while (ids.indexOf(id) !== -1)
        id += 1
    return id;
}

// USERS
function get_users() {
    if(!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function add_user(user) {
    const users = get_users();
    if (users.find(user => user.username === username) !== undefined)
        return 1;
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
}

function valid_login(username, password) {
    const user = get_users().find(user => user.username === username);
    return user !== undefined && bcrypt.compareSync(password, user.password);
}

function get_tokens() {
    if(!fs.existsSync(TOKEN_FILE)) return [];
    return JSON.parse(fs.readFileSync(TOKEN_FILE));
}

function valid_token(username, token) {
    const tokens = get_tokens();
    console.log(tokens);
    return tokens.find(t => bcrypt.compareSync(token, t["token"])) !== undefined;
}

function add_token(username) {
    const tokenString = String.fromCharCode(...crypto.randomBytes(64));
    const token = {
        token: hashSync(tokenString, BCRYPT_TOKEN_SALT_ROUNDS),
        username: username,
        time: new Date().getTime()
    };
    const tokens = get_tokens();
    tokens.push(token);
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens))
    return tokenString;
}

// TOOLS
function get_tools() {
    if(!fs.existsSync(TOOLS_FILE)) return [];
    return JSON.parse(fs.readFileSync(TOOLS_FILE));
}

function add_tool(tool) {
    const tools = get_tools();
    tool["id"] = new_id(tools, tool.manufacturer.toLowerCase());
    tools.push(tool);
    fs.writeFileSync(TOOLS_FILE, JSON.stringify(tools));
}

// EXPRESS
function request_valid(request, params) {
    var valid = true;
    for (var i = 0; i < params.length; i++) {
        valid = request.body[params[i]] !== undefined;
        if (!valid) return false;
    }
    return true;
}



console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))
console.log('token:', add_token('Benutzername1'))

const app = express();

app.use(express.json());
app.use(express.static('html/'));

// LOGIN
app.post('/api/login', async (req, res) => {
    log(req.ip+' POST /api/login');
    var result_code = 0;
    if(!request_valid(req, ["username", "password"]))
        result_code = 1;
    else if(!valid_login(req.body["username"], req.body["password"]))
        result_code = 10;
    res.send({token:"not implemented yet", resultCode:result_code});
});

app.post('/api/logout', async (req, res) => {
    log(req.ip+' POST /api/login');
    var result_code = 0;
    if (req.body["token"] === undefined)
        result_code = 1;
    
    res.send({resultCode:result_code});
});

// TOOLS
app.get('/api/tools', async (req, res) => {
    log(req.ip+' PUT /api/tools');
    res.send({value:"not implemented yet"});
});

app.put('/api/tools', async (req, res) => {
    log(req.ip+' PUT /api/tools');
    res.send({value:"not implemented yet"});
});


// USERS
app.get('/api/users', async (req, res) => {
    log(req.i+' GET /api/users');
    res.send({value:"not implemented yet"});
});

app.put('/api/users', async (req, res) => {
    log(req.ip+' PUT /api/users');
    res.send({value:"not implemented yet"});
});

// TOKEN
app.post('/api/token', async (req, res) => {
    log(req.ip+' PUT /api/users');
    var result_code = 0;
    if(req.body["token"] === undefined)
        result_code = 1;
    else if(!valid_token(req.body["token"]))
        result_code = 10;
    res.send({value:"not implemented yet", resultCode: result_code});
});

app.get('*', (req, res) => res.redirect('/'))

app.listen(PORT, () => log('listening on port '+PORT));
