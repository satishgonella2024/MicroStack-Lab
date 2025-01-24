CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create initial user
INSERT INTO users (username, password, email) VALUES ('testuser', 'hashedpassword', 'test@example.com');

-- Optional: Add initial feedback
INSERT INTO feedback (user_id, message) VALUES (1, 'Initial feedback message');