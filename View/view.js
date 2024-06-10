const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toUpperCase();

    if (trimmedPath === 'users' && method === 'GET') {
        getUsers(req, res);
    } else if (trimmedPath === 'users' && method === 'POST') {
        postUser(req, res);
    } else if (trimmedPath === 'users' && method === 'PUT') {
        putUser(req, res);
    } else if (trimmedPath === 'users' && method === 'DELETE') {
        deleteUserById(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const getUsers = async (req, res) => {
    try {
        const users = await getUser(); 
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

const postUser = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', async () => {
        try {
            const userData = JSON.parse(body);
            const newUser = await createUser(userData); // Assuming createUser creates a user
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

const putUser = async (req, res) => {
    const id = url.parse(req.url, true).query.id; // Assuming the ID is passed as a query parameter
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const userData = JSON.parse(body);
            const updatedUser = await updateUser(id, userData); // Assuming updateUser updates a user
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        } catch (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

const deleteUserById = async (req, res) => {
    const id = url.parse(req.url, true).query.id; // Assuming the ID is passed as a query parameter
    try {
        await deleteUser(id); // Assuming deleteUser deletes a user
        res.writeHead(204);
        res.end();
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
