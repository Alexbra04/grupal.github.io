function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if(err) {        
                res.json(err);
        }
        res.render('tasks/index', {usuarios});
        });
    });

    
}

function create(req, res) {

    res.render('tasks/create');
}

function store(req, res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuarios SET ?', [data], (err, rows) => {
            res.redirect('/tasks');
        });
    });
}

function destroy(req, res) {
    const ci = req.body.ci;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuarios WHERE ci = ?', [ci], (err, rows) => {
            res.redirect('/tasks');
        });
    });
}

function edit(req, res) {
    const ci = req.params.ci;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE ci = ?', [ci], (err, usuarios) => {
            if(err) {        
                res.json(err);
            }
        res.render('tasks/edit', {usuarios});
        });
    });
}

function update(req, res) {
    const ci = req.params.ci;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE usuarios SET ? WHERE ci = ?', [data, ci], (err, rows) => {
            res.redirect('/tasks')
        });
    });

}
module.exports = { 
    index: index, 
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}