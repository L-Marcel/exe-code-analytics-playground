import { useEffect, useState } from "react";

function Example() {
  const [name, setName] = useState("");

  useEffect(() => {
    if(name === "") {
      setName("strange");
    };
  }, [name,setName]);

  return (
    <div>
      Hello, {name}!
    </div>
  ); 
};

export { Example };
