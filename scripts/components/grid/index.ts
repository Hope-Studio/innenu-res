import { checkKeys } from "@mr-hope/assert-type";
import { resolvePath } from "../utils";
import type { GridComponentConfig } from "./typings";

export const resolveGrid = (
  element: GridComponentConfig,
  pageId: string,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      header: { type: ["string", "undefined"], additional: [false] },
      content: "array",
      footer: ["string", "undefined"],
    },
    location
  );

  element.content.forEach((gridItem) => {
    // 处理路径
    if (gridItem.path)
      if (gridItem.path.startsWith("/"))
        gridItem.path = resolvePath(gridItem.path);
      else {
        const paths = pageId.split("/");

        paths.pop();

        gridItem.path = resolvePath(`${paths.join("/")}/${gridItem.path}`);
      }

    checkKeys(
      gridItem,
      {
        text: "string",
        icon: "string",
        base64Icon: ["string", "undefined"],
        color: "string",
        name: "string",
        path: ["string", "undefined"],
        url: ["string", "undefined"],
      },
      `${location}.content`
    );
  });
};
