/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           description: User's name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's hashed password
 *           example: $2b$10$...
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: User's role
 *           example: user
 *         rating:
 *           type: number
 *           default: 0
 *           description: User's rating
 *           example: 4.5
 *         toolsCount:
 *           type: number
 *           default: 0
 *           description: Number of tools owned by user
 *           example: 3
 *         avatar:
 *           type: string
 *           description: User's avatar URL or initial
 *           example: J
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User registration timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *
 *     Tool:
 *       type: object
 *       required:
 *         - owner
 *         - category
 *         - name
 *         - description
 *         - pricePerDay
 *         - images
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated tool ID
 *           example: 507f1f77bcf86cd799439012
 *         owner:
 *           type: string
 *           description: ID of the tool owner
 *           example: 507f1f77bcf86cd799439011
 *         category:
 *           type: string
 *           description: ID of the tool category
 *           example: 507f1f77bcf86cd799439013
 *         name:
 *           type: string
 *           description: Tool name
 *           example: Power Drill
 *         description:
 *           type: string
 *           description: Tool description
 *           example: Professional cordless power drill with 18V battery
 *         pricePerDay:
 *           type: number
 *           description: Rental price per day
 *           example: 15.99
 *         images:
 *           type: string
 *           description: Tool image URL
 *           example: https://cloudinary.com/image.jpg
 *         rating:
 *           type: number
 *           default: 0
 *           description: Tool rating
 *           example: 4.7
 *         specifications:
 *           type: object
 *           description: Tool specifications
 *           example: { power: "18V", weight: "1.5kg" }
 *         rentalTerms:
 *           type: string
 *           description: Rental terms and conditions
 *           example: Minimum rental period is 1 day
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Booking:
 *       type: object
 *       required:
 *         - toolId
 *         - date
 *         - userFirstname
 *         - userLastname
 *         - userPhone
 *         - startDate
 *         - endDate
 *         - deliveryCity
 *         - deliveryBranch
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated booking ID
 *           example: 507f1f77bcf86cd799439014
 *         toolId:
 *           type: string
 *           description: ID of the booked tool
 *           example: 507f1f77bcf86cd799439012
 *         userId:
 *           type: string
 *           description: ID of the user who made the booking (optional)
 *           example: 507f1f77bcf86cd799439011
 *         date:
 *           type: string
 *           description: Booking date
 *           example: 2025-12-20
 *         bookingNum:
 *           type: string
 *           description: Auto-generated booking number
 *           example: 0000001
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           default: pending
 *           description: Booking status
 *           example: pending
 *         userFirstname:
 *           type: string
 *           description: Customer's first name
 *           example: John
 *         userLastname:
 *           type: string
 *           description: Customer's last name
 *           example: Doe
 *         userPhone:
 *           type: string
 *           description: Customer's phone number
 *           example: "+380123456789"
 *         startDate:
 *           type: string
 *           description: Rental start date
 *           example: 2025-12-20
 *         endDate:
 *           type: string
 *           description: Rental end date
 *           example: 2025-12-25
 *         deliveryCity:
 *           type: string
 *           description: Delivery city
 *           example: Kyiv
 *         deliveryBranch:
 *           type: string
 *           description: Delivery branch
 *           example: Branch #1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated category ID
 *           example: 507f1f77bcf86cd799439013
 *         name:
 *           type: string
 *           description: Category name
 *           example: Power Tools
 *         description:
 *           type: string
 *           description: Category description
 *           example: Electric and battery-powered tools
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated feedback ID
 *           example: 507f1f77bcf86cd799439015
 *         toolId:
 *           type: string
 *           description: ID of the tool
 *           example: 507f1f77bcf86cd799439012
 *         userId:
 *           type: string
 *           description: ID of the user who left feedback
 *           example: 507f1f77bcf86cd799439011
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1 to 5
 *           example: 5
 *         comment:
 *           type: string
 *           description: Feedback comment
 *           example: Great tool, works perfectly!
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code
 *           example: 400
 *         message:
 *           type: string
 *           description: Error message
 *           example: Invalid request parameters
 *         data:
 *           type: object
 *           description: Additional error data
 */
