"use client";
import PropTypes from "prop-types";
import { Sidebar } from "flowbite-react";
import { Button,  Modal } from "flowbite-react";
import { useState } from "react";

export function ModalComponent({btnType, text, btnIcon, isHovered, header, children }) {
const [openModal, setOpenModal] = useState(false);

  return (
    <main>
       {btnType === 1 && <Button gradientMonochrome="success" onClick={() => setOpenModal(true)}> {btnIcon} {text}</Button>}
       {btnType === 2 && <Sidebar.Item className = "cursor-pointer"  icon = {btnIcon} onClick={() => setOpenModal(true)}>{isHovered ?text : undefined}</Sidebar.Item>}
      <Modal show={openModal} className="bg-black bg-opacity-50 backdrop-blur-md" size="5xl" onClose={()=> setOpenModal(false)} popup>
        <Modal.Header/>
        <h1 className='text-green-800  font-bold text-2xl text-center pb-2'>{header}</h1>
        <Modal.Body className="flex flex-col gap-2">
            {children}
        </Modal.Body>
      </Modal>
    </main>
  );
}

//SETTING THE PROPERTIES DATA TYPES
ModalComponent.propTypes = {
  btnType: PropTypes.number.isRequired,
  text: PropTypes.string,
  btnIcon: PropTypes.element,
  isHovered: PropTypes.bool,
  header: PropTypes.string,
  children: PropTypes.node,
};