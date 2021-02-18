const PORT  = 8080;

const express = require('express');
const fs = require('fs');


// LOGGING
function log(message) {
    const d = new Date();
    const log_path = 'logs/'+d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()+'.log';
    const log_message = '['+d.getHours()+':'+d.getMinutes()+':'+(d.getSeconds()<10?'0':'')+ d.getSeconds()+'] '+message;
    console.log(log_message);
    fs.appendFileSync(log_path, log_message+'\n');
}


function setup_fs() {
    if (!fs.existsSync('./data')) fs.mkdir('./data', (err) => console.log(err));
    if (!fs.existsSync('./logs')) fs.mkdir('./logs', (err) => console.log(err));
}

setup_fs();

log(new Date().getDate());

const app = express();

app.use(express.static('../html/'));
app.use(express.json())

// LOGIN
app.post('api/login', (req, res) => {
    log(req.ip+' POST /api/login');
    res.send({value:"not implemented yet"});
});

// TOOLS
app.put('api/tools', (req, res) => {
    log(req.ip+' PUT /api/tools');
    res.send({value:"not implemented yet"});
});

app.get('/api/tools', (req, res) => {
    log(req.ip+' PUT /api/tools');
    res.send({value:"not implemented yet"});
});

// USERS
app.put('/api/users', (req, res) => {
    log(req.ip+' PUT /api/users');
    res.send({value:"not implemented yet"});
});

app.get('/api/users', (req, res) => {
    log(req.i+' GET /api/users');
    res.send({value:"not implemented yet"});
});

app.get('*', (req, res) => res.redirect('/'))



app.listen(PORT, () => log('listening on port '+PORT));