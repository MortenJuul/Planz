import notfound from "./404.png"

const NotFoundIMG = (props) => (
  <img
    alt="Page not found"
    src={ notfound }
    className="notFound"
    style={{
        marginTop: 50,
        display: 'inline-block',
        maxWidth: '100%',
        width: 560
      }}
    {...props}
  />
);

export default NotFoundIMG;
