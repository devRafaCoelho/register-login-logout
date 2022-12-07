create database bd_dindin

create table usuarios(
	id serial primary key,
  	nome text not null,
  	email varchar(40) not null unique,
  	senha text not null	
);

