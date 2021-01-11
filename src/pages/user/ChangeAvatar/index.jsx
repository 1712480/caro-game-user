import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';

import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { AVATAR_LOCATION } from '../../../utils/constant';
import css from '../css.module.scss';

const ChangeAvatar = (props) => {
  const {
    className,
  } = props;

  const onDrop = () => {
    // send file to server
  };

  const [modal, setModal] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <Image alt="avatar" publicId={`${AVATAR_LOCATION}/default`} onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Change name</ModalHeader>
        <ModalBody>
          <div className={css.dropZone} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>
              {
                isDragActive
                  ? 'Drop the files here ...'
                  : 'Drag then drop some files here, or click to select files'
              }
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
