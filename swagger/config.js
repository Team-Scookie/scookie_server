/**
 * @swagger
 * tags:
 *   name: Points
 *   description: Point API
 * definitions:
 *   Points:
 *     type: object
 *     required:
 *       - _id
 *     properties:
 *       _id:
 *         type: string
 *         description: ObjectID
 *       userId:
 *         type: string
 *         description: 유저 아이디
 *       latitude:
 *         type: string
 *         description: 위도
 *       longitude:
 *         type: string
 *         description: 경도
 *       createdAt:
 *         type: string
 *         description: 생성 시간
 *       updatedAt:
 *         type: string
 *         description: 수정 시간
 *       marker:
 *         type: object
 *         description: 마커 정보
 */
