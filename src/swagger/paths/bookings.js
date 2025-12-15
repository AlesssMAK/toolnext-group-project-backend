/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Booking management endpoints
 *
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toolId
 *               - date
 *               - userFirstname
 *               - userLastname
 *               - userPhone
 *               - startDate
 *               - endDate
 *               - deliveryCity
 *               - deliveryBranch
 *             properties:
 *               toolId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               date:
 *                 type: string
 *                 example: 2025-12-20
 *               userFirstname:
 *                 type: string
 *                 example: John
 *               userLastname:
 *                 type: string
 *                 example: Doe
 *               userPhone:
 *                 type: string
 *                 example: "+380123456789"
 *               startDate:
 *                 type: string
 *                 example: 2025-12-20
 *               endDate:
 *                 type: string
 *                 example: 2025-12-25
 *               deliveryCity:
 *                 type: string
 *                 example: Kyiv
 *               deliveryBranch:
 *                 type: string
 *                 example: Branch #1
 *     responses:
 *       201:
 *         description: Booking successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Successfully created booking!
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
