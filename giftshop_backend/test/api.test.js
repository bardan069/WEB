const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

let testGiftId = '';

describe('Gift Shop API', () => {
  // 1. Test server is running
  it('should return 200 for server health check', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).to.equal(200);
  });

  // 2. Get all gifts
  it('should fetch all gifts', async () => {
    const res = await request(app).get('/api/v1/gifts');
    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
    if (res.body.data.length > 0) testGiftId = res.body.data[0]._id;
    expect(testGiftId).to.be.ok;
  });

  // 3. Add gift to cart
  it('should add a gift to cart', async () => {
    if (!testGiftId) return;
    const res = await request(app)
      .post('/api/v1/cart/add')
      .set('Authorization', 'Bearer test-token')
      .send({ giftId: testGiftId, quantity: 1 });
    expect(res.status).to.equal(201);
  });

  // 4. Get gift details
  it('should fetch gift details', async () => {
    if (!testGiftId) return;
    const res = await request(app).get(`/api/v1/gifts/${testGiftId}`);
    expect(res.status).to.equal(200);
    expect(res.body.data._id).to.equal(testGiftId);
  });

  // 5. Test customer registration
  it('should register a new customer', async () => {
    const res = await request(app)
      .post('/api/v1/customers/register')
      .send({
        fname: 'Test',
        lname: 'User',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890'
      });
    expect(res.status).to.equal(201);
  });

  // 6. Test customer login
  it('should login a customer', async () => {
    const res = await request(app)
      .post('/api/v1/customers/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
  });

  // 7. Test order creation
  it('should create an order', async () => {
    if (!testGiftId) return;
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', 'Bearer test-token')
      .send({
        items: [{ gift: testGiftId, quantity: 1, price: 100 }],
        shippingAddress: {
          fullName: 'Test User',
          address: '123 Test St',
          phone: '1234567890'
        },
        paymentMethod: 'cash',
        subtotal: 100,
        tax: 10,
        shippingCost: 5,
        totalAmount: 115
      });
    expect(res.status).to.equal(201);
  });

  // 8. Get featured gifts
  it('should fetch featured gifts', async () => {
    const res = await request(app).get('/api/v1/gifts/featured');
    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
  });
}); 