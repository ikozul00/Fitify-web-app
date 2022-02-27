import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchEntryById } from "pages/api/ModifyProducts";

const ModifyProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (router.query.id) {
      let entry = await fetchEntryById(router.query.id);
      entry = entry.fields;
      setTitle(entry.title["en-US"]);
      setPrice(entry.price["en-US"]);
    }
  }, [router]);

  return (
    <div>
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
          <label htmlFor="price" className="mt-5 text-xl">
            Price:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ModifyProduct;
