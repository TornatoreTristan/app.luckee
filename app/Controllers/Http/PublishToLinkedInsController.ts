import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { DateTime } from 'luxon'

export default class PublishToLinkedInsController {
  public async PublishToLinkedIn({ params, auth, response }: HttpContextContract) {
    const user = auth.user
    const post = await Post.findOrFail(params.id)
    try {
      await fetch(`https://api.linkedin.com/v2/ugcPosts`, {
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
    } catch (error) {
      console.log(error)
    }
    post.publishedAt = DateTime.local()
    post.publishAt = DateTime.local()
    post.status = 'published'
    await post.save()
    return response.status(200).send({ success: true })
  }
}
