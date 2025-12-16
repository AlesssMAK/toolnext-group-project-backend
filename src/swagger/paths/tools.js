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
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated category IDs
 *         example: 507f1f77bcf86cd799439013,507f1f77bcf86cd799439014
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by tool name (case-insensitive)
 *     responses:
 *       200:
 *         description: Successfully retrieved tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalItems:
 *                   type: integer
 *                   example: 25
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 tools:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tool'
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
 *                 example: Professional cordless drill
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439013
 *               pricePerDay:
 *                 type: number
 *                 example: 15.99
 *               image:
 *                 type: string
 *                 format: binary
 *               specifications:
 *                 type: string
 *                 description: JSON string with tool specifications
 *                 example: '{ "power": "18V", "weight": "1.5kg" }'
 *     responses:
 *       201:
 *         description: Tool successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Tool'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               imageRequired:
 *                 summary: Image is required
 *                 value:
 *                   message: Image is required
 *               invalidSpecifications:
 *                 summary: Invalid JSON in specifications
 *                 value:
 *                   message: Invalid JSON in specifications
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
 *     responses:
 *       200:
 *         description: Tool found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tool'
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
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               pricePerDay:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *               specifications:
 *                 type: string
 *                 description: JSON string
 *     responses:
 *       200:
 *         description: Tool successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Tool'
 *       400:
 *         description: Invalid JSON in specifications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 403
 *               message: Access denied: You are not the owner
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
 *     responses:
 *       200:
 *         description: Tool successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tool'
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
