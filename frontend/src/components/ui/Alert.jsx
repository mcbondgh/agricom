
"use client";
import PropType from "prop-types";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Sidebar } from "flowbite-react";

export function Alert({
  triggerBtnText,
  triggerIcon,
  message, 
  confirmText ="Yes", 
  cancelText= "No", 
  onConfirmClicked, 
  btnType,
  btnIcon,
  isHovered
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {btnType === 1 && <Button onClick={() => setOpenModal(true)}>{isHovered ? triggerBtnText : undefined}</Button>}
      {btnType === 2 && <Sidebar.Item  icon = {btnIcon} onClick={() => setOpenModal(true)}>{isHovered ? triggerBtnText : undefined}</Sidebar.Item>}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {triggerIcon}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onConfirmClicked}>
                {confirmText}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                {cancelText}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

//SETTING THE PROPERTIES DATA TYPES
Alert.propTypes = {
    triggerBtnText: PropType.string,
    triggerIcon: PropType.element ,
    message: PropType.string,
    confirmText: PropType.string,
    cancelText: PropType.string,
    onConfirmClicked: PropType.func,
    btnType: PropType.number,
    btnIcon: PropType.element,
    isHovered: PropType.bool  
}