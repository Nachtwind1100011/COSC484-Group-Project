import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function SelectForm(props) {
  const [value, setValue] = useState(props.default);
  const id = props.id;

  function handleChange(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    props.handleChange(id, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FormControl
      id={props.id}
      className={props.class}
      variant={props.variant}
      sx={props.sx}>
      <Select
        id={props.id}
        value={value}
        onChange={handleChange}
        disableUnderline
        sx={props.selectSx || props.sx}>
        {props.items.map((item) => (
          <MenuItem key={item.id || item} value={item} sx={props.sx}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
