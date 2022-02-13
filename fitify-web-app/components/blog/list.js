export const Ul = (props) => <ul className=" sm:text-base text-sm my-4" {...props} />;

export const Ol = (props) => <ol className="my-4" {...props} />;

export const Li = (props) => (
  <li className=" sm:text-base text-sm list-disc list-inside ml-4">
    <span className="font-semibold" {...props} />
  </li>
);
