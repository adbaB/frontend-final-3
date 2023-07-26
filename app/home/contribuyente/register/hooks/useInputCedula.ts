import { useState } from "react"

function useInputCedula(){

  const [InputCedula,setInputCedula] = useState<string>("")
  const handlerChange  = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.value.length === 1) {
      if (InputCedula.length === 2) {
        field.onChange("");
        setInputCedula("");
      } else {
        if (e.target.value.match(/^[VGJEvgje]+$/)) {
          field.onChange(
            `${e.target.value.toUpperCase()}-`
          );
          setInputCedula(
            `${e.target.value.toUpperCase()}-`
          );
        } else {
          if (e.target.value.match(/^[0-9]+$/)) {
            field.onChange(`V-${e.target.value}`);
            setInputCedula(`V-${e.target.value}`);
          } else {
            field.onChange("");
          }
        }
      }
    }
  }
  return {InputCedula,setInputCedula,handlerChange}
}

export {useInputCedula}