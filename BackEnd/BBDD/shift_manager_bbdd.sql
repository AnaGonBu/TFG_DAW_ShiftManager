create database shiftmanagerbbdd;
use shiftmanagerbbdd;

create table grupos
(id_grupo int primary key,
nombre_grupo varchar(45),
num_emp int,
descripcion varchar(100),
estado boolean
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
foreign key(id_solicitante) references empleados(id_emp)
);


select * from cambios;





 /*
create user 'uproyectos_2023' identified by 'uproyectos';
grant all privileges on clientes_proyectos_empleados_2023.* to  'uproyectos_2023';
*/