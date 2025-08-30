-- Crear base de datos si no existe
IF DB_ID('ProductsDb') IS NULL
    CREATE DATABASE ProductsDb;
GO

USE ProductsDb;
GO

-- Eliminar tabla si ya existe
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    DROP TABLE dbo.Products;
GO

-- Crear tabla Products
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255) NULL,
    Price DECIMAL(10,2) NOT NULL CHECK (Price > 0),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Insertar registros de prueba
INSERT INTO Products (Name, Description, Price)
VALUES
('Laptop Lenovo', 'Laptop de 15 pulgadas con Ryzen 5', 3200.00),
('Mouse Logitech', 'Mouse inalámbrico ergonómico', 120.50),
('Teclado Mecánico', 'Teclado mecánico retroiluminado', 250.99),
('Monitor Samsung', 'Monitor LED de 24 pulgadas Full HD', 800.00),
('Auriculares Sony', 'Headset con cancelación de ruido', 600.75),
('Silla Gamer', 'Silla ergonómica para oficina/gaming', 950.00),
('Smartphone Xiaomi', 'Teléfono Android gama media', 1800.00),
('Tablet Samsung', 'Tablet de 10 pulgadas con stylus', 1500.00),
('Impresora HP', 'Impresora multifuncional a color', 700.25),
('Disco SSD 1TB', 'Unidad de estado sólido NVMe', 400.00),
('Memoria RAM 16GB', 'DDR4 a 3200MHz', 300.00),
('Cámara Canon', 'Cámara réflex digital EOS', 2800.00),
('Parlante JBL', 'Altavoz bluetooth portátil', 450.00),
('Router TP-Link', 'Router WiFi 6 alta velocidad', 380.00),
('Smartwatch Amazfit', 'Reloj inteligente con GPS', 520.00);
GO
