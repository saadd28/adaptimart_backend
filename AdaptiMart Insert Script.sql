-- Inserting data for Mattress Supplier
INSERT INTO `supplier` (`name`, `contact_name`, `contact_designation`, `address`, `city`, `state`, `country`, `postal_code`, `action_type`, `created_on`, `edited_on`)
VALUES
('Adam', 'John Doe', 'Sales Manager', '123 Sleep Street', 'Comfort City', 'Restful State', 'Pillowland', '12345', 1, CURRENT_TIMESTAMP, NULL);

-- Inserting data for Furniture Supplier
INSERT INTO `supplier` (`name`, `contact_name`, `contact_designation`, `address`, `city`, `state`, `country`, `postal_code`, `action_type`, `created_on`, `edited_on`)
VALUES
('Jack', 'Jane Smith', 'Product Manager', '456 Decor Avenue', 'Style Town', 'Furnishing State', 'Furnitureland', '67890', 1, CURRENT_TIMESTAMP, NULL);

-- Inserting data for Another Mattress Supplier
INSERT INTO `supplier` (`name`, `contact_name`, `contact_designation`, `address`, `city`, `state`, `country`, `postal_code`, `action_type`, `created_on`, `edited_on`)
VALUES
('John', 'Michael Johnson', 'Marketing Director', '789 Slumber Lane', 'Cozyville', 'Dream State', 'Bedtopia', '54321', 1, CURRENT_TIMESTAMP, NULL);




-- category table

-- Inserting data for Mattress Category
INSERT INTO `category` (`parent_id`, `name`, `image`, `action_type`, `created_on`, `edited_on`)
VALUES
(NULL, 'Mattresses', 'mattress_image.jpg', 1, CURRENT_TIMESTAMP, NULL);

-- Inserting data for Furniture Category
INSERT INTO `category` (`parent_id`, `name`, `image`, `action_type`, `created_on`, `edited_on`)
VALUES
(NULL, 'Furniture', 'furniture_image.jpg', 1, CURRENT_TIMESTAMP, NULL);

-- Role Table

-- Inserting Customer Role
INSERT INTO `role` (`role_name`, `action_type`, `created_on`, `edited_on`)
VALUES
('Customer', 1, CURRENT_TIMESTAMP, NULL);

-- Inserting data for Bedding Category under Mattresses
INSERT INTO `role` (`role_name`, `action_type`, `created_on`, `edited_on`)
VALUES
('Admin', 1, CURRENT_TIMESTAMP, NULL);


-- 1
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(NULL, "Customer Status");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(1, "Active");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(1, "Block");

-- 4
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(NULL, "Order Status");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(4, "Placed");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(4, "Processed");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(4, "Shipped");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(4, "Delivered");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(4, "Returned");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(4, "Catered");

-- 11
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(NULL, "Product State");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(11, "Available");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(11, "Pending");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(11, "In Delivery");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(11, "Delivered");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(11, "Returning");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(11, "Damaged");

-- 18
-- In-transit, Received
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(NULL, "Shipment Status");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(18, "In-transit");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(18, "Received");
INSERT INTO `lookup` (`parent_id`, `name`)
VALUES
(18, "Defected");



