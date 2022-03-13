import { useEffect, useState } from "react";
import ImageChanger from "@/components/dataModification/ImageChanger";
import { checkPost } from "@/lib/errorChecking";
import { fetchEntryById } from "pages/api/ModifyProducts";
import { updateBlogPost } from "pages/api/ModifyBlogPosts";
import { useRouter } from "next/router";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (router.query.id) {
      let entry = await fetchEntryById(router.query.id)
        .then((entry) => entry.fields)
        .catch(() => false);

      if (!entry) router.push("/404");
      else {
        console.log(entry);
        setTitle(entry.title["en-US"]);
        setDescription(entry.description["en-US"]);
        setBody(entry.body["en-US"]);
        setThumbnailImage(entry.thumbnailImage["en-US"].sys);
        setHeaderImage(entry.headerImage["en-US"].sys);
      }
    }
  }, [router]);

  const sendPost = async (e) => {
    e.preventDefault();
    let newPost = {
      id: router.query.id,
      title: title,
      description: description,
      body: body,
      thumbnailImage: thumbnailImage,
      headerImage: headerImage,
    };

    console.log(newPost);
    let errorCheck = checkPost(newPost);
    if (errorCheck.error) {
      setErrorMessage(errorCheck.errorMsg);
    } else {
      setErrorMessage("Your query is processing.");
      errorCheck = await updateBlogPost(newPost);
      if (errorCheck.error) setErrorMessage(errorCheck.errorMsg);
      else
        setErrorMessage(
          "Post is successfully updated! Change will be visible in several minutes."
        );
    }
  };

  return (
    <div className="md:ml-16 ml-8 w-11/12 my-12 font-open-sans">
      <div className="flex flex-row">
        <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold basis-5/6 px-7">
          Add new post
        </h1>
        {errorMessage && (
          <p className="border-2 border-fitify-pink text-2xl p-2 basis-1/6">
            {errorMessage}
          </p>
        )}
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
            imageId={thumbnailImage.id}
            setNewImage={(img) => setThumbnailImage(img)}
          />
          <p className="mt-5 text-xl">Header image:</p>
          <ImageChanger
            imageId={headerImage.id}
            setNewImage={(img) => setHeaderImage(img)}
          />
          <button
            className=" bg-fitify-purple text-white w-36 py-2 place-self-end mb-7"
            onClick={sendPost}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
