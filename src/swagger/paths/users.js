/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management endpoints
 *
 * /api/users/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c2a9b9a1c2a1a1234567
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     avatar:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/avatar.jpg
 *                     rating:
 *                       type: number
 *                       example: 4.6
 *                     toolsCount:
 *                       type: integer
 *                       example: 5
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
 * /api/users/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64f0c2a9b9a1c2a1a1234567
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     avatar:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/avatar.jpg
 *                     rating:
 *                       type: number
 *                       example: 4.2
 *                     toolsCount:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 400
 *               message: Invalid user ID format
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 404
 *               message: User not found
 *
 * /api/users/{userId}/tools:
 *   get:
 *     summary: Get tools owned by specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *           default: 8
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved user's tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     tools:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Tool'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         perPage:
 *                           type: integer
 *                           example: 8
 *                         totalTools:
 *                           type: integer
 *                           example: 12
 *                         totalPages:
 *                           type: integer
 *                           example: 2
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/users/{userId}/feedbacks:
 *   get:
 *     summary: Get feedbacks for a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64f0c2a9b9a1c2a1a1234567
 *         description: ID of the user whose feedbacks are requested
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of feedbacks per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort feedbacks by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of feedbacks with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedbacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 64f0c2a9b9a1c2a1a1234568
 *                           userId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 64f0c2a9b9a1c2a1a1234567
 *                               name:
 *                                 type: string
 *                                 example: John Doe
 *                           toolId:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 64f0c2b0b9a1c2a1a1234569
 *                               name:
 *                                 type: string
 *                                 example: Hammer
 *                           rating:
 *                             type: integer
 *                             example: 5
 *                           comment:
 *                             type: string
 *                             example: Very useful tool
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-12-28T12:34:56Z
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         perPage:
 *                           type: integer
 *                           example: 10
 *                         totalFeedbacks:
 *                           type: integer
 *                           example: 25
 *                         totalPages:
 *                           type: integer
 *                           example: 3
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 400
 *               message: Invalid user ID format
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 404
 *               message: User not found
 *
 * /api/users/me/avatar:
 *   patch:
 *     summary: Update the authenticated user's avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file to set as avatar
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: https://res.cloudinary.com/demo/image/upload/v1234567890/avatar.jpg
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 400
 *               message: No file
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               statusCode: 401
 *               message: Unauthorized
 */
