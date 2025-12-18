/**
 * @swagger
 * tags:
 *   - name: Feedbacks
 *     description: Feedback management
 *
 * /api/feedbacks:
 *   get:
 *     summary: Get all feedbacks with pagination and sorting
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Feedbacks per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Feedbacks list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 perPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalFeedbacks:
 *                   type: integer
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 *
 *   post:
 *     summary: Create feedback for a tool
 *     tags: [Feedbacks]
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
 *               - description
 *               - rate
 *             properties:
 *               toolId:
 *                 type: string
 *                 description: Tool ObjectId
 *               description:
 *                 type: string
 *               rate:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Feedback created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *                 ownerStats:
 *                   type: object
 *                   properties:
 *                     totalFeedbacks:
 *                       type: number
 *                     ownerRating:
 *                       type: number
 *       400:
 *         description: Validation error
 *       404:
 *         description: Tool not found
 *
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         rate:
 *           type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
