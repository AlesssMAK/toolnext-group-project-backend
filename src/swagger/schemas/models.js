/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *           example: 64f0c2a9b9a1c2a1a1234567
 *         name:
 *           type: string
 *           description: User's name
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john.doe@example.com
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
 *           description: User's avatar (URL or initial)
 *           example: J
 *         avatarUrl:
 *           type: string
 *           description: Optional avatar URL if uploaded
 *           example: https://res.cloudinary.com/demo/avatar.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User registration timestamp
 *           example: 2025-12-28T12:34:56Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: 2025-12-28T12:34:56Z
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
 *           example: 64f0c2b0b9a1c2a1a1234568
 *         owner:
 *           type: string
 *           description: ID of the tool owner
 *           example: 64f0c2a9b9a1c2a1a1234567
 *         category:
 *           type: string
 *           description: ID of the tool category
 *           example: 64f0c2b0b9a1c2a1a1234569
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
 *           additionalProperties:
 *             type: string
 *           description: Tool specifications as key-value pairs
 *           example: { power: "18V", weight: "1.5kg" }
 *         rentalTerms:
 *           type: string
 *           description: Rental terms and conditions
 *           example: Minimum rental period is 1 day
 *         bookedDates:
 *           type: array
 *           items:
 *             type: string
 *             description: Booking IDs for the tool
 *           example: []
 *         feedbacks:
 *           type: array
 *           items:
 *             type: string
 *             description: Feedback IDs for the tool
 *           example: []
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Tool creation timestamp
 *           example: 2025-12-28T12:34:56Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Tool last update timestamp
 *           example: 2025-12-28T12:34:56Z
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
 *           example: 64f0c2d1b9a1c2a1a1234572
 *         toolId:
 *           type: string
 *           description: ID of the booked tool
 *           example: 64f0c2b0b9a1c2a1a1234568
 *         userId:
 *           type: string
 *           description: ID of the user who made the booking (optional)
 *           example: 64f0c2a9b9a1c2a1a1234567
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
 *           description: Booking creation timestamp
 *           example: 2025-12-28T12:34:56Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Booking last update timestamp
 *           example: 2025-12-28T12:34:56Z
 *
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated category ID
 *           example: 64f0c2bfb9a1c2a1a1234569
 *         title:
 *           type: string
 *           description: Category title
 *           example: Power Tools
 *
 *     Feedback:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - rate
 *         - userId
 *         - toolId
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated feedback ID
 *           example: 64f0c2e1b9a1c2a1a1234573
 *         toolId:
 *           type: string
 *           description: ID of the tool
 *           example: 64f0c2b0b9a1c2a1a1234568
 *         userId:
 *           type: string
 *           description: ID of the user who left feedback
 *           example: 64f0c2a9b9a1c2a1a1234567
 *         name:
 *           type: string
 *           description: Name of the feedback author
 *           example: John Doe
 *         description:
 *           type: string
 *           description: Feedback comment
 *           example: Great tool, works perfectly!
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1 to 5
 *           example: 5
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Feedback creation timestamp
 *           example: 2025-12-28T12:34:56Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Feedback last update timestamp
 *           example: 2025-12-28T12:34:56Z
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
