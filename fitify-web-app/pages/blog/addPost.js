import { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="md:ml-16 ml-8 w-11/12 my-12 font-open-sans">
      <div className="flex flex-row">
        <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold basis-5/6">
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

          <label htmlFor="thumbnailImage" className="mt-5 text-xl">
            Thumbnail image:
          </label>
          <input
            type="file"
            id="thumbnailImage"
            name="thumbnailImage"
            onChange={(e) => setThumbnailImage(e.target.files[0])}
          />
          <label htmlFor="headerImage" className="mt-5 text-xl">
            Thumbnail image:
          </label>
          <input
            type="file"
            id="headerImage"
            name="headerImage"
            onChange={(e) => setHeaderImage(e.target.files[0])}
          />
          <button className=" bg-fitify-purple text-white w-36 py-2 place-self-end mb-7">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
