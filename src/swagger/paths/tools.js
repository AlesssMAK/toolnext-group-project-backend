/**
 * @swagger
 * tags:
 *   - name: Tools
 *     description: Tool management endpoints
 *
 * /api/tools:
 *   get:
 *     summary: Get all tools with filtering and pagination
 *     tags: [Tools]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price per day
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price per day
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in tool name and description
 *     responses:
 *       200:
 *         description: List of tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully found tools!
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Tool'
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     perPage:
 *                       type: integer
 *                       example: 10
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     summary: Create a new tool
 *     tags: [Tools]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - pricePerDay
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Power Drill
 *               description:
 *                 type: string
 *                 example: Professional cordless power drill
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439013
 *               pricePerDay:
 *                 type: number
 *                 example: 15.99
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Tool image file
 *               specifications:
 *                 type: object
 *                 example: { "power": "18V", "weight": "1.5kg" }
 *               rentalTerms:
 *                 type: string
 *                 example: Minimum rental period is 1 day
 *     responses:
 *       201:
 *         description: Tool successfully created
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
 *                   example: Successfully created a tool!
 *                 data:
 *                   $ref: '#/components/schemas/Tool'
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
 *
 * /api/tools/{toolId}:
 *   get:
 *     summary: Get tool by ID
 *     tags: [Tools]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     responses:
 *       200:
 *         description: Tool details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully found tool!
 *                 data:
 *                   $ref: '#/components/schemas/Tool'
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   patch:
 *     summary: Update tool by ID
 *     tags: [Tools]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Power Drill Pro
 *               description:
 *                 type: string
 *                 example: Updated professional cordless power drill
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439013
 *               pricePerDay:
 *                 type: number
 *                 example: 18.99
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Updated tool image file
 *               specifications:
 *                 type: object
 *               rentalTerms:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tool successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully updated tool!
 *                 data:
 *                   $ref: '#/components/schemas/Tool'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Delete tool by ID
 *     tags: [Tools]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     responses:
 *       204:
 *         description: Tool successfully deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
