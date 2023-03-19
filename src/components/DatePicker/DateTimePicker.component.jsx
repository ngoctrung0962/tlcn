import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import viLocale from "date-fns/locale/vi";
import React from "react";
import { Controller } from "react-hook-form";

export default function CustomDateTimePicker({
  control,
  field,
  minDate,
  maxDate,
  required,
  validate,
  readOnly,
}) {
  const rangeDate = {};
  if (minDate) rangeDate.minDate = parseISO(new Date(minDate).toISOString());
  if (maxDate) rangeDate.maxDate = parseISO(new Date(maxDate).toISOString());

  return (
    <Controller
      name={field}
      control={control}
      rules={{
        required: required,
        validate: validate,
      }}
      render={({ field }) => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={viLocale}
        >
          <DateTimePicker
            dayOfWeekFormatter={(day) => day.toUpperCase()}
            readOnly={readOnly}
            {...rangeDate}
            inputFormat="dd/MM/yyyy | HH:mm"
            renderInput={(params) => (
              <TextField
                fullWidth
                style={
                  readOnly
                    ? {
                        backgroundColor: "#eee",
                        // Style padding to make the input field height same as the other input fields
                      }
                    : {
                        backgroundColor: "#fff",
                      }
                }
                {...params}
                sx={{
                  "& .MuiInputBase-root": {
                    "& .MuiInputBase-input ": {
                      padding: "4.5px 14px",
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Readex Pro",
                    },
                  },
                }}
              />
            )}
            {...field}
            value={field.value ? field.value : null}
            onOpen={() => {
              if (!field.value) field.onChange(rangeDate.maxDate);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
