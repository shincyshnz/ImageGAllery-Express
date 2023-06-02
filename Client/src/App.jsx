import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { Modal } from "./components/Modal/Modal";

const API_URL = "http://localhost:3008";
// const API_URL = "https://image-gallery-node-back-end.vercel.app";

function App() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImagePath, setModalImagePath] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  // const [imagePreview, setImagePreview] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios(API_URL);
      setGalleryImages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // const handleImage = (event) => {
  //   setImages(event.target.files);
  //   let newImageUrls = [];

  //   Object.values(event.target.files).map((file) => {
  //     newImageUrls.push(URL.createObjectURL(file));
  //   });
  //   setImagePreview(newImageUrls);
  // };

  const uploadImage = async (event) => {
    const uploadFiles = event.target.files;

    const formData = new FormData();
    Object.values(uploadFiles).map((image) => {
      selectedFile.push(image.name);
      formData.append("upload-files", image);
    });
    // Boolean values are send in formData afterJSON.stringify
    formData.append("auth", JSON.stringify(true));

    try {
      const response = await axios(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(progress);
        },
      });
      if (response.status === 200) {
        setProgress(0);
        setSelectedFile([]);
        setGalleryImages((prev) => [...galleryImages, ...response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setModalOpen((prev) => (prev = !prev));
  };

  return (
    <>
      <div className="header">
        <h1>Photo Gallery</h1>
        <h3>A picture is worth thousand words</h3>

        <label htmlFor="upload-file" className="upload-file-name">
          <input
            type="file"
            id="upload-file"
            className="upload-file"
            // onChange={handleImage}
            onChange={uploadImage}
            multiple
          />
          <span>
            {selectedFile.map((filename, index) => {
              return <h3 key={index}>{filename}</h3>;
            })}
          </span>
        </label>

        {/* <div className="image-preview-container">
          {imagePreview.length > 0 &&
            imagePreview.map((image, index) => {
              return <img className="image-preview" key={index} src={image} />;
            })}
        </div> */}

        <ProgressBar progress={progress} />

        <div className="image-container">
          {galleryImages.length > 0 ? (
            galleryImages.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`${API_URL}/images/${image}`}
                  onClick={() => {
                    handleClick();
                    setModalImagePath(`${API_URL}/images/${image}`);
                  }}
                />
              );
            })
          ) : (
            <h3>Image Gallery is empty</h3>
          )}
        </div>
      </div>
      {modalOpen && (
        <Modal handleClick={handleClick} modalImagePath={modalImagePath} />
      )}
    </>
  );
}

export default App;
