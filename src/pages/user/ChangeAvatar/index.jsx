import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { Image } from 'cloudinary-react';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { selectUser } from '../../../redux/userSlice';
import css from '../css.module.scss';

const ChangeAvatar = (props) => {
  const {
    className,
  } = props;

  const onDrop = async (files) => {
    const formData = new FormData();
    await formData.append('avatar', files[0]);
    axios.post('http://localhost:3001/users/change-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      });
  };

  const currentUser = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <Image alt="avatar" publicId={`${currentUser?.user.email}`} onClick={toggle} />
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
