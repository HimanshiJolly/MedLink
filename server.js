const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/': {
                fs.readFile(path.join(__dirname, 'home1.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading the login page');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            case '/login': {
                fs.readFile(path.join(__dirname, 'login.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading the login page');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            
            case '/forgot': {
                fs.readFile(path.join(__dirname, 'forgot.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading the forgot page');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            case '/register': {
                fs.readFile(path.join(__dirname, 'register.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading the registration page');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            case '/reset': {
                fs.readFile(path.join(__dirname, 'reset.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Reset page not found');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            case '/about': {
                fs.readFile(path.join(__dirname, 'Aboutus.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Reset page not found');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            case '/contact': {
                fs.readFile(path.join(__dirname, 'contact.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Reset page not found');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
                break;
            }
            case '/icon.jpg': {
                console.log('Serving image /icon.jpg');
                fs.readFile(path.join(__dirname, 'icon.jpg'), (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading image file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(data);
                });
                break;
            }
            case '/Aboutus.css': {
                fs.readFile(path.join(__dirname, 'Aboutus.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            case '/contact.css': {
                fs.readFile(path.join(__dirname, 'contact.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            case '/login.css': {
                fs.readFile(path.join(__dirname, 'login.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            case '/login.js': {
                fs.readFile(path.join(__dirname, 'login.js'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading JS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                });
                break;
            }
            case '/home1.css': {
                fs.readFile(path.join(__dirname, 'home1.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            
            case '/register.css': {
                fs.readFile(path.join(__dirname, 'register.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            case '/register.js': {
                fs.readFile(path.join(__dirname, 'register.js'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading JS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                });
                break;
            }
            case '/forgot.css': {
                fs.readFile(path.join(__dirname, 'forgot.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            case '/forgot.js': {
                fs.readFile(path.join(__dirname, 'forgot.js'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading JS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                });
                break;
            }
            case '/reset.css': {
                fs.readFile(path.join(__dirname, 'reset.css'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading CSS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                });
                break;
            }
            case '/reset.js': {
                fs.readFile(path.join(__dirname, 'reset.js'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error reading JS file');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                });
                break;
            }
            
            
            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        }
    } else if (req.method === 'POST') {
        switch (req.url) {
            
            case '/login': {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(body)

                    // Read the users from the users.json file
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' })
                            res.end('Error reading user data')
                            return
                        }

                        // Parse the users data
                        const users = JSON.parse(data)

                        // Authenticate the user by checking the username and password
                        const user = users.find(u => u.username === username && u.password === password)

                        if (user) {
                            res.writeHead(302, { 'Location': '/home1' })
                            res.end()
                        } else {
                            res.writeHead(302, { 'Location': '/register' })
                            res.end()
                        }
                    })
                })
                break
            }
            case '/register': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', () => {
                    const { username, email, password } = querystring.parse(body);
                    const userData = { username, email, password };

                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        let users = [];

                        if (!err && data) {
                            try {
                                users = JSON.parse(data);
                            } catch (e) {
                                console.error('Error parsing users.json:', e);
                            }
                        }
                        users.push(userData);
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 3), (err) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' });
                                res.end('Error saving registration data');
                                return;
                            }
                            res.writeHead(302, { 'Location': '/' });
                            res.end();
                        });
                    });
                });
                break;
            }
            case '/forgot': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
            
                req.on('end', () => {
                    const { email } = querystring.parse(body);
            
                    // Normalize the email for comparison (trim and lowercase)
                    const normalizedEmail = email.trim().toLowerCase();
            
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, userData) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error reading user data');
                            return;
                        }
                        const users = JSON.parse(userData);
                        const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
            
                        if (user) {
                            // If email is found in users.json, store it in forgot.json
                            fs.readFile(path.join(__dirname, 'forgot.json'), 'utf-8', (err, forgotData) => {
                                let forgotEmails = [];
            
                                if (!err && forgotData) {
                                    try {
                                        forgotEmails = JSON.parse(forgotData);
                                    } catch (e) {
                                        console.error('Error parsing forgot.json:', e);
                                    }
                                }
            
                                forgotEmails.push({ email: normalizedEmail });  // Add email to forgot.json
                                fs.writeFile(path.join(__dirname, 'forgot.json'), JSON.stringify(forgotEmails, null, 3), (err) => {
                                    if (err) {
                                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                                        res.end('Error saving forgot email');
                                        return;
                                    }
                                    res.writeHead(302, { 'Location': '/reset' });
                                    res.end();
                                });
                            });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end('Email not found. Please check your email address.');
                        }
                    });
                });
                break;
            }
            
            case '/reset': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
            
                req.on('end', () => {
                    const { email, newPassword } = querystring.parse(body);
            
                    // Normalize the email for comparison (trim and lowercase)
                    const normalizedEmail = email.trim().toLowerCase();
            
                    fs.readFile(path.join(__dirname, 'forgot.json'), 'utf-8', (err, forgotData) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error reading forgot data');
                            return;
                        }
            
                        const forgotEmails = JSON.parse(forgotData);
                        const resetEmail = forgotEmails.find(f => f.email.toLowerCase() === normalizedEmail);
            
                        if (resetEmail) {
                            fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, userData) => {
                                if (err) {
                                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                                    res.end('Error reading user data');
                                    return;
                                }
            
                                const users = JSON.parse(userData);
                                const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
            
                                if (userIndex !== -1) {
                                    users[userIndex].password = newPassword;
                                    console.log('Password updated for:', normalizedEmail);
            
                                    // Save the updated users.json
                                    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 3), (err) => {
                                        if (err) {
                                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                                            res.end('Error saving updated password');
                                            return;
                                        }
            
                                        // Debug log before redirect
                                        console.log("Password updated, redirecting to login page.");
            
                                        // Redirect to login page after successful password reset
                                        res.writeHead(302, { 'Location': '/login' });
                                        res.end();
                                    });
                                } else {
                                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                                    res.end('Email not found in users.json');
                                }
                            });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end('Email not found in forgot list. Please request a password reset first.');
                        }
                    });
                });
                break;
            }
            

            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
