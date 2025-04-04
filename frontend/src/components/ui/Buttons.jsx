import PropTypes from "prop-types";
import { Button } from "flowbite-react"

export function PrimaryButtons({btnIcon, text, type, onClick}) {
  return (
     <Button type={type} onClick={onClick} gradientMonochrome="success"> {btnIcon} <span className="hidden md:block">{text}</span></Button>
  )
}

export function PrimaryButtonsMd({btnIcon, text, type, onClick}) {
  return (
     <Button type={type} onClick={onClick} gradientMonochrome="success"> {btnIcon} {text}</Button>
  )
}

export function DangerButtons({btnIcon, text, type, onClick}) {
  return (
     <Button type= {type} onClick={onClick} gradientMonochrome="failure"> {btnIcon} <span className="hidden md:block">{text}</span></Button>
  )
}

export function DangerButtonsMd({btnIcon, text, type, onClick}) {
  return (
     <Button type= {type} onClick={onClick} gradientMonochrome="failure"> {btnIcon} {text}</Button>
  )
}

//SETTING THE PROPERTIES DATA TYPES
PrimaryButtons.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

PrimaryButtonsMd.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

DangerButtons.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

DangerButtonsMd.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};