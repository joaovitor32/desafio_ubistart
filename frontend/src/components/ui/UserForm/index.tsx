import { Box, Button, TextField } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { FC, useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { KeyedMutator } from "swr";
import { UserFormData } from "@/src/types";
import axios from "axios";

const UserForm: FC<{
  mutateTable: KeyedMutator<any>;
  form: UseFormReturn<{
    name: string;
    email: string;
    zipCode: string;
    id?: string;
  }, any, undefined>;
}> = ({ form, mutateTable }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(
    async (data: UserFormData) => {
      setIsSubmitting(true);

      try {
        const id = data.id;

        if (id) {
          await axios.put(
            `${process.env.REACT_APP_API_URL}/user/${data.id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Usuário atualizado com sucesso!");
        } else {
          await axios.post(`${process.env.REACT_APP_API_URL}/user`, data);
          toast.success("Usuário criado com sucesso!");
        }

        form.reset({
          id: "",
          name: "",
          email: "",
          zipCode: "",
        });

        mutateTable();
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, mutateTable]
  );

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box mb={2}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        <Box mb={2}>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="zipCode"
                label="Zip Code"
                variant="outlined"
                fullWidth
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
                inputProps={{ maxLength: 8 }}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 5) {
                    value = value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
                  }
                  field.onChange(value);
                }}
                value={field.value || ""}
              />
            )}
          />
        </Box>

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserForm