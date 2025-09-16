import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
    test('@API 1. Should return 200 and log product list', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/productsList');

        // Assert status
        expect(response.status()).toBe(200);

        const body = await response.json();

        // Check structure
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);

        // Log all products in terminal
        console.log('=== Product List ===');
        body.products.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} | Price: ${p.price} | Category: ${p.category?.category}`);
        });

        // Assert first product has required fields
        const firstProduct = body.products[0];
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
    });

    // Negativ test
    // test('@API 2. POST request should return 405 with correct message', async ({ request }) => {
    //     const response = await request.post('https://automationexercise.com/api/productsList', {
    //         data: { test: 'invalid' }
    //     });

    //     // Assert status code is 405
    //     expect(response.status()).toBe(405);

    //     // Parse JSON
    //     const body = await response.json();

    //     // Assert message is correct
    //     expect(body).toHaveProperty('message', 'This request method is not supported.');

    //     // Log for visibility
    //     console.log('=== Negative Test Response ===');
    //     console.log(body);
    // });
});