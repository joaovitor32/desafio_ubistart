"use client";

import "react-toastify/dist/ReactToastify.css";

import { Box, Container } from "@mui/material";
import { UserFormSchema, userFormSchema } from "./schema/user";

import TableComponent from "./components/ui/Table";
import UserForm from "./components/ui/UserForm";
import axios from "axios";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { zodResolver } from "@hookform/resolvers/zod";

const Page = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(`${process.env.REACT_APP_API_URL}/user`, fetcher);
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "error.light",
          p: 2,
          borderRadius: 2,
          border: 1,
          borderColor: "error.main",
          color: "error.dark",
        }}
      >
        <span>Error loading data</span>
      </Box>
    );

  if (!data)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "info.light",
          p: 2,
          borderRadius: 2,
          border: 1,
          borderColor: "info.main",
          color: "info.dark",
        }}
      >
        <span>Loading...</span>
      </Box>
    );

  return (
    <Container sx={{ display: "flex", py: 4, gap: 3 }} maxWidth={"xl"}>
      <Box sx={{ width: "50%" }}>
        <UserForm form={form} mutateTable={mutate} />
      </Box>
      <Box sx={{ width: "50%" }}>
        <TableComponent data={data} populateForm={form.reset} />
      </Box>
    </Container>
  );
};

export default Page;
