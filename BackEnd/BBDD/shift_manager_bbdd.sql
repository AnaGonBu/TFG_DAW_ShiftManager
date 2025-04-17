drop database shiftmanagerbbdd;
create database shiftmanagerbbdd;
use shiftmanagerbbdd;

create table grupos
(id_grupo int primary key,
nombre_grupo varchar(45),
num_emp int,
descripcion varchar(100),
estado boolean,
fecha_inicio date not null,
frecuencia int not null
);


create table empleados 
( id_emp int not null auto_increment primary key,
nombre varchar(45) not null,
apellidos varchar(100) not null,
email varchar(100) not null unique,
url_imagen varchar(300),
domicilio varchar(100),
fecha_ingreso date,
fecha_nacimiento date,
situacion varchar(100),
estado boolean,
id_grupo int not null,
foreign key(id_grupo) references grupos(id_grupo)
);


create table cambios 
(id_cambio int not null auto_increment primary key,
id_solicitante int not null,
id_concede int,
fecha_solicitud date,
fecha_turno1 date,
fecha_turno2 date,
estado varchar (10) not null default 'pendiente',
foreign key(id_solicitante) references empleados(id_emp),
foreign key(id_concede) references empleados(id_emp)
);
CREATE TABLE cambios_grupo (
    id_cambio_grupo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cambio INT NOT NULL,
    id_empleado INT NOT NULL,
    fecha DATE NOT NULL,
    id_grupo_origen INT,
    id_grupo_destino INT,
    FOREIGN KEY(id_cambio) REFERENCES cambios(id_cambio),
    FOREIGN KEY(id_empleado) REFERENCES empleados(id_emp),
    FOREIGN KEY(id_grupo_origen) REFERENCES grupos(id_grupo),
    FOREIGN KEY(id_grupo_destino) REFERENCES grupos(id_grupo)
);



select * from cambios;





 /*
create user 'uproyectos_2023' identified by 'uproyectos';
grant all privileges on clientes_proyectos_empleados_2023.* to  'uproyectos_2023';
*/