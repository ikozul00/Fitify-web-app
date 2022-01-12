import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

//Definiranje nacina kako se renderira RichText (tog je tipa body clanka)
export const RICH_TEXT_OPTIONS = {
  [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  [INLINES.HYPERLINK]: (node, children) => (
    <a className="hover:decoration-blue-400" href={node.data.url}>
      {children}
    </a>
  ),
  [BLOCKS.HEADING_2]: (node, children) => (
    <h2 className="text-center text-8xl my-8 text-red">{children}</h2>
  ),
  [MARKS.BOLD]: (node, children) => {
    return <p className="text-red"></p>;
  },
  [BLOCKS.HEADING_4]: (node, children) => (
    <h2 className="text-center text-8xl my-8 text-red">{children}</h2>
  ),
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};
