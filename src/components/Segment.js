import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "./Header";
import RemoveIcon from "@mui/icons-material/Remove";

const options = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function Segment(props) {
  const [values, setValues] = React.useState("");
  const [sname, setSname] = React.useState("");
  const [data, setData] = React.useState([]);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  const handleClick = () => {
    const obj = options.find((d) => d.value === values);
    if (obj) {
      setData([...data, obj]);
      setValues("");
    }
  };

  const handleRemove = (value) => {
    const fil = data.filter((d) => d.value !== value);
    setData(fil);
  };

  const handleSubmit = () => {
    const obj = {
      segment_name: sname,
      schema: data.map((d) => ({ [d.value]: d.label })),
    };
    console.log(obj);
  };

  const boxChange = (index, value) => {
    const obj = options.find((d) => d.value === value);

    if (obj) {
      const getdata = [...data];
      getdata[index] = obj;
      setData(getdata);
    }
  };

  return (
    <Box>
      <Header title="Saving Segment" />
      <Box p="20px">
        <Typography mb="20px">Enter the name of the segment</Typography>

        <TextField
          value={sname}
          onChange={(e) => setSname(e.target.value)}
          sx={{ mb: "20px" }}
          fullWidth
        />

        <Typography mb="20px">
          To save your segment you need to add the schemas to build the query
        </Typography>

        <Box sx={{ border: "1px solid blue", m: "20px 0", minHeight: "60px" }}>
          {data.map((d, i) => (
            <Stack
              key={d.value}
              flexDirection="row"
              m="15px"
              alignItems="center"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{d.label}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={d.label}
                  defaultValue={d.value}
                  onChange={(e) => boxChange(i, e.target.value)}
                >
                  {options
                    .filter(
                      (b) =>
                        !data
                          .filter((t) => t.value !== d.value)
                          .some((t) => t.value === b.value)
                    )
                    .map((d) => (
                      <MenuItem key={d.value} value={d.value}>
                        {d.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box sx={{ ml: "5px" }}>
                <IconButton
                  onClick={() => handleRemove(d.value)}
                  aria-label="delete"
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Stack>
          ))}
        </Box>
        <FormControl fullWidth sx={{ mb: "20px" }}>
          <InputLabel id="demo-simple-select-label">
            Add schema to segment
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values}
            label="Add schema to segment"
            onChange={handleChange}
          >
            {options
              .filter((d) => !data.some((t) => t.value === d.value))
              .map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Link onClick={handleClick}>+ Add new schema</Link>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          background: "grey",
          width: "100%",
          p: "20px",
        }}
      >
        <Button onClick={handleSubmit} variant="contained">
          Save the Segment
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ ml: "20px" }}
          onClick={props.toggleDrawer(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default Segment;
