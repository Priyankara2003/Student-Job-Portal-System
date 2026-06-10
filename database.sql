-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS studentgig_db;
USE studentgig_db;

-- 2. Create the Users Table (Handled by Members 02, 03, 05)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- To store hashed passwords
    role ENUM('Student', 'Broker') NOT NULL, -- Restricts values to only these two
    contact_no VARCHAR(15),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create the Jobs Table (Handled by Members 01, 04, 06)
CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50),
    salary DECIMAL(10, 2) NOT NULL, -- Supports formats like 1500.00
    location VARCHAR(100) NOT NULL,
    broker_id INT NOT NULL, -- Tracks which broker posted the job
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Relationship: Links broker_id to the user_id in the users table
    FOREIGN KEY (broker_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. Create the Applications Table (Handled by Members 07, 08, 09)
CREATE TABLE applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    student_id INT NOT NULL,
    status ENUM('Pending', 'Accepted', 'Rejected') DEFAULT 'Pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Relationships: Connects application to a specific job and student
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE,
    -- Restriction: Prevents a student from applying to the exact same job twice
    UNIQUE KEY unique_application (job_id, student_id)
);