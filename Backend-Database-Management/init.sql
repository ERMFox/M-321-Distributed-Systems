
/*------------------------------Sets up users with roles--------------------------------*/

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100)
);

INSERT INTO roles
    (role)
VALUES
    ('Admin'),
    ('Citizen');

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO users
    (username, email, password, role_id)
VALUES
    ('Admin', 'admin@starshop.ch', '1234', 1),
    ('user', 'user@starshop.ch', 'Password1', 2);

GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;


/*--------------------------------Sets up products-------------------------------------*/

CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO companies
    (name)
VALUES
    ('Logitech'),
    ('Asus'),
    ('HyperX'),
    ('Nintendo'),
    ('Sega'),
    ('Sennheiser'),
    ('Samsung');

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price float,
    image_data VARCHAR(2083),
    description TEXT(100),
    rating INT,
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

INSERT INTO products
    (name, price, image_data, description, rating, company_id)
VALUES
    ('Office Mouse', 69.00, 'https://content.instructables.com/FN5/FXSH/F0ZTLK0N/FN5FXSHF0ZTLK0N.jpg?auto=webp&frame=1&width=1024&fit=bounds&md=MjAxNC0wNS0yMiAwNzoyOTo0OC4w', 'Office Mouse', 4, 1),
    ('Gaming Laptop', 1200.00, 'https://img.hexus.net/v2/systems/voodoo/Open.jpg', 'High-performance laptop for gaming', 5, 2),
    ('Microphone', 69.69, 'https://i.ytimg.com/vi/rCeJ1g2NsPU/maxresdefault.jpg', 'Questionably used microphone', 1, 3),
    ('Nintendo Switch', 300.00, 'https://www.nintendo.com/eu/media/images/10_share_images/systems_11/wii_u_11/H2x1_generic_WiiU_image1280w.jpg', 'Nintendo Switch Gaming Console', 4, 4),
    ('Sonic X Shadow Generations', 70.00, 'https://preview.redd.it/really-excited-for-the-sonic-x-shadow-generations-so-i-made-v0-aazxgybkfcoc1.png?width=1080&format=png&auto=webp&s=f1ac1c36b78245db3ba6f126865f8086cf5f92f0', 'Sonic Game for PS5', 5, 5),
    ('Headset', 34.50, 'https://i.pinimg.com/736x/66/0b/e2/660be274f607578a3a5e294af1480b88.jpg', 'Audio Headset', 2, 6),
    ('TV', 499.99, 'https://i.etsystatic.com/33973159/r/il/beb4e8/3627901240/il_570xN.3627901240_r541.jpg', 'Samsung Flat TV', 1, 7),
    ('The Legend Of Lonk', 12.49, 'https://preview.redd.it/jpf9rbrurf841.png?width=1080&crop=smart&auto=webp&s=8f2eda111044b47efceab35f434785ed2fb4b6cf', 'Lonk Game for Nintendo', 2, 4),
    ('Gaming PC', 9999.00, 'https://www.7dayshop.com/blog/wp-content/uploads/2015/02/Ibm_pc_5150-1024x951.jpg', 'Asus Gaming PC for REAL GAMERZ', 3, 2),
    ('Office Keyboard', 15.00, 'https://i.imgur.com/PMf6ZZk.jpeg', 'very... *special* keyboard', 1, 1);

/*--------------------------------Sets up products-------------------------------------*/


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    creationDate date,
    status varchar(100)
);

INSERT INTO orders
    (user_id, creationDate, status)
VALUES
    (1, '2024-10-01', 'Processing'),
    (2, '2024-10-02', 'Delivered');


CREATE TABLE order_product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INT
);

INSERT INTO order_product
    (order_id, product_id, quantity)
VALUES
    (1, 2, 1),
    (2, 1, 3);
