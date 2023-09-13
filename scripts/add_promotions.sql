use Drinks4u;

if OBJECT_ID('Promotions', 'U') is null
begin
	create table Promotions (
		Id uniqueidentifier primary key default(newid()),
		AppliesToProductId uniqueidentifier,
		[Type] nvarchar(32),
		[Description] nvarchar(128),
		DiscountValue decimal(4, 2),
		DiscountQuantity int,
		TriggerPrice decimal(4, 2),
		TriggerQuantity int,
		foreign key (AppliesToProductId) references Products(Id)
	)

	insert into Promotions(AppliesToProductId, [Type], [Description], DiscountValue, DiscountQuantity, TriggerPrice, TriggerQuantity) values
	((select top(1) Id from products where Name = 'Victoria Bitter'), 'Product', 'Save $2', 2, null, null, 1),
	((select top(1) Id from products where Name = 'Coopers'), 'MultiBuy', 'Buy one, get one free', null, 1, null, 2),
	(null, 'Cart', 'Spend $50, save $5', 5, null, 50, null)
end