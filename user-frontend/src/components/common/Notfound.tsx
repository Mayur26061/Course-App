interface OptionalProps {
  title?: string;
}
const Notfound = ({ title }: OptionalProps) => {
  return <div>{title || "Page Not Found"}</div>;
};

export default Notfound;
