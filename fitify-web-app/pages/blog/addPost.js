import { useState } from "react";
import ImageChanger from "@/components/dataModification/ImageChanger";
import { checkPost } from "@/lib/errorChecking";
import { createNewBlogPost } from "pages/api/ModifyBlogPosts";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");

  const sendPost = async (e) => {
    e.preventDefault();
    let newPost = {
      title: title,
      description: description,
      body: body,
      thumbnailImage: thumbnailImage,
      headerImage: headerImage,
    };

    console.log(newPost);
    let errorCheck = checkPost(newPost);
    if (errorCheck.error) {
      NotificationManager.warning(errorCheck.errorMsg);
    } else {
      NotificationManager.info("Your query is processing.");
      errorCheck = await createNewBlogPost(newPost)
        .then((reply) => {
          if (reply.errorMsg)
            //Ako se vrati poruka da vec postoji post takvog imena
            NotificationManager.error(reply.errorMsg);
          else
            NotificationManager.success(
              "Post is successfully added! Change will be visible in several minutes."
            );
        })
        .catch(() => NotificationManager.error("Ooops! Something went wrong!"));
    }
  };

  return (
    <div className="md:ml-16 ml-8 w-11/12 my-12 font-open-sans">
      <div className="flex flex-row">
        <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold basis-5/6 px-7">
          Add new post
        </h1>
      </div>
      <form className=" w-5/6 my-5 flex flex-col">
        <div className="px-7 flex flex-col sm:text-base text-sm">
          <label htmlFor="title" className="mt-5 text-xl">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description" className="mt-5 text-xl">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            className="border-2 mb-5 border-fitify-purple form-field "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="body" className="mt-5 text-xl">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={12}
            className="border-2 mb-5 border-fitify-purple form-field "
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
          <p className="mt-5 text-xl">Thumbnail image:</p>
          <ImageChanger
            imageId={""}
            setNewImage={(img) => setThumbnailImage(img.file)}
          />
          <p className="mt-5 text-xl">Header image:</p>
          <ImageChanger
            imageId={""}
            setNewImage={(img) => setHeaderImage(img.file)}
          />
          <button
            className=" bg-fitify-purple text-white w-36 py-2 place-self-end mb-7"
            onClick={sendPost}
          >
            Add
          </button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default AddPost;
