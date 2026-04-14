const { userRouter, tutorRouter, enrollRouter, reviewRouter, paymentRouter, adminRouter, lessonRouter, liveRouter } = require('./allRoutes');
const map = { tutorRoutes: tutorRouter, enrollmentRoutes: enrollRouter, reviewRoutes: reviewRouter, paymentRoutes: paymentRouter, adminRoutes: adminRouter, lessonRoutes: lessonRouter, liveClassRoutes: liveRouter };
module.exports = map['paymentRoutes'] || tutorRouter;
