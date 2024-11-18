const { getOneCompany, createCompany, deleteCompany, getAllCompanies, updateCompany } = require('../handlers/companyHandler');
const { pool } = require('../dbConnection/connector');

afterAll(async () => {
    await pool.end();
});

test('get one company', async () => {
    const response = await getOneCompany(1);
    expect(response).toEqual([
        {
            company_id: 1,
            company_name: 'Logitech',
            products: [
                {
                    description: 'USB office mouse',
                    id: 1,
                    image_data: null,
                    name: 'Mouse',
                    price: 150,
                    rating: 4,
                },
            ],
        },
    ]);
});

test('get all companies', async () => {
    const response = await getAllCompanies();
    expect(response).toEqual([
        {
            company_id: 1,
            company_name: 'Logitech',
            products: [
                {
                    description: 'USB office mouse',
                    id: 1,
                    image_data: null,
                    name: 'Mouse',
                    price: 150,
                    rating: 4,
                },
            ],
        },
        {
            company_id: 2,
            company_name: 'Asus',
            products: [
                {
                    description: 'High-performance laptop for gaming',
                    id: 2,
                    image_data: null,
                    name: 'Gaming Laptop',
                    price: 1200,
                    rating: 5,
                },
            ],
        },
    ]);
});

test('create company', async () => {
    await createCompany({
        name: 'Razer',
    });
    const response = await getOneCompany(3);
    expect(response).toEqual([
        {
            company_id: 3,
            company_name: 'Razer',
            products: [
                {
                    description: null,
                    id: null,
                    image_data: null,
                    name: null,
                    price: null,
                    rating: null,
                },
            ],
        },
    ]);
});

test('update company', async () => {
    await updateCompany(3, {
        name: 'rocat',
    });
    const response = await getOneCompany(3);
    expect(response).toEqual([
        {
            company_id: 3,
            company_name: 'rocat',
            products: [
                {
                    description: null,
                    id: null,
                    image_data: null,
                    name: null,
                    price: null,
                    rating: null,
                },
            ],
        },
    ]);
});

test('delete company', async () => {
    await deleteCompany(3);
    const response = await getOneCompany(3);
    expect(response).toEqual([]);
});
