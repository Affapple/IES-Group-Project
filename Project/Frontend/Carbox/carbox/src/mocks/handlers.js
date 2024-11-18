import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:8080/api/v2/vehicles', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: "John's Car", license: '12-AB-34', live: true },
        { id: '2', name: "Mom's", license: '23-GW-43' },
        { id: '3', name: "Dad's", license: '20-SH-35' },
        { id: '4', name: 'Smart', license: '94-OF-12' },
      ])
    );
  }),
];