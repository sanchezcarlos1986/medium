interface customStringProps {
  context: string;
  component: string;
  action: string;
}

export const customString = ({
  context,
  component,
  action,
}: customStringProps): string => {
  const data = {
    context,
    component,
    action,
  };

  const result = Object.values(data)
    .map((str) =>
      str
        .split(" ")
        .map((word) => word.toLowerCase())
        .join("-")
    )
    .join(".");

  return result;
};
