import { Router } from 'express';
import usersRoute from './users.route';
import postsRoute from './post.route';
import menuRoute from './menu.route';
import eventRoute from './event.route';
import PostModel from '../../models/Post.model';
import EventModel from '../../models/Event.model';
import catchAsync from '../../utils/catchAsync';

const router = Router();

router.use('/users', usersRoute);
router.use('/posts', postsRoute);
router.use('/events', eventRoute);
router.use('/menu', menuRoute);
router.get('/dashboard', catchAsync(async (req, res, next) => {

  // get top 3 posts
  const posts = await PostModel.find({}, '-postContent').sort({ createdAt: -1 }).limit(3);

  // get top 3 events
  const events = await EventModel.find({ status: 'upcoming' }).sort({ createdAt: -1 }).limit(3);

  res.status(200).json({
    success: true,
    data: {
      posts,
      events
    }
  });
}));

export default router;
