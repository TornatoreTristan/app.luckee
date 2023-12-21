import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { DateTime } from 'luxon'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class LinkedInPostsScheduler extends BaseTask {
  public static get schedule() {
    return CronTimeV2.everySecond()
  }

  public static get useLock() {
    return false
  }

  public async handle() {
    const now = new Date()
    const postsToPublish = await Post.query()
      .where('publish_at', '<=', now)
      .whereNull('published_at')
      .exec()
    console.log(postsToPublish)

    const publishToLinkedIn = async (post) => {
      const user = await User.find(post.userId)
      try {
        const response = await fetch(`https://api.linkedin.com/v2/ugcPosts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.linkedin_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: `urn:li:person:${user?.linkedin_id}`,
            lifecycleState: 'PUBLISHED',
            specificContent: {
              'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                  text: post.content,
                },
                shareMediaCategory: 'NONE',
              },
            },
            visibility: {
              'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
            },
          }),
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        console.error('Erreur lors de la publication sur LinkedIn:', error)
        throw error
      }
    }

    for (const post of postsToPublish) {
      try {
        const publishedPost = await publishToLinkedIn(post)
        post.publishedAt = DateTime.now()
        post.status = 'published'
        await post.save()
        console.log('Post publié sur LinkedIn:', publishedPost)
      } catch (error) {
        console.error('Erreur lors de la publication du post:', post.id, error)
      }
    }
  }
}
