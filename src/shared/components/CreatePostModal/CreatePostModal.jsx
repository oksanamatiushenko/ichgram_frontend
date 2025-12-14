import React, { useState, useEffect, useRef } from "react";
import styles from "./CreatePostModal.module.css";

const CreatePostModal = ({ onClose }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log("Submit post", { caption, previewUrl });
    onClose();
  };

  // ESC — закрытие
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Отключение скролла body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src="/btn-clear.svg" alt="Close" />
          </button>

          <h3 className={styles.modalTitle}>Create new post</h3>

          <button className={styles.shareBtn} onClick={handleSubmit}>
            Share
          </button>
        </div>

        {/* BODY */}
        <div className={styles.modal}>
          
          {/* LEFT — Photo */}
          <div
            className={styles.photoSection}
            onClick={() => fileInputRef.current.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className={styles.photo} />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <div className={styles.imageBox}>
                  <img src="/upload-img.svg" alt="Upload" />
                </div>
                <p>Select from computer</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* RIGHT — Form */}
          <div className={styles.infoSection}>

            <div className={styles.authorInfo}>
              <div className={styles.avatarPlaceholder}>
                <img src="/itcareerhub.png" alt="logo" />
              </div>
              <p>username</p>
            </div>

            <div className={styles.form}>
              <div className={styles.captionCounter}>
                {caption.length}/2200
              </div>

              <textarea
                className={styles.textarea}
                placeholder="Add comment"
                value={caption}
                maxLength={2200}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatePostModal;


// import React, { useState } from "react";
// import styles from "./CreatePostModal.module.css";

// const CreatePostModal = () => {
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [caption, setCaption] = useState("");

//   const handleClose = () => {
//     console.log("Close modal");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Submit post", { caption, previewUrl });
//   };

//   return (
//     <div className={styles.overlay} onClick={handleClose}>
//       <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
//         <div className={styles.modalHeader}>
//           <button className={styles.closeBtn} onClick={handleClose}>
//             <img src="/btn-clear.svg" alt="Close" />
//           </button>
//           <h3 className={styles.modalTitle}>Create new post</h3>
//           <button
//             className={styles.shareBtn}
//             onClick={handleSubmit}

//           >
//             Share
//           </button>
//         </div>

//         <div className={styles.modal}>
//           <div
//             className={styles.photoSection}
//             onClick={() => document.getElementById("fileInput").click()}
//           >
//             {previewUrl ? (
//               <img src={previewUrl} alt="Preview" className={styles.photo} />
//             ) : (
//               <div className={styles.uploadPlaceholder}>
//                 <div className={styles.imageBox}>
//                   <img src="/upload-img.svg" alt="Upload" />
//                 </div>
//               </div>
//             )}
//             <input
//               id="fileInput"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: "none" }}
//             />
//           </div>

//           <div className={styles.infoSection}>
//             <div className={styles.authorInfo}>
//               <div className={styles.avatarPlaceholder}><img src="/itcareerhub.png" alt="logo" /></div>
//               <p>username</p>
//             </div>

//             <div className={styles.form}>
//               <div className={styles.captionCounter}>{caption.length}/2200</div>
//               <textarea
//                 className={styles.textarea}
//                 placeholder="Add comment"
//                 value={caption}
//                 maxLength={2200}
//                 onChange={(e) => setCaption(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePostModal;
