import instaloader
import json
import sys

def get_user_details(username):
    loader = instaloader.Instaloader()
    try:
        profile = instaloader.Profile.from_username(loader.context, username)
        user_details = {
          "username": profile.username,
          "userid": profile.userid,
          "full_name": profile.full_name,
          "biography": profile.biography,
          "external_url": profile.external_url,
          "profile_pic_url": profile.profile_pic_url,
          # "profile_pic_url_hd": profile.profile_pic_url_hd,
          "followers": profile.followers,
          "following": profile.followees,
          "posts": profile.mediacount,
          "igtv_posts": profile.igtvcount,
          "is_private": profile.is_private,
          "is_verified": profile.is_verified,
          "business_category_name": profile.business_category_name,
          # "business_email": profile.business_email,
          # "business_phone_number": profile.business_phone_number,
          # "business_address_json": profile.business_address_json,
          "has_public_story": profile.has_public_story,
          "has_highlight_reels": profile.has_highlight_reels,
          "is_business_account": profile.is_business_account,
          # "is_professional_account": profile.is_professional_account,
        }
        # print("user_details: ",json.dumps(user_details))
        return user_details
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python instagram_user_details.py [username]"}))
    else:
        username = sys.argv[1]
        result = get_user_details(username)
        print(json.dumps(result))

