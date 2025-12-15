/**
 * @swagger
 * tags:
 *   - name: Feedbacks
 *     description: Feedback management endpoints
 *
 * /api/feedbacks:
 *   get:
 *     summary: Get all feedbacks with filtering
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: query
 *         name: toolId
 *         schema:
 *           type: string
 *         description: Filter feedbacks by tool ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter feedbacks by user ID
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
 *     responses:
 *       200:
 *         description: List of feedbacks
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
 *                   example: Successfully found feedbacks!
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Feedback'
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     perPage:
 *                       type: integer
 *                       example: 10
 *                     totalItems:
 *                       type: integer
 *                       example: 25
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
