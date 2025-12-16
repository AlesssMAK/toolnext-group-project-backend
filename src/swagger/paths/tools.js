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
 *         description: Items per page
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
 *         description: Tools list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
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
 *                 example: '{ "power": "18V", "weight": "1.5kg" }'
 *     responses:
 *       201:
 *         description: Tool created
 *       400:
 *         description: Validation error
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
 *       404:
 *         description: Tool not found
 *
 *   patch:
 *     summary: Update tool
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
 *     responses:
 *       200:
 *         description: Tool updated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Tool not found
 *
 *   delete:
 *     summary: Delete tool
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
 *         description: Tool deleted
 *       404:
 *         description: Tool not found
 */
