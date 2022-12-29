create database register_login_logout

create table users(
	id serial primary key,
  	name text not null,
  	email varchar(40) not null unique,
  	password text not null	
);

