const { updateProduct, createProduct, deleteProduct, getAllProducts, getOneProduct } = require("../handlers/productHandler");
const { pool } = require("../dbConnection/connector");

afterAll(async () => {
    await pool.end();
});

test('get all products', async () => {
    const response = await getAllProducts();
    expect(response).toEqual([
        {
            id: 1,
            name: 'Mouse',
            price: 150,
            image_data: null,
            description: 'USB office mouse',
            rating: 4,
            company_id: 1,
        },
        {
            id: 2,
            name: 'Gaming Laptop',
            price: 1200,
            image_data: null,
            description: 'High-performance laptop for gaming',
            rating: 5,
            company_id: 2,
        },
    ]);
});

test('get one product', async () => {
    const response = await getOneProduct(1);
    expect(response).toEqual([
        {
            id: 1,
            name: 'Mouse',
            price: 150,
            image_data: null,
            description: 'USB office mouse',
            rating: 4,
            company_id: 1,
        },
    ]);
});

test('create product', async () => {
    await createProduct({
        name: 'Headset',
        price: 50,
        image_data: null,
        description: 'USB Gaming Headset',
        rating: 3,
        company_id: 1,
    });
    const response = await getOneProduct(3);
    expect(response).toEqual([
        {
            id: 3,
            name: 'Headset',
            price: 50,
            image_data: null,
            description: 'USB Gaming Headset',
            rating: 3,
            company_id: 1,
        },
    ]);
});

test('update product', async () => {
    await updateProduct(3, { name: 'X Pro Wireless' });
    const response = await getOneProduct(3);
    expect(response).toEqual([
        {
            id: 3,
            name: 'X Pro Wireless',
            price: 50,
            image_data: null,
            description: 'USB Gaming Headset',
            rating: 3,
            company_id: 1,
        },
    ]);
});

test('delete product', async () => {
    await deleteProduct(3);
    const response = await getOneProduct(3);
    expect(response).toEqual([]);
});
