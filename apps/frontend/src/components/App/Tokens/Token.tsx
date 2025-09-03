import React from "react";
import { Link, useParams } from "react-router-dom";
import TokenFrame from "./TokenFrame";

function Token() {
  let { id, hash } = useParams() as { id: string; hash: string };

  return (
    <>
      <Link to="/">Back</Link>
      <TokenFrame
        key={hash}
        hash={hash}
        tokenId={parseInt(id, 10)}
        width={window.innerWidth}
        height={window.innerHeight - 20}
        script={""}
      />
    </>
  );
}

export default Token;
