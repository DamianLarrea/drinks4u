
if DB_ID('drinks4u') is null
	create database drinks4u;
go

use drinks4u;

if OBJECT_ID('Products', 'U') is null
begin
	create table Products (
		Id uniqueidentifier primary key,
		[Name] nvarchar(32),
		Price decimal(4, 2)
	)

	insert into Products values
	(newid(), 'Victoria Bitter', 21.49),
	(newid(), 'Crown Lager', 22.99),
	(newid(), 'Coopers', 20.49),
	(newid(), 'Tooheys Extra Dry', 19.99)
end