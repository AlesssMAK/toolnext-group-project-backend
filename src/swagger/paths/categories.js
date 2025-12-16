/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management endpoints
 *
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64f0c2a9b9a1c2a1a1234567
 *                       title:
 *                         type: string
 *                         example: Power Tools
 */
