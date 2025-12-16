/**
 * @swagger
 * tags:
 *   - name: Feedbacks
 *     description: Feedback management endpoints
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
 *         description: Number of items per page
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
 *         description: Successfully retrieved feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 perPage:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 totalFeedbacks:
 *                   type: integer
 *                   example: 25
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 */
