export const Ul = (props) => <ul {...props} />;

export const Ol = (props) => <ol className="my-4" {...props} />;

export const Li = (props) => (
  <li className="list-disc list-inside text-hci-lila-light">
    <span className="text-gray-700" {...props} />
  </li>
);
