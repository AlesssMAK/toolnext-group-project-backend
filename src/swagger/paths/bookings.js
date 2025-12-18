/**
 * @swagger
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
 *                 example: 692db3ffab59e437964311b7
 *               userFirstname:
 *                 type: string
 *                 example: John
 *               userLastname:
 *                 type: string
 *                 example: Doe
 *               userPhone:
 *                 type: string
 *                 example: "+380 50 123 45 64"
 *               startDate:
 *                 type: string
 *                 example: 2026-02-11
 *               endDate:
 *                 type: string
 *                 example: 2026-02-12
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
 *               $ref: '#/components/schemas/Booking'
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               phoneRequired:
 *                 summary: Phone is required
 *                 value:
 *                   statusCode: 400
 *                   message: Phone is required
 *               toolIdRequired:
 *                 summary: toolId is required
 *                 value:
 *                   statusCode: 400
 *                   message: toolId is required
 *               toolAlreadyBooked:
 *                 summary: Tool already booked
 *                 value:
 *                   statusCode: 400
 *                   message: Tool is already booked for these dates
 *
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 401
 *               message: Not authenticated
 *
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 404
 *               message: Tool not found
 */
