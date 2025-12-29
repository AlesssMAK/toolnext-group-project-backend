/**
 * @swagger
 * tags:
 *   - name: Tools
 *     description: Tool management
 */

/**
 * @swagger
 * /api/tools:
 *   get:
 *     summary: Get list of tools with filters and pagination
 *     tags: [Tools]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of category ObjectIds
 *         example: 6704d9c7f1a3b8c2d5e4f6a0,6704d9c7f1a3b8c2d5e4f6a1
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by tool name (case-insensitive)
 *         example: drill
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Minimum price per day
 *         example: 10
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Maximum price per day
 *         example: 100
 *
 *     responses:
 *       200:
 *         description: Successfully retrieved tools list
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
 *                   example: 42
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 tools:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tool'
 */

/**
 * @swagger
 * /api/tools:
 *   post:
 *     summary: Create new tool
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
 *                 description: Category ObjectId
 *               pricePerDay:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *               rentalTerms:
 *                 type: string
 *               specifications:
 *                 type: string
 *                 description: JSON string
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
 *         description: Validation or file error
 */

/**
 * @swagger
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
 */

/**
 * @swagger
 * /api/tools/{toolId}:
 *   patch:
 *     summary: Update tool (only owner)
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
 *               rentalTerms:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               specifications:
 *                 type: string
 *                 description: JSON string
 *     responses:
 *       200:
 *         description: Tool updated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Tool not found
 */

/**
 * @swagger
 * /api/tools/{toolId}:
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Tool:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         owner:
 *           type: string
 *         category:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         pricePerDay:
 *           type: number
 *         images:
 *           type: string
 *         rating:
 *           type: number
 *         rentalTerms:
 *           type: string
 *         specifications:
 *           type: object
 *         bookedDates:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *         feedbacks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
