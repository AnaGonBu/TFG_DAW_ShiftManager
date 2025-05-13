INSERT INTO grupos (id_grupo, nombre_grupo, num_emp, descripcion, estado,fecha_inicio,frecuencia) VALUES
(1, 'Grupo 1', 4, 'Grupo 1 de turnos de seguridad', 1,'2025-04-28',7),
(2, 'Grupo 2', 4, 'Grupo 2 de turnos de seguridad', 1,'2025-04-29',7),
(3, 'Grupo 3', 4, 'Grupo 3 de turnos de seguridad', 1,'2025-04-30',7),
(4, 'Grupo 4', 4, 'Grupo 4 de turnos de seguridad', 1,'2025-05-01',7),
(5, 'Grupo 5', 4, 'Grupo 5 de turnos de seguridad', 1,'2025-05-02',7),
(6, 'Grupo 6', 4, 'Grupo 6 de turnos de seguridad', 1,'2025-05-03',7),
(7, 'Grupo 7', 4, 'Grupo 7 de turnos de seguridad', 1,'2025-05-04',7);


INSERT INTO empleados (nombre, apellidos, email, password, rol, url_imagen, domicilio, fecha_ingreso, fecha_nacimiento, situacion, estado, id_grupo) VALUES
-- Admin
('Administrador', 'root', 'admin@admin.com', 'admin', 'admin', 'https://i.ytimg.com/vi/KEkrWRHCDQU/hqdefault.jpg', 'Calle 16 de Septiembre 89', '2024-01-05', '1989-05-30', 'Alta', 0, 1),

-- Grupo 1
('Juan', 'Pérez López', 'juan.g1@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=1', 'Calle Falsa 123', '2024-01-15', '1990-05-10', 'Alta', 1, 1),
('María', 'García Torres', 'maria.g1@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=2', 'Av. Central 456', '2023-11-20', '1988-08-25', 'Alta', 1, 1),
('Luis', 'Hernández Díaz', 'luis.g1@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=3', 'Calle Sur 789', '2022-06-10', '1992-02-18', 'Alta', 1, 1),
('Ana', 'Ramírez Gómez', 'ana.g1@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=4', 'Colonia Norte 202', '2023-03-12', '1991-12-12', 'Alta', 1, 1),

-- Grupo 2
('Pedro', 'Sánchez Ruiz', 'pedro.g2@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=5', 'Calle Este 321', '2024-02-01', '1987-09-09', 'Alta', 1, 2),
('Lucía', 'Morales Paredes', 'lucia.g2@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=6', 'Av. Reforma 110', '2023-05-22', '1993-07-15', 'Alta', 1, 2),
('Javier', 'Ortiz Flores', 'javier.g2@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=7', 'Blvd. Central 500', '2022-09-30', '1989-04-03', 'Alta', 1, 2),
('Carmen', 'Delgado Núñez', 'carmen.g2@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=8', 'Calle Roble 45', '2023-01-18', '1990-11-27', 'Alta', 1, 2),

-- Grupo 3
('Sergio', 'Jiménez Herrera', 'sergio.g3@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=9', 'Calle Primavera 12', '2024-03-03', '1991-06-14', 'Alta', 1, 3),
('Elena', 'Ramos Cortés', 'elena.g3@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=10', 'Av. Universidad 88', '2022-12-10', '1994-01-22', 'Alta', 1, 3),
('Andrés', 'Vargas León', 'andres.g3@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=11', 'Colonia Jardines 102', '2023-04-15', '1990-08-19', 'Alta', 1, 3),
('Laura', 'Cruz Serrano', 'laura.g3@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=12', 'Calle Hidalgo 456', '2023-07-05', '1988-10-05', 'Alta', 1, 3),

-- Grupo 4
('Hugo', 'Mendoza Romero', 'hugo.g4@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=13', 'Calle Reforma 300', '2024-01-08', '1987-11-14', 'Alta', 1, 4),
('Sofía', 'Navarro Campos', 'sofia.g4@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=14', 'Av. Independencia 11', '2023-08-20', '1992-02-03', 'Alta', 1, 4),
('Gabriel', 'Castañeda Silva', 'gabriel.g4@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=15', 'Colonia Las Palmas 78', '2022-11-01', '1993-12-25', 'Alta', 1, 4),
('Daniela', 'Carrillo Aguirre', 'daniela.g4@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=16', 'Calle Río Bravo 234', '2023-05-11', '1990-09-17', 'Alta', 1, 4),

-- Grupo 5
('Pablo', 'Salinas Montes', 'pablo.g5@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=17', 'Av. Juárez 123', '2024-02-19', '1991-04-21', 'Alta', 1, 5),
('Isabel', 'Fuentes Bravo', 'isabel.g5@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=18', 'Calle 5 de Mayo 456', '2023-06-13', '1992-07-30', 'Alta', 1, 5),
('Álvaro', 'Ibarra Luna', 'alvaro.g5@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=19', 'Colonia Centro 300', '2022-10-25', '1989-12-10', 'Alta', 1, 5),
('Valeria', 'Peña Escobar', 'valeria.g5@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=20', 'Calle Lázaro Cárdenas 22', '2023-01-27', '1993-03-05', 'Alta', 1, 5),

-- Grupo 6
('Ricardo', 'Padilla Solís', 'ricardo.g6@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=21', 'Calle Reforma 200', '2024-03-10', '1990-02-15', 'Alta', 1, 6),
('Marta', 'Vera Zamora', 'marta.g6@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=22', 'Av. Central 55', '2023-09-08', '1988-06-28', 'Alta', 1, 6),
('Enrique', 'Camacho Beltrán', 'enrique.g6@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=23', 'Colonia Paseos 199', '2022-07-12', '1991-11-06', 'Alta', 1, 6),
('Alicia', 'Rangel Ponce', 'alicia.g6@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=24', 'Calle Colón 77', '2023-02-22', '1992-09-14', 'Alta', 1, 6),

-- Grupo 7
('Manuel', 'Zúñiga Ledesma', 'manuel.g7@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=25', 'Calle 16 de Septiembre 89', '2024-01-05', '1989-05-30', 'Alta', 1, 7),
('Paula', 'Santos Meza', 'paula.g7@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=26', 'Av. Revolución 88', '2023-07-19', '1993-02-08', 'Alta', 1, 7),
('Oscar', 'Valle Bustos', 'oscar.g7@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=27', 'Colonia Alameda 64', '2022-08-02', '1990-11-12', 'Alta', 1, 7),
('Carla', 'González Ayala', 'carla.g7@empresa.com', 'admin', 'user', 'https://i.pravatar.cc/150?img=28', 'Calle Hidalgo 300', '2023-03-16', '1991-10-20', 'Alta', 1, 7);




INSERT INTO cambios (id_solicitante, id_concede, fecha_solicitud, fecha_turno1, fecha_turno2, estado) VALUES
(3, 15, '2024-03-01', '2024-03-10', '2024-03-15', 'ACEPTADO'), -- id_cambio = 1
(7, 21, '2024-03-05', '2024-03-12', '2024-03-17', 'ACEPTADO'), -- id_cambio = 2
(12, 8, '2024-03-08', '2024-03-14', '2024-03-20', 'ACEPTADO'), -- id_cambio = 3
(19, 4, '2024-03-10', '2024-03-18', '2024-03-23', 'ACEPTADO'), -- id_cambio = 4
(25, 11, '2024-03-15', '2024-03-22', '2024-03-28', 'ACEPTADO'), -- id_cambio = 5
(5, 27, '2024-03-18', '2024-03-25', '2024-03-30', 'PENDIENTE'), -- id_cambio = 6
(14, 2, '2024-03-20', '2024-03-26', '2024-04-01', 'ACEPTADO'), -- id_cambio = 7
(22, 9, '2024-03-22', '2024-03-29', '2024-04-03', 'DENEGADO'), -- id_cambio = 8
(10, 26, '2024-03-25', '2024-04-01', '2024-04-06', 'ACEPTADO'), -- id_cambio = 9
(1, 17, '2024-03-28', '2024-04-04', '2024-04-09', 'ACEPTADO'); -- id_cambio = 10

-- Para id_cambio = 1 (Solicitante 3[G1], Concede 15[G4], fecha1=10/Mar, fecha2=15/Mar)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(1, 3, '2024-03-15', 1, 4), -- Solicitante 3 trabaja el 15/Mar en Grupo 4
(1, 15, '2024-03-10', 4, 1); -- Concede 15 trabaja el 10/Mar en Grupo 1

-- Para id_cambio = 2 (Solicitante 7[G2], Concede 21[G6], fecha1=12/Mar, fecha2=17/Mar)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(2, 7, '2024-03-17', 2, 6), -- Solicitante 7 trabaja el 17/Mar en Grupo 6
(2, 21, '2024-03-12', 6, 2); -- Concede 21 trabaja el 12/Mar en Grupo 2

-- Para id_cambio = 3 (Solicitante 12[G3], Concede 8[G2], fecha1=14/Mar, fecha2=20/Mar)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(3, 12, '2024-03-20', 3, 2), -- Solicitante 12 trabaja el 20/Mar en Grupo 2
(3, 8, '2024-03-14', 2, 3); -- Concede 8 trabaja el 14/Mar en Grupo 3

-- Para id_cambio = 4 (Solicitante 19[G5], Concede 4[G1], fecha1=18/Mar, fecha2=23/Mar)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(4, 19, '2024-03-23', 5, 1), -- Solicitante 19 trabaja el 23/Mar en Grupo 1
(4, 4, '2024-03-18', 1, 5); -- Concede 4 trabaja el 18/Mar en Grupo 5

-- Para id_cambio = 5 (Solicitante 25[G7], Concede 11[G3], fecha1=22/Mar, fecha2=28/Mar)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(5, 25, '2024-03-28', 7, 3), -- Solicitante 25 trabaja el 28/Mar en Grupo 3
(5, 11, '2024-03-22', 3, 7); -- Concede 11 trabaja el 22/Mar en Grupo 7

-- Para id_cambio = 7 (Solicitante 14[G4], Concede 2[G1], fecha1=26/Mar, fecha2=01/Abr)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(7, 14, '2024-04-01', 4, 1), -- Solicitante 14 trabaja el 01/Abr en Grupo 1
(7, 2, '2024-03-26', 1, 4); -- Concede 2 trabaja el 26/Mar en Grupo 4

-- Para id_cambio = 9 (Solicitante 10[G3], Concede 26[G7], fecha1=01/Abr, fecha2=06/Abr)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(9, 10, '2024-04-06', 3, 7), -- Solicitante 10 trabaja el 06/Abr en Grupo 7
(9, 26, '2024-04-01', 7, 3); -- Concede 26 trabaja el 01/Abr en Grupo 3

-- Para id_cambio = 10 (Solicitante 1[G1], Concede 17[G5], fecha1=04/Abr, fecha2=09/Abr)
INSERT INTO cambios_grupo (id_cambio, id_empleado, fecha, id_grupo_origen, id_grupo_destino) VALUES
(10, 1, '2024-04-09', 1, 5), -- Solicitante 1 trabaja el 09/Abr en Grupo 5
(10, 17, '2024-04-04', 5, 1); -- Concede 17 trabaja el 04/Abr en Grupo 1
