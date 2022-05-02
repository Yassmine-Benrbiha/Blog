from pydantic import BaseModel, Field

class BlogSchema(BaseModel):
    title: str = Field(...)
    author: str = Field(...)
    content: str = Field(...)


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}