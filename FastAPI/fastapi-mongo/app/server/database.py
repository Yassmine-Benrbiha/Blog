
import os
import motor.motor_asyncio
from bson.objectid import ObjectId

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://<username>:<password>@<url>/<db>?retryWrites=true&w=majority")
database = client.blogsDB
blog_collection = database.get_collection("blogs")


def blog_helper(blog) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "author": blog["author"],
        "content": blog["content"]
    }

async def retrieve_blogs():
    blogs = []
    async for blog in blog_collection.find():
        blogs.append(blog_helper(blog))
    return blogs


async def add_blog(blog_data: dict) -> dict:
    blog = await blog_collection.insert_one(blog_data)
    new_blog = await blog_collection.find_one({"_id": blog.inserted_id})
    return blog_helper(new_blog)


# Retrieve a blog with a matching ID
async def retrieve_blog(id: str) -> dict:
    blog = await blog_collection.find_one({"_id": ObjectId(id)})
    if blog:
        return blog_helper(blog)
