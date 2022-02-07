export const Ul = (props) => <ul className="my-4" {...props} />;

export const Ol = (props) => <ol className="my-4" {...props} />;

export const Li = (props) => (
  <li className="list-disc list-inside ml-4">
    <span className="text-gray-700" {...props} />
  </li>
);
