const Upload = () => {
  return (
    <form
      action="/api/upload"
      method="post"
      encType="multipart/form-data"
      className="flex flex-col border w-fit border-green-500 p-10 rounded-md"
    >
      <label className="my-2">Upload video</label>
      <input
      name="videoFile"
        type="file"
        placeholder="Upload video"
        // accept="video/*"
        className="border-2 border-indigo-500 p-2"
      />
      <input type="text" name= "isMovie" className="border-2 border-indigo-500 p-2"/>
      <button type="submit" className="my-2 py-2 mt-10 border-indigo-600 border-2 rounded-full">
        Uplaod
      </button>
    </form>
  );
};

export default Upload;


