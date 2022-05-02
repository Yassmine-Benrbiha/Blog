from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from app.server.database import (
    add_blog,
    retrieve_blog,
    retrieve_blogs,
)

from app.server.models.blog import (
    ErrorResponseModel,
    ResponseModel,
    BlogSchema,
)

router = APIRouter()

@router.post("/", response_description="Blog data added into the database")
async def add_blog_data(blog: BlogSchema = Body(...)):
    blog = jsonable_encoder(blog)
    new_blog = await add_blog(blog)
    return ResponseModel(new_blog, "Blog added successfully.")

@router.get("/", response_description="Blogs retrieved")
async def get_blogs():
    blogs = await retrieve_blogs()
    if blogs:
        return ResponseModel(blogs, "Blogs data retrieved successfully")
    return ResponseModel(blogs, "Empty list returned")

@router.get("/{id}", response_description="blog data retrieved")
async def get_blog_data(id):
    blog = await retrieve_blog(id)
    if blog:
        return ResponseModel(blog, "blog data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "blog {id} doesn't exist.")