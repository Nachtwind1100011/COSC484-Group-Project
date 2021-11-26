import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function SelectForm(props) {
  const [val, setVal] = useState(props.default);

  function handleChange(event) {
    setVal(event.target.value);
  }

  useEffect(() => {
    props.handleChange(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  return (
    <FormControl
      id={props.id}
      className={props.class}
      variant={props.variant}
      sx={props.sx}>
      <Select
        id={props.id}
        value={val}
        onChange={handleChange}
        disableUnderline
        sx={props.selectSx || props.sx}>
        {props.items.map((item, i) => (
          <MenuItem key={item.id || i} value={item} sx={props.sx}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
