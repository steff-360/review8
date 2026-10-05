CREATE DATABASE IF NOT EXISTS academic_crud
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE academic_crud;

CREATE TABLE identification_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(6) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250)
);

CREATE TABLE cities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(14) NOT NULL UNIQUE,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identificationNumber VARCHAR(16) NOT NULL UNIQUE,
    gender VARCHAR(20),
    birthdate DATETIME,
    email VARCHAR(60) NOT NULL UNIQUE,
    address VARCHAR(100),
    city_id BIGINT NOT NULL,
    CONSTRAINT fk_students_identification_type
        FOREIGN KEY (identification_type_id)
        REFERENCES identification_types(id),
    CONSTRAINT fk_students_city
        FOREIGN KEY (city_id)
        REFERENCES cities(id)
);

CREATE TABLE teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identificationNumber VARCHAR(16) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    CONSTRAINT fk_teachers_identification_type
        FOREIGN KEY (identification_type_id)
        REFERENCES identification_types(id)
);

CREATE TABLE classrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    description VARCHAR(250),
    capacity INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT chk_classrooms_capacity CHECK (capacity > 0)
);

CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    description VARCHAR(250) NOT NULL,
    intensity INT NOT NULL,
    weight INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT chk_courses_intensity CHECK (intensity > 0),
    CONSTRAINT chk_courses_weight CHECK (weight > 0)
);

CREATE TABLE courses_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    classroom_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_schedule_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id),
    CONSTRAINT fk_schedule_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id),
    CONSTRAINT fk_schedule_classroom
        FOREIGN KEY (classroom_id)
        REFERENCES classrooms(id),
    CONSTRAINT chk_schedule_dates CHECK (end_date > start_date)
);

CREATE TABLE inscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_schedule_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    register_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_inscription_schedule
        FOREIGN KEY (course_schedule_id)
        REFERENCES courses_schedules(id),
    CONSTRAINT fk_inscription_student
        FOREIGN KEY (student_id)
        REFERENCES students(id),
    CONSTRAINT uq_student_schedule
        UNIQUE (course_schedule_id, student_id)
);

CREATE TABLE rates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inscription_id BIGINT NOT NULL,
    rate BIGINT NOT NULL,
    comments VARCHAR(250),
    CONSTRAINT fk_rate_inscription
        FOREIGN KEY (inscription_id)
        REFERENCES inscriptions(id),
    CONSTRAINT chk_rate_value CHECK (rate >= 0)
);

CREATE TABLE topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    code VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_topic_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id),
    CONSTRAINT uq_topic_course_code
        UNIQUE (course_id, code)
);
