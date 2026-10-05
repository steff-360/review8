USE academic_crud;

INSERT INTO identification_types (code, name, description) VALUES
('DPI', 'Documento Personal de Identificación', 'Identificación nacional'),
('PAS', 'Pasaporte', 'Documento internacional');

INSERT INTO cities (code, name) VALUES
('GUA', 'Guatemala'),
('MIX', 'Mixco'),
('VILLA', 'Villa Nueva');

INSERT INTO classrooms (code, description, capacity, active) VALUES
('A-101', 'Aula principal', 30, 1),
('LAB-01', 'Laboratorio de computación', 25, 1);

INSERT INTO courses (code, description, intensity, weight, active) VALUES
('WEB01', 'Desarrollo Web', 80, 4, 1),
('DB01', 'Bases de Datos', 60, 3, 1);

INSERT INTO students
(code, firstName, lastName, identification_type_id, identificationNumber, gender, birthdate, email, address, city_id)
VALUES
('STU0000000001', 'Ana', 'López', 1, '1234567890101', 'Femenino', '2005-03-15 00:00:00', 'ana@example.com', 'Zona 1', 1),
('STU0000000002', 'Carlos', 'Pérez', 1, '1234567890102', 'Masculino', '2004-07-20 00:00:00', 'carlos@example.com', 'Zona 11', 2);

INSERT INTO teachers
(firstName, lastName, identification_type_id, identificationNumber, email)
VALUES
('María', 'Gómez', 1, '2234567890101', 'maria.teacher@example.com'),
('José', 'Ramírez', 1, '2234567890102', 'jose.teacher@example.com');

INSERT INTO courses_schedules
(course_id, teacher_id, classroom_id, start_date, end_date, active)
VALUES
(1, 1, 1, '2026-10-01 08:00:00', '2026-12-15 10:00:00', 1),
(2, 2, 2, '2026-10-02 14:00:00', '2026-12-15 16:00:00', 1);

INSERT INTO inscriptions
(course_schedule_id, student_id, register_date, active)
VALUES
(1, 1, NOW(), 1),
(2, 2, NOW(), 1);

INSERT INTO rates (inscription_id, rate, comments) VALUES
(1, 95, 'Excelente rendimiento'),
(2, 88, 'Buen rendimiento');

INSERT INTO topics (course_id, code, title, description, active) VALUES
(1, 'HTML', 'HTML y estructura web', 'Fundamentos de HTML', 1),
(1, 'CSS', 'CSS', 'Estilos y diseño web', 1),
(2, 'SQL', 'SQL básico', 'Consultas y manipulación de datos', 1);
