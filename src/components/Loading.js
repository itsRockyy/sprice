import React from "react";

function Loading() {
  return (
    <div class="loading">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <small className="text-muted">Fetching data from server</small>
    </div>
  );
}

export default Loading;
