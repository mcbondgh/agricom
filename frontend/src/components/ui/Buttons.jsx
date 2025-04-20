import PropTypes from "prop-types";
import { Button } from "flowbite-react"

export function PrimaryButtons({btnIcon, text, type, onClick, disabled = false}) {
  return (
     <Button disabled = {disabled} type={type} onClick={onClick} gradientMonochrome="success"> {btnIcon} <span className="hidden md:block">{text}</span></Button>
  )
}

export function PrimaryButtonsMd({btnIcon, text, type, onClick, disabled = false}) {
  return (
     <Button disabled = {disabled} type={type} onClick={onClick} gradientMonochrome="success"> {btnIcon} {text}</Button>
  )
}
export function PrimaryButtonsOutline({btnIcon, text, type, onClick, disabled = false}) {
  return (
     <Button disabled = {disabled} type={type} onClick={onClick} gradientMonochrome="success" outline> {btnIcon} {text}</Button>
  )
}

export function DangerButtons({btnIcon, text, type, onClick, disabled = false}) {
  return (
     <Button disabled = {disabled} type= {type} onClick={onClick} gradientMonochrome="failure"> {btnIcon} <span className="hidden md:block">{text}</span></Button>
  )
}

export function DangerButtonsMd({btnIcon, text, type, onClick, disabled = false}) {
  return (
     <Button disabled = {disabled} type= {type} onClick={onClick} gradientMonochrome="failure"> {btnIcon} {text}</Button>
  )
}

//SETTING THE PROPERTIES DATA TYPES
PrimaryButtons.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

PrimaryButtonsMd.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

PrimaryButtonsOutline.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

DangerButtons.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

DangerButtonsMd.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};